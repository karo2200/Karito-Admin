import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import { Button, Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import {
	QuestionType,
	useServiceCategory_GetAllQuery,
	useServiceSubCategory_GetAllQuery,
	useServiceTypeQuestion_CreateMutation,
	useServiceTypeQuestion_UpdateMutation,
	useServiceTypes_GetAllQuery,
} from 'src/graphql/generated';

import { CheckBox, useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, SelectField, TextField } from '@/components/atoms/Form';
import COLORS from '@/theme/colors';

const LoginSchema = Yup.object().shape({
	Title: Yup.string().required('عنوان سوال را وارد کنید'),
	CategoryId: Yup.string().required('فیلد اجباری است'),
	serviceCategoryId: Yup.string().required('فیلد اجباری است'),
	serviceSubCategoryId: Yup.string().required('فیلد اجباری است'),
	options: Yup.array().of(Yup.string().required('گزینه نباید خالی باشد')).min(1, 'حداقل یک گزینه لازم است'),
});

const QuestionTypes = [
	{ value: QuestionType.CheckBox, option: 'CheckBox' },
	{ value: QuestionType.RadioButton, option: 'Radio' },
];

const defaultValues = {
	Title: '',
	serviceSubCategoryId: '',
	id: 0,
	serviceCategoryId: '',
	CategoryId: '',
	questionType: QuestionType.CheckBox,
	isRequired: false,
	options: [''],
};

interface IPageProps {
	DataRow?: any;
	open?: boolean;
	handleClose: () => void;
}

const Index: FC<IPageProps> = ({ DataRow, open, handleClose }) => {
	const [listCategory, setListCategory] = useState([]);
	const [categoryId, setCategoryId] = useState('');

	const [listSub, setListSub] = useState([]);
	const [subId, setSubId] = useState('');

	const [listServiceType, setListServiceType] = useState([]);
	const [serviceTypeId, setServiceTypeId] = useState('');

	const { mutate: mutateCreate, isLoading: isLoadingCreate } = useServiceTypeQuestion_CreateMutation();
	const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useServiceTypeQuestion_UpdateMutation();

	const { data: catData, isSuccess: catSuccess } = useServiceCategory_GetAllQuery(
		{ skip: 0, take: 1000 },
		{ keepPreviousData: true }
	);
	const methods = useForm({ resolver: yupResolver(LoginSchema), defaultValues });
	const { handleSubmit, setValue, reset, control } = methods;
	const { fields, append, remove } = useFieldArray({ control, name: 'options' });

	// ---------------- Load Categories ----------------
	useEffect(() => {
		if (catSuccess) {
			const categories =
				catData?.serviceCategory_getAll.result?.items?.map((cat) => ({
					option: cat.name,
					value: cat.id,
				})) || [];
			setListCategory(categories);

			const selectedCategory = DataRow?.serviceType?.serviceSubCategory?.serviceCategory?.id || categories[0]?.value;
			setCategoryId(selectedCategory);
			setValue('CategoryId', selectedCategory);
		}
	}, [catSuccess, catData, DataRow, setValue]);

	// ---------------- Load SubCategories ----------------
	const { data: subData, isSuccess: subSuccess } = useServiceSubCategory_GetAllQuery(
		{ skip: 0, take: 1000, where: { serviceCategory: { id: { eq: categoryId } } } },
		{ enabled: !!categoryId }
	);

	useEffect(() => {
		if (subSuccess) {
			const subs =
				subData?.serviceSubCategory_getAll.result?.items?.map((s) => ({
					option: s.name,
					value: s.id,
				})) || [];
			setListSub(subs);

			const selectedSub = DataRow?.serviceType?.serviceSubCategory?.id || subs[0]?.value;
			setSubId(selectedSub);
			setValue('serviceCategoryId', selectedSub);
		}
	}, [subSuccess, subData, DataRow, setValue]);

	// ---------------- Load ServiceTypes ----------------
	const { data: typeData, isSuccess: typeSuccess } = useServiceTypes_GetAllQuery(
		{ skip: 0, take: 1000, where: { serviceSubCategory: { id: { eq: subId } } } },
		{ enabled: !!subId }
	);

	useEffect(() => {
		if (typeSuccess) {
			const types =
				typeData?.serviceTypes_getAll.result?.items?.map((t) => ({
					option: t.name,
					value: t.id,
				})) || [];
			setListServiceType(types);

			const selectedType = DataRow?.serviceType?.id || types[0]?.value;
			setServiceTypeId(selectedType);
			setValue('serviceSubCategoryId', selectedType);
		}
	}, [typeSuccess, typeData, DataRow, setValue]);

	// ---------------- Load/Edit Data ----------------
	useEffect(() => {
		if (DataRow) {
			reset({
				Title: DataRow?.text || '',
				options: Array.isArray(DataRow?.options) ? DataRow.options : DataRow?.options?.split(','),
				isRequired: DataRow?.isRequired || false,
				questionType: DataRow?.questionType || QuestionType.CheckBox,
				serviceSubCategoryId: DataRow?.serviceType?.id,
				id: DataRow?.id,
				serviceCategoryId: DataRow?.serviceType?.serviceSubCategory?.id,
				CategoryId: DataRow?.serviceType?.serviceSubCategory?.serviceCategory?.id,
			});
		} else {
			reset(defaultValues);
		}
	}, [DataRow, reset]);

	// ---------------- Handlers ----------------
	const handleCategoryChange = (e: any) => {
		const val = e.target.value;
		setCategoryId(val);
		setSubId('');
		setServiceTypeId('');
		setValue('CategoryId', val);
	};

	const handleSubChange = (e: any) => {
		const val = e.target.value;
		setSubId(val);
		setServiceTypeId('');
		setValue('serviceCategoryId', val);
	};

	const handleServiceTypeChange = (e: any) => {
		const val = e.target.value;
		setServiceTypeId(val);
		setValue('serviceSubCategoryId', val);
	};

	const onSubmit = (data) => {
		if (data.id === 0) {
			mutateCreate(
				{
					input: {
						title: data.Title,
						options: data.options,
						isRequired: data.isRequired,
						questionType: data.questionType,
						serviceTypeId: data.serviceSubCategoryId,
					},
				},
				{
					onSuccess: () => {
						reset(defaultValues);
						handleClose();
					},
				}
			);
		} else {
			mutateUpdate(
				{
					input: {
						id: data.id,
						title: data.Title,
						options: data.options,
						isRequired: data.isRequired,
						questionType: data.questionType,
					},
				},
				{
					onSuccess: () => {
						reset(defaultValues);
						handleClose();
					},
				}
			);
		}
	};

	// ---------------- UI ----------------
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			dir="rtl"
			fullWidth
			maxWidth="md"
			PaperProps={{ sx: { borderRadius: 3, padding: 3 } }}
		>
			<IconButton onClick={handleClose} sx={{ position: 'absolute', left: 10, top: 10, color: '#555' }}>
				<CloseIcon />
			</IconButton>

			<DialogTitle sx={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>ثبت اطلاعات</DialogTitle>

			<FormProvider methods={methods}>
				<Grid container spacing={2}>
					{/* DropDown سه سطحی */}
					<Grid item xs={12} sm={4}>
						<SelectField
							disabled={!!DataRow}
							name="CategoryId"
							options={listCategory}
							value={categoryId}
							onChanged={handleCategoryChange}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<SelectField
							name="serviceCategoryId"
							options={listSub}
							value={subId}
							onChanged={handleSubChange}
							disabled={!!DataRow}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<SelectField
							name="serviceSubCategoryId"
							options={listServiceType}
							value={serviceTypeId}
							onChanged={handleServiceTypeChange}
							disabled={!!DataRow}
						/>
					</Grid>

					{/* عنوان سوال */}
					<Grid item xs={12}>
						<TextField name="Title" label="عنوان سوال" fullWidth />
					</Grid>

					{/* نوع و اجباری */}
					<Grid item xs={6}>
						<Typography sx={{ mb: 1 }}>نوع سوال</Typography>
						<SelectField name="questionType" options={QuestionTypes} />
					</Grid>
					<Grid item xs={6}>
						<CheckBox name="isRequired" label="اجباری بودن پاسخ" />
					</Grid>

					{/* گزینه‌ها */}
					<Grid item xs={12}>
						<Typography sx={{ mb: 1 }}>گزینه‌ها</Typography>
						{fields.map((field, index) => (
							<Box key={field.id} sx={{ display: 'flex', mb: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
								<TextField name={`options.${index}`} fullWidth placeholder={`گزینه ${index + 1}`} />
								<Button
									disabled={fields.length === 1}
									variant="outlined"
									color="error"
									sx={{ ml: { sm: 1 }, mt: { xs: 1, sm: 0 } }}
									onClick={() => remove(index)}
								>
									حذف
								</Button>
							</Box>
						))}
						<Button variant="outlined" onClick={() => append('')} sx={{ mt: 1 }}>
							+ افزودن گزینه
						</Button>
					</Grid>

					{/* دکمه‌ها */}
					<Grid item xs={12}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								flexDirection: { xs: 'column-reverse', sm: 'row' },
								gap: 1,
							}}
						>
							<LoadingButton
								variant="contained"
								onClick={handleSubmit(onSubmit)}
								loading={isLoadingCreate || isLoadingUpdate}
								sx={{ background: '#88b2e1', minWidth: 120, color: '#fff' }}
							>
								ثبت
							</LoadingButton>
							<LoadingButton
								variant="contained"
								onClick={handleClose}
								sx={{
									color: '#fff',
									background: COLORS.cancelBg,
									'&:hover': { background: COLORS.cancelHover },
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
