import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
	useServiceCategory_GetAllQuery,
	useServiceSubCategory_GetAllQuery,
	useServiceType_CreateMutation,
	useServiceType_UpdateMutation,
} from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, SelectField, TextField } from '@/components/atoms/Form';
import UploadPage from '@/components/organisms/UploadPage';
const LoginSchema = Yup.object().shape({
	Name: Yup.string()?.required(' نام را وارد کنید'),
	FilePath: Yup.string()?.required('  تصویر را وارد کنید'),
	serviceCategoryId: Yup.string()?.required('فیلد اجباری است'),
	CategoryId: Yup.string()?.required('فیلد اجباری است'),
	price: Yup.number()?.required('فیلد اجباری است'),
});
const Index = ({ DataRow, onRefreshItem, onSearchItem }) => {
	const [listCategury, setlistCategury] = useState([]);
	const [Empty, setEmpty] = useState(false);
	const [disabled, setdisabled] = useState(false);
	const [CategureyId, setCategureyId] = useState('');
	const [listSub, setlistSub] = useState([]);
	const { mutate: mutateState, isLoading: isLoading } = useServiceType_CreateMutation();
	const { mutate: mutateCityUpdate, isLoading: isLoadingUpdate } = useServiceType_UpdateMutation();
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

	const { data: datasub, isSuccess: isSuccesssub } = useServiceSubCategory_GetAllQuery(
		{
			skip: 0,
			take: 1000,
			where: {
				serviceCategory: { id: { eq: CategureyId } },
			},
		},
		{
			keepPreviousData: true,
		}
	);

	useEffect(() => {
		if (isSuccesssub) {
			const newList =
				datasub?.serviceSubCategory_getAll.result?.items?.map((cat) => ({
					option: cat.name,
					value: cat.id,
				})) || [];
			if (newList.length > 0) setlistSub(newList);

			//setlistCategury(newList);
		}
	}, [isSuccesssub, datasub]);

	const defaultValues = {
		Name: '',
		FilePath: '',
		id: 0,
		serviceCategoryId: '',
		CategoryId: '',
		price: 0,
	};
	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, setValue, reset, getValues } = methods;

	useEffect(() => {
		if (listCategury?.length > 0) {
			setValue('CategoryId', listCategury[0].value);
		}
	}, [setValue, listCategury]);
	useEffect(() => {
		if (listSub?.length > 0) {
			setValue('serviceCategoryId', listSub[0].value);
			onSearchItem(listSub[0].value);
		}
	}, [setValue, listSub]);

	useEffect(() => {
		if (DataRow) {
			reset({
				Name: DataRow?.name || '',
				FilePath: DataRow?.logo || '',
				id: DataRow?.id || 0,
				serviceCategoryId: DataRow?.serviceSubCategory?.id || listSub[0].value,
				CategoryId: DataRow?.serviceSubCategory?.serviceCategory?.id || listCategury[0].value,
				price: DataRow?.basePrice || 0,
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
						serviceSubCategoryId: data.serviceCategoryId,
						basePrice: data.price,
					},
				},
				{
					onSuccess: async (res) => {
						setValue('serviceCategoryId', data.serviceCategoryId);
						setValue('Name', '');
						setValue('FilePath', '');

						setValue('price', 0);
						setValue('CategoryId', data.CategoryId);
						setEmpty(true);
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
						basePrice: data.price,
						id: data.id,
					},
				},
				{
					onSuccess: async (res) => {
						setValue('serviceCategoryId', data.serviceCategoryId);
						setValue('Name', '');
						setValue('FilePath', '');
						setEmpty(true);
						setValue('price', 0);
						setValue('id', 0);
						setValue('CategoryId', data.CategoryId);
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
						name="CategoryId"
						options={listCategury}
						autoWidth={false}
						multiple={false}
						native={false}
						onChanged={(e) => {
							setCategureyId(e.target.value);
							onSearchItem(e.target.value);
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<SelectField
						disabled={disabled}
						name="serviceCategoryId"
						options={listSub}
						autoWidth={false}
						multiple={false}
						native={false}
						onChanged={(e) => {
							onSearchItem(e.target.value);
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<TextField required name="Name" placeholder="  سرویس" sx={{ height: '40px' }} id="Name" />
				</Grid>

				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
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
			</Grid>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl" marginTop="5px">
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<TextField required type="number" name="price" placeholder="  قیمت" sx={{ height: '40px' }} id="price" />
				</Grid>

				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<UploadPage
						name="FilePath"
						onDrop={(url) => setValue('FilePath', url)}
						Empty={Empty}
						OnhandelEmpty={() => setEmpty(false)}
						Url={getValues('FilePath')}
					/>
					{/*<RHFUploadAvatar name="FilePath" onDrop={handleDrop} />*/}
				</Grid>
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}></Grid>
			</Grid>
		</FormProvider>
	);
};

export default Index;
