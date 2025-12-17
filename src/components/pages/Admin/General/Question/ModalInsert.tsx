import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
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

import { CheckBox, FormProvider, SelectField, TextField, useForm, Yup, yupResolver } from '@/components/atoms/Form';
import COLORS from '@/theme/colors';

/* ===========================
	Schema
=========================== */
const LoginSchema = Yup.object().shape({
	Title: Yup.string().required('عنوان سوال را وارد کنید'),
	CategoryId: Yup.string().required('فیلد اجباری است'),
	serviceCategoryId: Yup.string().required('فیلد اجباری است'),
	serviceSubCategoryId: Yup.string().required('فیلد اجباری است'),
	options: Yup.array()
		.of(
			Yup.object().shape({
				text: Yup.string().required('گزینه نباید خالی باشد'),
				price: Yup.number().typeError('قیمت باید عدد باشد').min(0, 'قیمت نامعتبر است').required('قیمت اجباری است'),
			})
		)
		.min(1, 'حداقل یک گزینه لازم است'),
});

/* ===========================
	Constants
=========================== */
const QuestionTypes = [
	{ value: QuestionType.CheckBox, option: 'CheckBox' },
	{ value: QuestionType.RadioButton, option: 'Radio' },
];

const defaultValues = {
	Title: '',
	CategoryId: '',
	serviceCategoryId: '',
	serviceSubCategoryId: '',
	id: 0,
	questionType: QuestionType.CheckBox,
	isRequired: false,
	options: [{ text: '', price: 0 }],
};

interface IPageProps {
	DataRow?: any;
	open?: boolean;
	handleClose: () => void;
}

/* ===========================
	Component
=========================== */
const Index: FC<IPageProps> = ({ DataRow, open, handleClose }) => {
	const [listCategory, setListCategory] = useState<any[]>([]);
	const [listSub, setListSub] = useState<any[]>([]);
	const [listServiceType, setListServiceType] = useState<any[]>([]);

	const { mutate: mutateCreate, isLoading: isLoadingCreate } = useServiceTypeQuestion_CreateMutation();
	const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useServiceTypeQuestion_UpdateMutation();

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, setValue, reset, control, watch } = methods;

	const categoryId = watch('CategoryId');
	const subCategoryId = watch('serviceCategoryId');

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'options',
	});

	/* ===========================
		Load Categories
	=========================== */
	const { data: catData, isSuccess: catSuccess } = useServiceCategory_GetAllQuery({ skip: 0, take: 1000 });

	useEffect(() => {
		if (catSuccess) {
			const categories =
				catData?.serviceCategory_getAll.result?.items?.map((cat) => ({
					option: cat.name,
					value: cat.id,
				})) || [];

			setListCategory(categories);

			if (!DataRow && categories.length) {
				setValue('CategoryId', categories[0].value, {
					shouldValidate: true,
				});
			}
		}
	}, [catSuccess, catData, DataRow, setValue]);

	/* ===========================
		Load SubCategories
	=========================== */
	const { data: subData, isSuccess: subSuccess } = useServiceSubCategory_GetAllQuery(
		{
			skip: 0,
			take: 1000,
			where: {
				serviceCategory: { id: { eq: categoryId } },
			},
		},
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

			if (!DataRow && subs.length) {
				setValue('serviceCategoryId', subs[0].value, {
					shouldValidate: true,
				});
			}
		}
	}, [subSuccess, subData, DataRow, setValue]);

	/* ===========================
		Load ServiceTypes
	=========================== */
	const { data: typeData, isSuccess: typeSuccess } = useServiceTypes_GetAllQuery(
		{
			skip: 0,
			take: 1000,
			where: {
				serviceSubCategory: {
					id: { eq: subCategoryId },
				},
			},
		},
		{ enabled: !!subCategoryId }
	);

	useEffect(() => {
		if (typeSuccess) {
			const types =
				typeData?.serviceTypes_getAll.result?.items?.map((t) => ({
					option: t.name,
					value: t.id,
				})) || [];

			setListServiceType(types);

			if (!DataRow && types.length) {
				setValue('serviceSubCategoryId', types[0].value, {
					shouldValidate: true,
				});
			}
		}
	}, [typeSuccess, typeData, DataRow, setValue]);

	/* ===========================
		Edit Mode
	=========================== */
	useEffect(() => {
		if (DataRow) {
			reset({
				Title: DataRow.text,
				options: DataRow.options,
				isRequired: DataRow.isRequired,
				questionType: DataRow.questionType,
				serviceSubCategoryId: DataRow.serviceType?.id,
				serviceCategoryId: DataRow.serviceType?.serviceSubCategory?.id,
				CategoryId: DataRow.serviceType?.serviceSubCategory?.serviceCategory?.id,
				id: DataRow.id,
			});
		}
	}, [DataRow, reset]);

	/* ===========================
		Submit
	=========================== */
	const onSubmit = (data: any) => {
		const payload = {
			title: data.Title,
			options: data.options,
			isRequired: data.isRequired,
			questionType: data.questionType,
		};

		if (data.id === 0) {
			mutateCreate(
				{
					input: {
						...payload,
						serviceTypeId: data.serviceSubCategoryId,
					},
				},
				{
					onSuccess: () => {
						reset(defaultValues);
						handleClose();
					},
					onError: (err) => {
						console.error(err);
					},
				}
			);
		} else {
			mutateUpdate(
				{
					input: {
						id: data.id,
						...payload,
					},
				},
				{
					onSuccess: () => {
						reset(defaultValues);
						handleClose();
					},
					onError: (err) => {
						console.error(err);
					},
				}
			);
		}
	};

	/* ===========================
		UI
	=========================== */
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			dir="rtl"
			fullWidth
			maxWidth="md"
			PaperProps={{ sx: { borderRadius: 3, p: 3 } }}
		>
			<IconButton onClick={handleClose} sx={{ position: 'absolute', left: 10, top: 10 }}>
				<CloseIcon />
			</IconButton>

			<DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>ثبت اطلاعات</DialogTitle>

			<FormProvider methods={methods}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={4}>
						<SelectField name="CategoryId" options={listCategory} disabled={!!DataRow} />
					</Grid>

					<Grid item xs={12} sm={4}>
						<SelectField name="serviceCategoryId" options={listSub} disabled={!!DataRow} />
					</Grid>

					<Grid item xs={12} sm={4}>
						<SelectField name="serviceSubCategoryId" options={listServiceType} disabled={!!DataRow} />
					</Grid>

					<Grid item xs={12}>
						<TextField name="Title" label="عنوان سوال" fullWidth />
					</Grid>

					<Grid item xs={6}>
						<Typography sx={{ mb: 1 }}>نوع سوال</Typography>
						<SelectField name="questionType" options={QuestionTypes} />
					</Grid>

					<Grid item xs={6}>
						<CheckBox name="isRequired" label="اجباری بودن پاسخ" />
					</Grid>

					<Grid item xs={12}>
						<Typography sx={{ mb: 1 }}>گزینه‌ها</Typography>

						{fields.map((field, index) => (
							<Box
								key={field.id}
								sx={{
									display: 'flex',
									gap: 1,
									mb: 1,
									flexDirection: {
										xs: 'column',
										sm: 'row',
									},
								}}
							>
								<TextField name={`options.${index}.text`} fullWidth placeholder={`گزینه ${index + 1}`} />

								<TextField
									name={`options.${index}.price`}
									type="number"
									placeholder="قیمت"
									sx={{ width: { sm: 150 } }}
								/>

								<Button variant="outlined" color="error" disabled={fields.length === 1} onClick={() => remove(index)}>
									حذف
								</Button>
							</Box>
						))}

						<Button variant="outlined" onClick={() => append({ text: '', price: 0 })}>
							+ افزودن گزینه
						</Button>
					</Grid>

					<Grid item xs={12}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
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
