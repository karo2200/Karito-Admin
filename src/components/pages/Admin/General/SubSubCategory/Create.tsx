import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
	useServiceCategory_GetAllQuery,
	useServiceSubCategory_GetAllQuery,
	useServiceType_CreateMutation,
	useServiceType_UpdateMutation,
} from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { CheckBox, FormProvider, SelectField, TextField } from '@/components/atoms/Form';
import UploadPage from '@/components/organisms/UploadPage';
const LoginSchema = Yup.object().shape({
	Name: Yup.string()?.required(' نام را وارد کنید'),
	FilePath: Yup.string()?.required('  لوگو را وارد کنید'),
	serviceCategoryId: Yup.string()?.required('فیلد اجباری است'),
	CategoryId: Yup.string()?.required('فیلد اجباری است'),
	price: Yup.number()?.required('فیلد اجباری است'),
	FileBaner: Yup.string()?.required('  بنر را وارد کنید'),
});
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, onSearchItem }) => {
	console.log('DataRow', DataRow);
	const [load, setLoad] = useState(0);
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
			setCategureyId(newList[0].value);
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
			enabled: load === 1,
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
		isSpecial: false,
		FileBaner: '',
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
		if (CategureyId != '' && CategureyId != null) {
			setLoad(1);
		}
	}, [CategureyId]);
	useEffect(() => {
		if (DataRow) {
			reset({
				Name: DataRow?.name || '',
				FilePath: DataRow?.logo || '',
				id: DataRow?.id || 0,
				serviceCategoryId: DataRow?.serviceSubCategory?.id || listSub[0].value,
				CategoryId: DataRow?.serviceSubCategory?.serviceCategory?.id || listCategury[0].value,
				price: DataRow?.basePrice || 0,
				isSpecial: DataRow?.isSpecial || false,
				FileBaner: DataRow?.banner || '',
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
						isSpecial: data.isSpecial,
						banner: data.FileBaner,
					},
				},
				{
					onSuccess: async (res) => {
						setEmpty(true);
						setValue('serviceCategoryId', data.serviceCategoryId);
						setValue('Name', '');
						setValue('FilePath', '');
						setValue('price', 0);
						setValue('CategoryId', data.CategoryId);
						onRefreshItem();
					},
					onError: (err) => {},
				}
			);
		} else
			await mutateCityUpdate(
				{
					input: {
						name: data.Name,
						logo: data.FilePath,
						basePrice: data.price,
						id: data.id,
						isSpecial: data.isSpecial,
						banner: data.FileBaner,
					},
				},
				{
					onSuccess: async (res) => {
						DataRow = null;
						setEmpty(true);
						setValue('serviceCategoryId', data.serviceCategoryId);
						setValue('Name', '');
						setValue('FilePath', '');
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
					<TextField required name="Name" placeholder="  سرویس" sx={{ height: '40px', width: '234px' }} id="Name" />
				</Grid>

				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<TextField
						fullWidth
						required
						type="number"
						name="price"
						placeholder="  قیمت"
						sx={{ height: '40px', width: '234px' }}
						id="price"
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl" marginTop="5px">
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<UploadPage
						label="لوگو"
						Empty={Empty}
						OnhandelEmpty={() => setEmpty(false)}
						Url={getValues('FilePath')}
						name="FilePath"
						onDrop={(url) => setValue('FilePath', url)}
					/>
				</Grid>
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<UploadPage
						label="بنر"
						Empty={Empty}
						OnhandelEmpty={() => setEmpty(false)}
						Url={getValues('FileBaner')}
						name="FileBaner"
						onDrop={(url) => setValue('FileBaner', url)}
					/>
				</Grid>
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<CheckBox name="isSpecial" label="isSpecial" />
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
		</FormProvider>
	);
};

export default Index;
