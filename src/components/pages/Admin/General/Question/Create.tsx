import { LoadingButton } from '@mui/lab';
import { Button, Grid, Typography } from '@mui/material';
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

const LoginSchema = Yup.object().shape({
	Title: Yup.string().required('عنوان سوال را وارد کنید'),
	serviceCategoryId: Yup.string().required('فیلد اجباری است'),
	CategoryId: Yup.string().required('فیلد اجباری است'),
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
	onRefreshItem: () => void;
	onSearchItem: (value: string) => void;
}

const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, onSearchItem }) => {
	const [load, setLoad] = useState(0);
	const [listCategury, setlistCategury] = useState([]);
	const [disabled, setdisabled] = useState(false);
	const [CategureyId, setCategureyId] = useState('');
	const [SubId, setSubId] = useState('');
	const [listSub, setlistSub] = useState([]);
	const [listSubsubAll, setListSubsubAll] = useState([]);

	const { mutate: mutateState, isLoading: isLoading } = useServiceTypeQuestion_CreateMutation();
	const { mutate: mutateCityUpdate, isLoading: isLoadingUpdate } = useServiceTypeQuestion_UpdateMutation();

	const { data, isSuccess } = useServiceCategory_GetAllQuery(
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
			setCategureyId(newList[0]?.value || '');
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
			if (newList.length > 0) {
				setlistSub(newList);
				setSubId(newList[0]?.value || '');
			} else {
				setlistSub([]);
				setSubId('');
			}
		}
	}, [isSuccesssub, datasub]);

	const { data: dataSubsub, isSuccess: isSuccessSubsub } = useServiceTypes_GetAllQuery(
		{ skip: 0, take: 1000, where: { serviceSubCategory: { id: { eq: SubId } } } },
		{ keepPreviousData: true, enabled: !!SubId }
	);
	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});
	const { handleSubmit, setValue, reset, control } = methods;

	useEffect(() => {
		if (isSuccessSubsub) {
			const newList =
				dataSubsub?.serviceTypes_getAll.result?.items?.map((cat) => ({
					option: cat.name,
					value: cat.id,
				})) || [];
			setListSubsubAll(newList);

			if (newList.length > 0) {
				if (DataRow) {
					// حالت ویرایش: مقدار فرم را از دیتا ست کن
					setValue('serviceSubCategoryId', DataRow.serviceType?.id || newList[0].value);
					onSearchItem(DataRow.serviceType?.id || newList[0].value);
				} else {
					//setValue('serviceSubCategoryId', newList[0].value);
					//onSearchItem(newList[0].value);
				}
			} else {
				setValue('serviceSubCategoryId', '');
			}
		} else {
			setListSubsubAll([]);
			setValue('serviceSubCategoryId', '');
		}
	}, [isSuccessSubsub, dataSubsub, setValue, onSearchItem, DataRow]);

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'options',
	});

	useEffect(() => {
		if (listCategury.length > 0) {
			setValue('CategoryId', listCategury[0].value);
			setCategureyId(listCategury[0].value);
		}
	}, [setValue, listCategury]);

	useEffect(() => {
		if (listSub.length > 0) {
			setValue('serviceCategoryId', listSub[0].value);
			setSubId(listSub[0].value);
			onSearchItem(listSub[0].value);
		}
	}, [setValue, listSub]);

	useEffect(() => {
		if (CategureyId !== '') {
			setLoad(1);
		}
	}, [CategureyId]);

	useEffect(() => {
		if (DataRow) {
			reset({
				Title: DataRow?.text || '',
				options: Array.isArray(DataRow?.options) ? DataRow.options : DataRow?.options?.split(',') || [''],
				isRequired: DataRow?.isRequired || false,
				questionType: DataRow?.questionType || QuestionType.CheckBox,
				serviceSubCategoryId: DataRow?.serviceType?.id || '',
				id: DataRow?.id || 0,
				serviceCategoryId: DataRow?.serviceType?.serviceSubCategory?.id || '',
				CategoryId: DataRow?.serviceType?.serviceSubCategory?.serviceCategory?.id || '',
			});
			setdisabled(true);
		} else {
			// حالت Insert: فرم رو ریست کن و غیرفعال کردن رو بردار
			reset(defaultValues);
			setdisabled(false);
		}
	}, [DataRow, reset]);

	// وقتی Category تغییر میکنه:
	const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const val = e.target.value as string;
		setCategureyId(val);
		setValue('CategoryId', val);
		// پاک کردن زیرمجموعه‌ها برای لود مجدد
		setlistSub([]);
		setSubId('');
		setListSubsubAll([]);
		setValue('serviceCategoryId', '');
		setValue('serviceSubCategoryId', '');
	};

	// وقتی SubCategory تغییر میکنه:
	const handleSubCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const val = e.target.value as string;
		setSubId(val);
		setValue('serviceCategoryId', val);
		setListSubsubAll([]);
		setValue('serviceSubCategoryId', '');
		onSearchItem(val);
	};

	// وقتی Drop سوم تغییر میکنه:
	const handleSubSubCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const val = e.target.value as string;
		setValue('serviceSubCategoryId', val, { shouldValidate: true, shouldDirty: true });
		onSearchItem(val);
	};

	const onSubmit = async (data: typeof defaultValues) => {
		if (data.id === 0) {
			await mutateState(
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
						onRefreshItem();
					},
					onError: (err) => {
						console.error(err);
					},
				}
			);
		} else {
			await mutateCityUpdate(
				{
					input: {
						title: data.Title,
						options: data.options,
						isRequired: data.isRequired,
						questionType: data.questionType,
						id: data.id,
					},
				},
				{
					onSuccess: () => {
						reset(defaultValues);
						onRefreshItem();
					},
					onError: (err) => {
						console.error(err);
					},
				}
			);
		}
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
						onChanged={handleCategoryChange}
					/>
				</Grid>
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<SelectField
						disabled={disabled || listSub.length === 0}
						name="serviceCategoryId"
						options={listSub}
						autoWidth={false}
						multiple={false}
						native={false}
						onChanged={handleSubCategoryChange}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<SelectField
						disabled={disabled || listSubsubAll.length === 0}
						name="serviceSubCategoryId"
						options={listSubsubAll}
						autoWidth={false}
						multiple={false}
						native={false}
						onChanged={handleSubSubCategoryChange}
						required
					/>
				</Grid>
				<Grid item xs={9}>
					<TextField name="Title" placeholder="عنوان سوال" label="عنوان سوال" fullWidth dir="rtl" />
				</Grid>

				<Grid item xs={12} sm={6} sx={{ pt: 3 }}>
					<Typography variant="subtitle1" color="GrayText">
						نوع سوال
					</Typography>
					<SelectField name="questionType" options={QuestionTypes} native={false} />
				</Grid>

				<Grid item xs={12} sm={6} sx={{ pt: 3 }}>
					<CheckBox name="isRequired" label="اجباری بودن پاسخ" color="primary" />
				</Grid>

				<Grid item xs={12} sx={{ mt: 2 }}>
					<Typography variant="subtitle1">گزینه‌ها</Typography>
					{fields.map((field, index) => (
						<div key={field.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
							<TextField name={`options.${index}`} placeholder={`گزینه شماره ${index + 1}`} dir="rtl" fullWidth />

							<Button
								disabled={fields.length === 1}
								variant="outlined"
								color="error"
								size="small"
								onClick={() => remove(index)}
								sx={{ height: '40px', minWidth: '40px', marginRight: '3px' }}
							>
								حذف
							</Button>
						</div>
					))}
					<Button onClick={() => append('')} variant="outlined" size="small" sx={{ mt: 1, color: '#000 !important' }}>
						افزودن +
					</Button>
				</Grid>
			</Grid>

			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl" marginTop="5px">
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<LoadingButton
						variant="contained"
						onClick={handleSubmit(onSubmit)}
						loading={isLoading || isLoadingUpdate}
						fullWidth
						sx={{
							fontSize: '15px',
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
