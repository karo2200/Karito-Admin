import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
	useServiceCategory_GetAllQuery,
	useServiceSubCategory_CreateMutation,
	useServiceSubCategory_UpdateMutation,
} from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, SelectField, TextField } from '@/components/atoms/Form';
import UploadPage from '@/components/organisms/UploadPage';
const LoginSchema = Yup.object().shape({
	Name: Yup.string()?.required(' نام را وارد کنید'),
	FilePath: Yup.string()?.required('  تصویر را وارد کنید'),
	serviceCategoryId: Yup.string()?.required('فیلد اجباری است'),
	Abbreviation: Yup.string()
		?.required('  کد را وارد کنید')
		.matches(/^[A-Za-z0-9]+$/, 'فقط عدد و حروف انگلیسی مجاز است')
		.max(2, 'تعداد کاراکتر مجاز 2'),
});
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, onSearchItem }) => {
	const [Empty, setEmpty] = useState(false);
	const [disabled, setdisabled] = useState(false);
	const [listCategury, setlistCategury] = useState([]);

	const { mutate: mutateState, isLoading: isLoading } = useServiceSubCategory_CreateMutation();
	const { mutate: mutateCityUpdate, isLoading: isLoadingUpdate } = useServiceSubCategory_UpdateMutation();
	const { data, isSuccess, isError } = useServiceCategory_GetAllQuery(
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
				data?.serviceCategory_getAll.result?.items?.map((cat) => ({
					option: cat.name,
					value: cat.id,
				})) || [];
			if (newList.length > 0) setlistCategury(newList);

			//setlistCategury(newList);
		}
	}, [isSuccess, data]);

	const defaultValues = {
		Name: '',
		FilePath: '',
		id: 0,
		serviceCategoryId: '',
		Abbreviation: '',
	};
	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, setValue, reset, getValues } = methods;
	useEffect(() => {
		if (listCategury?.length > 0) {
			setValue('serviceCategoryId', listCategury[0].value);
			onSearchItem(listCategury[0].value);
		}
	}, [setValue, listCategury]);

	useEffect(() => {
		if (DataRow) {
			reset({
				Name: DataRow?.name || '',
				FilePath: DataRow?.logo || '',
				id: DataRow?.id || 0,
				serviceCategoryId: DataRow?.serviceCategoryId || listCategury[0].value,
				Abbreviation: DataRow?.abbreviation || '',
			});
			setdisabled(true);
		}
	}, [DataRow, reset]);

	const onSubmit = async (data: typeof defaultValues) => {
		if (data.id == 0) {
			await mutateState(
				{
					input: {
						name: data.Name,
						logo: data.FilePath,
						serviceCategoryId: data.serviceCategoryId,
						abbreviation: data.Abbreviation,
					},
				},
				{
					onSuccess: async (res) => {
						setEmpty(true);
						setValue('serviceCategoryId', data.serviceCategoryId);
						setValue('Name', '');
						setValue('FilePath', '');
						setValue('Abbreviation', '');
						onRefreshItem();
					},
					onError: (err) => {},
				}
			);
		} else
			await mutateCityUpdate(
				{
					input: {
						newName: data.Name,
						newLogo: data.FilePath,
						serviceSubCategoryId: data.id,
						abbreviation: data.Abbreviation,
					},
				},
				{
					onSuccess: async (res) => {
						DataRow = null;
						setdisabled(false);
						setEmpty(true);
						setValue('serviceCategoryId', data.serviceCategoryId);
						setValue('Name', '');
						setValue('FilePath', '');
						setValue('id', 0);
						setValue('Abbreviation', '');
						onRefreshItem();
					},
					onError: (err) => {},
				}
			);
	};

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={3}>
					<SelectField
						disabled={disabled}
						name="serviceCategoryId"
						options={listCategury}
						autoWidth={false}
						multiple={false}
						native={false}
						onChanged={(e) => {
							onSearchItem(e.target.value);
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<TextField required name="Name" placeholder="  سرویس" sx={{ height: '40px' }} id="Name" />
				</Grid>

				<Grid item xs={12} sm={3}>
					<TextField required name="Abbreviation" placeholder="کد اختصاصی" sx={{ height: '40px' }} id="Name" />
				</Grid>
			</Grid>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl" marginTop="5px">
				<Grid item xs={12} sm={3}>
					<UploadPage
						Empty={Empty}
						OnhandelEmpty={() => setEmpty(false)}
						Url={getValues('FilePath')}
						name="FilePath"
						onDrop={(url) => setValue('FilePath', url)}
					/>
					{/*<RHFUploadAvatar name="FilePath" onDrop={handleDrop} />*/}
				</Grid>
				<Grid item xs={12} sm={3}>
					<LoadingButton
						variant="contained"
						onClick={handleSubmit(onSubmit)}
						loading={isLoading}
						fullWidth
						sx={{
							fontSize: '15px',
							//backgroundImage: 'linear-gradient(to right,#1D5BD2, #4D88F9)',
							background: '#88b2e1',
							color: '#fff',
							borderRadius: '8px !important',
							width: '100px',
							marginTop: '5px',
						}}
					>
						ثبت
					</LoadingButton>
				</Grid>
				<Grid item xs={12} sm={3}></Grid>
			</Grid>
		</FormProvider>
	);
};

export default Index;
