import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Dialog, DialogTitle, Grid, IconButton } from '@mui/material';
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
import COLORS from '@/theme/colors';

import { IPageProps } from './type-page';

const LoginSchema = Yup.object().shape({
	Name: Yup.string().required('نام را وارد کنید'),
	FilePath: Yup.string().required('لوگو را وارد کنید'),
	serviceCategoryId: Yup.string().required('فیلد اجباری است'),
	CategoryId: Yup.string().required('فیلد اجباری است'),
	price: Yup.number().required('فیلد اجباری است'),
	FileBaner: Yup.string().required('بنر را وارد کنید'),
	Abbreviation: Yup.string()
		.required('کد را وارد کنید')
		.matches(/^[A-Za-z0-9]+$/, 'فقط عدد و حروف انگلیسی مجاز است')
		.max(2, 'تعداد کاراکتر مجاز 2'),
});

const Index: FC<IPageProps> = ({ DataRow, open, handleClose }) => {
	const [listCategury, setlistCategury] = useState([]);
	const [listSub, setlistSub] = useState([]);
	const [CategureyId, setCategureyId] = useState('');

	const { mutate: mutateCreate, isLoading: isLoadingCreate } = useServiceType_CreateMutation();
	const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useServiceType_UpdateMutation();

	const { data, isSuccess } = useServiceCategory_GetAllQuery({ skip: 0, take: 1000 }, { keepPreviousData: true });

	useEffect(() => {
		if (isSuccess) {
			const newList =
				data?.serviceCategory_getAll.result?.items?.map((cat) => ({
					option: cat.name,
					value: cat.id,
				})) || [];
			setlistCategury(newList);
			setCategureyId(newList[0]?.value || '');
		}
	}, [isSuccess, data]);

	const { data: datasub, isSuccess: isSuccessSub } = useServiceSubCategory_GetAllQuery(
		{ skip: 0, take: 1000, where: { serviceCategory: { id: { eq: CategureyId } } } },
		{ keepPreviousData: true }
	);

	useEffect(() => {
		if (isSuccessSub) {
			const newList =
				datasub?.serviceSubCategory_getAll.result?.items?.map((cat) => ({
					option: cat.name,
					value: cat.id,
				})) || [];
			setlistSub(newList);
		}
	}, [isSuccessSub, datasub]);

	const defaultValues = {
		Name: '',
		FilePath: '',
		id: 0,
		serviceCategoryId: '',
		CategoryId: '',
		price: 0,
		isSpecial: false,
		FileBaner: '',
		Abbreviation: '',
	};

	const methods = useForm({ resolver: yupResolver(LoginSchema), defaultValues });
	const { handleSubmit, setValue, reset, getValues } = methods;
	// load initial values

	useEffect(() => {
		if (DataRow) return;

		if (listCategury.length) setValue('CategoryId', listCategury[0].value);
		if (listSub.length) setValue('serviceCategoryId', listSub[0].value);
	}, [listCategury, listSub, DataRow]);

	useEffect(() => {
		if (DataRow)
			reset({
				Name: DataRow?.name || '',
				FilePath: DataRow?.logo || '',
				FileBaner: DataRow?.banner || '',
				id: DataRow?.id || 0,
				serviceCategoryId: DataRow?.serviceSubCategory?.id || '',
				CategoryId: DataRow?.serviceSubCategory?.serviceCategory?.id || '',
				price: DataRow?.basePrice || 0,
				isSpecial: DataRow?.isSpecial || false,
				Abbreviation: DataRow?.abbreviation || '',
			});
		else reset(defaultValues);
	}, [DataRow]);

	const onSubmit = async (data: typeof defaultValues) => {
		if (data.id === 0) {
			await mutateCreate(
				{
					input: {
						name: data.Name,
						logo: data.FilePath,
						serviceSubCategoryId: data.serviceCategoryId,
						basePrice: data.price,
						isSpecial: data.isSpecial,
						banner: data.FileBaner,
						abbreviation: data.Abbreviation,
					},
				},
				{
					onSuccess: () => {
						reset(defaultValues);
						setValue('CategoryId', listCategury[0].value);
						setValue('serviceCategoryId', listSub[0].value);
						handleClose();
					},
				}
			);
		} else {
			await mutateUpdate(
				{
					input: {
						id: data.id,
						name: data.Name,
						logo: data.FilePath,
						basePrice: data.price,
						isSpecial: data.isSpecial,
						banner: data.FileBaner,
						abbreviation: data.Abbreviation,
					},
				},
				{
					onSuccess: () => {
						reset(defaultValues);
						setValue('CategoryId', listCategury[0].value);
						setValue('serviceCategoryId', listSub[0].value);
						handleClose();
					},
				}
			);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			dir="rtl"
			fullWidth
			maxWidth="md"
			PaperProps={{ sx: { borderRadius: 3, p: 3 } }}
		>
			{/* Close Button */}
			<IconButton onClick={handleClose} sx={{ position: 'absolute', left: 10, top: 10, color: '#555' }}>
				<CloseIcon />
			</IconButton>

			<DialogTitle sx={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>ثبت اطلاعات</DialogTitle>

			<FormProvider methods={methods}>
				<Grid container spacing={2}>
					{/* دسته‌بندی */}
					<Grid item xs={12} sm={4}>
						<SelectField
							disabled={!!DataRow}
							name="CategoryId"
							options={listCategury}
							onChanged={(e) => setCategureyId(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<SelectField disabled={!!DataRow} name="serviceCategoryId" options={listSub} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField fullWidth required name="Name" placeholder="سرویس" />
					</Grid>

					{/* قیمت و کد */}
					<Grid item xs={12} sm={4}>
						<TextField fullWidth required type="number" name="price" placeholder="قیمت" />
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField fullWidth required name="Abbreviation" placeholder="کد اختصاصی" />
					</Grid>

					{/* آپلود */}
					<Grid item xs={12} sm={4}>
						<UploadPage
							label="لوگو"
							//Empty={Empty}
							//OnhandelEmpty={() => setEmpty(false)}
							Url={getValues('FilePath')}
							name="FilePath"
							onDrop={(url) => setValue('FilePath', url)}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<UploadPage
							label="بنر"
							//Empty={Empty}
							//OnhandelEmpty={() => setEmpty(false)}
							Url={getValues('FileBaner')}
							name="FileBaner"
							onDrop={(url) => setValue('FileBaner', url)}
						/>
					</Grid>

					<Grid item xs={12} sm={4}>
						<CheckBox name="isSpecial" label="ویژه" />
					</Grid>

					{/* دکمه‌ها */}
					<Grid item xs={12}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: { xs: 'center', sm: 'space-between' },
								flexDirection: { xs: 'column-reverse', sm: 'row' },
								gap: 1,
							}}
						>
							<LoadingButton
								variant="contained"
								onClick={handleSubmit(onSubmit)}
								loading={isLoadingCreate || isLoadingUpdate}
								sx={{ background: '#88b2e1', color: '#fff', minWidth: 120 }}
							>
								ثبت
							</LoadingButton>
							<LoadingButton
								variant="contained"
								onClick={handleClose}
								sx={{
									background: COLORS.cancelBg,
									'&:hover': { background: COLORS.cancelHover },
									color: '#fff',
									minWidth: 120,
								}}
							>
								بستن
							</LoadingButton>
						</Box>
					</Grid>
				</Grid>
			</FormProvider>
		</Dialog>
	);
};

export default Index;
