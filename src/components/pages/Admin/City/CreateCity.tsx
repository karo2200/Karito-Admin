import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useCity_CreateCityMutation, useCity_UpdateCityMutation, useProvincesQuery } from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, SelectField, TextField } from '@/components/atoms/Form';

const LoginSchema = Yup.object().shape({
	CityName: Yup.string()?.required(' نام شهر را وارد کنید'),
	CityId: Yup.string()?.required('استان را انتخاب کنید'),
});
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, onSearchItem }) => {
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
			});
			setdisabled(true);
		}
	}, [DataRow, reset]);

	useEffect(() => {
		if (listState?.length > 0) {
			setValue('CityId', listState[0].value);
			onSearchItem(listState[0].value);
		}
	}, [setValue, listState]);

	const onSubmit = async (data: typeof defaultValues) => {
		if (data.id == 0) {
			await mutateCity(
				{
					input: {
						name: data.CityName,
						provinceId: data.CityId,
					},
				},
				{
					onSuccess: async (res) => {
						setValue('CityName', '');
						setValue('CityId', data.CityId);
						onRefreshItem();
					},
					onError: (err) => {},
				}
			);
		} else
			await mutateCityUpdate(
				{
					input: {
						newName: data.CityName,
						cityId: data.id,
					},
				},
				{
					onSuccess: async (res) => {
						DataRow = null;
						setValue('CityName', '');
						setValue('id', 0);
						setValue('CityId', data.CityId);
						setdisabled(false);
						onRefreshItem();
					},
					onError: (err) => {},
				}
			);
	};

	return (
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
					<TextField required name="CityName" placeholder=" شهر" fullWidth sx={{ height: 40 }} id="CityName" />
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
	);
};

export default Index;
