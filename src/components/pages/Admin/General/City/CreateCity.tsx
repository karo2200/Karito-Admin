import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useCity_CreateCityMutation, useCity_UpdateCityMutation, useProvincesQuery } from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, SelectField, TextField } from '@/components/atoms/Form';
//import Modal from '@/components/organisms/ModalLatlong';
const LoginSchema = Yup.object().shape({
	CityName: Yup.string()?.required(' نام شهر را وارد کنید'),
	CityId: Yup.string()?.required('استان را انتخاب کنید'),
	Abbreviation: Yup.string()
		?.required('  کد را وارد کنید')
		.matches(/^[A-Za-z0-9]+$/, 'فقط عدد و حروف انگلیسی مجاز است')
		.max(2, 'تعداد کاراکتر مجاز 2'),
});
import dynamic from 'next/dynamic';
import { useSnackbar } from 'notistack';

import { IPageProps } from './type-page';

const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, onSearchItem }) => {
	const Modal = dynamic(() => import('@/components/organisms/ModalLatlong'), { ssr: false });
	const { enqueueSnackbar } = useSnackbar();

	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [latLong, setlatLong] = useState('');
	const [listState, setListState] = useState([]);
	const [disabled, setdisabled] = useState(false);
	const { mutate: mutateCity, isLoading: isLoading } = useCity_CreateCityMutation();
	const { mutate: mutateCityUpdate, isLoading: isLoadingUpdate } = useCity_UpdateCityMutation();
	const { data, isSuccess, isError } = useProvincesQuery(
		{
			skip: 0,
			take: 1000,
		},
		{
			keepPreviousData: true,
		}
	);

	useEffect(() => {
		if (isSuccess) {
			const newList =
				data?.province_getAll?.result?.items?.map(({ name, id }) => ({
					option: name,
					value: id,
				})) || [];

			if (newList.length > 0) setListState(newList);
		}
	}, [isSuccess, data]);

	const defaultValues = {
		CityName: '',
		CityId: '',
		id: 0,
		Abbreviation: '',
	};

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, reset, setValue } = methods;

	useEffect(() => {
		if (DataRow) {
			reset({
				id: DataRow?.id,
				CityName: DataRow?.name || '',
				CityId: DataRow?.province?.id || '',
				Abbreviation: DataRow?.abbreviation || '',
			});
			setlatLong(DataRow.boundary);
			setdisabled(true);
		}
	}, [DataRow, reset]);

	/*useEffect(() => {
		if (listState?.length > 0) {
			onSearchItem(null);
		}
	}, [listState]);*/

	const onSubmit = async (data: typeof defaultValues) => {
		if (latLong != '') {
			if (data.id == 0) {
				await mutateCity(
					{
						input: {
							name: data.CityName,
							provinceId: data.CityId,
							wktBoundary: latLong,
							abbreviation: data.Abbreviation,
						},
					},
					{
						onSuccess: async (res) => {
							if (res?.city_create?.status?.code == 0) {
								const errorMessage = res?.city_create?.status?.message || 'خطایی رخ داده است';
								enqueueSnackbar(errorMessage, { variant: 'error' });
							}
							setValue('CityName', '');
							setValue('CityId', data.CityId);
							onRefreshItem();
							setlatLong('');
						},
						onError: (err) => {
							enqueueSnackbar('محدوده انتخابی نادرست است', { variant: 'error' });
						},
					}
				);
			} else
				await mutateCityUpdate(
					{
						input: {
							newName: data.CityName,
							cityId: data.id,
							abbreviation: data.Abbreviation,
						},
					},
					{
						onSuccess: async (res) => {
							DataRow = null;
							setValue('CityName', '');
							setValue('id', 0);
							setValue('Abbreviation', '');
							setValue('CityId', data.CityId);
							setdisabled(false);
							onRefreshItem();
							setlatLong('');
						},
						onError: (err) => {},
					}
				);
		} else enqueueSnackbar('محدوده شهر انتخاب نشده است', { variant: 'error' });
	};

	return (
		<>
			<FormProvider methods={methods}>
				<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
					<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
						<SelectField
							disabled={disabled}
							name="CityId"
							options={listState}
							autoWidth={false}
							multiple={false}
							native={false}
							onChanged={(e) => {
								onSearchItem(e.target.value);
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
						<TextField required name="CityName" placeholder=" شهر" fullWidth sx={{ mb: 0, height: 40 }} id="CityName" />
					</Grid>
					<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
						<TextField required name="Abbreviation" placeholder="کد اختصاصی" sx={{ mb: 0, height: '40px' }} id="Name" />
					</Grid>
					<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
						<LoadingButton
							disabled={disabled}
							variant="contained"
							onClick={() => {
								setOpen(true);
							}}
							loading={isLoading || isLoadingUpdate}
							sx={{
								fontSize: '15px',
								background: '#88b2e1',
								color: '#fff',
								borderRadius: '8px !important',
								width: '150px',
								marginTop: '5px',
								height: 40,
							}}
						>
							انتخاب محدوده
						</LoadingButton>
					</Grid>
					<Grid item xs={12} sm={3}>
						<LoadingButton
							variant="contained"
							onClick={handleSubmit(onSubmit)}
							loading={isLoading || isLoadingUpdate}
							sx={{
								fontSize: '15px',
								background: '#88b2e1',
								color: '#fff',
								borderRadius: '8px !important',
								width: '100px',
								marginTop: '5px',
								height: 40,
							}}
						>
							ثبت
						</LoadingButton>
					</Grid>
				</Grid>
			</FormProvider>
			<Modal
				disabled={false}
				lat={latLong}
				open={open}
				handleClose={() => {
					setOpen(false);
				}}
				handleConfirm={(wkt) => {
					setlatLong(wkt);
					setOpen(false);
				}}
			></Modal>
		</>
	);
};

export default Index;
