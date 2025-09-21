import { LoadingButton } from '@mui/lab';
import { Button, Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
	useCarousel_CreateMutation,
	useCarousel_UpdateMutation,
	useServiceSubCategory_GetAllQuery,
	useServiceTypes_GetAllQuery,
} from 'src/graphql/generated';

import { SelectField, useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, TextField } from '@/components/atoms/Form';

const LoginSchema = Yup.object().shape({
	Name: Yup.string().required('نام را وارد کنید'),
	serviceTypeIds: Yup.array()
		.of(Yup.string().required(' حداقل یک سرویس انتخاب کنید'))
		.min(1, 'حداقل یک سرویس نیاز است'),
});

import { IPageProps } from './type-page';

const Index: FC<IPageProps> = ({ DataRow, onRefreshItem }) => {
	const [selectedServices, setSelectedServices] = useState<string[]>([]); // برای نگهداری serviceCategoryId های هر ردیف
	const [listSub, setlistSub] = useState([]);
	const [listSubsub, setlistSubsub] = useState([]);
	const [listSubsubAll, setListSubsubAll] = useState([]); // کل زیرسرویس‌ها برای فیلتر کردن

	const { mutate: mutateState, isLoading } = useCarousel_CreateMutation();
	const { mutate: mutateCityUpdate, isLoading: isLoadingUpdate } = useCarousel_UpdateMutation();

	// گرفتن همه زیرسرویس‌ها (برای فیلتر دسته‌بندی)
	const { data: datasub, isSuccess: isSuccesssub } = useServiceSubCategory_GetAllQuery(
		{
			skip: 0,
			take: 1000,
		},
		{
			keepPreviousData: true,
		}
	);
	const { data: dataSubsub, isSuccess: isSuccessSubsub } = useServiceTypes_GetAllQuery(
		{
			skip: 0,
			take: 1000,
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
			setlistSub(newList);
		}
	}, [isSuccesssub, datasub]);

	useEffect(() => {
		if (isSuccessSubsub) {
			const newList =
				dataSubsub?.serviceTypes_getAll.result?.items?.map((cat) => ({
					option: cat.name,
					value: cat.id,
					serviceCategoryId: cat.serviceSubCategory?.id, // فرض بر این که چنین فیلدی هست
				})) || [];
			setListSubsubAll(newList);
		}
	}, [isSuccessSubsub, dataSubsub]);

	const defaultValues = {
		Name: '',
		serviceTypeIds: [''], // شروع با یک آیتم خالی
		id: 0,
	};

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, setValue, reset, watch } = methods;

	const serviceTypeIds = watch('serviceTypeIds');

	useEffect(() => {
		if (DataRow) {
			reset({
				Name: DataRow?.title || '',
				serviceTypeIds: DataRow?.serviceTypeIds || [''],
				id: DataRow?.id || 0,
			});

			// مقداردهی اولیه selectedServices برای دسته‌بندی‌ها
			// فرض می‌کنیم DataRow شامل serviceCategoryIds مشابه ساختار ما هست
			if (DataRow?.serviceCategoryIds && DataRow.serviceCategoryIds.length === DataRow.serviceTypeIds.length) {
				setSelectedServices(DataRow.serviceCategoryIds);
			} else {
				setSelectedServices(new Array(DataRow.serviceTypeIds.length).fill(''));
			}
		}
	}, [DataRow, reset]);

	const onSubmit = async (data: typeof defaultValues) => {
		const payload = {
			title: data.Name,
			serviceTypeIds: data.serviceTypeIds.filter((f) => f), // حذف رشته‌های خالی
			id: data.id || undefined,
		};

		if (data.id === 0) {
			await mutateState(
				{ input: payload },
				{
					onSuccess: () => {
						reset(defaultValues);
						setSelectedServices([]);
						onRefreshItem();
					},
				}
			);
		} else {
			await mutateCityUpdate(
				{ input: payload },
				{
					onSuccess: () => {
						reset(defaultValues);
						setSelectedServices([]);
						onRefreshItem();
					},
				}
			);
		}
	};

	// اضافه کردن سطر جدید
	const handleAddUpload = () => {
		setValue('serviceTypeIds', [...serviceTypeIds, '']);
		setSelectedServices([...selectedServices, '']);
	};

	// حذف سطر بر اساس ایندکس
	const handleRemoveUpload = (index: number) => {
		const newServiceTypeIds = [...serviceTypeIds];
		newServiceTypeIds.splice(index, 1);
		setValue('serviceTypeIds', newServiceTypeIds);

		const newSelectedServices = [...selectedServices];
		newSelectedServices.splice(index, 1);
		setSelectedServices(newSelectedServices);
	};

	// تغییر دسته‌بندی سطر مشخص
	const handleSelectServiceCategory = (index: number, value: string) => {
		const newSelectedServices = [...selectedServices];
		newSelectedServices[index] = value;
		setSelectedServices(newSelectedServices);

		// وقتی دسته‌بندی تغییر کرد، مقدار زیرسرویس اون سطر رو پاک کن (یا تنظیم کن روی '')
		const newServiceTypeIds = [...serviceTypeIds];
		newServiceTypeIds[index] = '';
		setValue('serviceTypeIds', newServiceTypeIds);
	};

	// فیلتر زیرسرویس‌ها بر اساس دسته‌بندی انتخاب شده هر سطر
	const filteredSubsubs = (index: number) => {
		const categoryId = selectedServices[index];
		return listSubsubAll.filter((item) => item.serviceCategoryId === categoryId);
	};

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={3}>
					<TextField required name="Name" placeholder="نام" sx={{ height: '40px' }} id="Name" />
				</Grid>

				<Grid item xs={12} sm={6} sx={{ marginTop: '20px' }}>
					{serviceTypeIds.map((value, index) => (
						<React.Fragment key={index}>
							<Grid container spacing={2} sx={{ marginTop: '1px' }} alignItems="center">
								<Grid item xs={12} sm={5}>
									<SelectField
										name={`serviceCategory_${index}`}
										options={listSub}
										autoWidth={false}
										multiple={false}
										native={false}
										onChanged={(e) => handleSelectServiceCategory(index, e.target.value)}
										value={selectedServices[index] || ''}
									/>
								</Grid>

								<Grid item xs={12} sm={5}>
									<SelectField
										name={`serviceTypeIds.${index}`}
										options={filteredSubsubs(index)}
										autoWidth={false}
										multiple={false}
										native={false}
										value={serviceTypeIds[index] || ''}
										onChanged={(e) => {
											const updated = [...serviceTypeIds];
											updated[index] = e.target.value;
											setValue('serviceTypeIds', updated);
										}}
									/>
								</Grid>
								{index > 0 ? (
									<Grid item xs={12} sm={2}>
										<Button
											variant="outlined"
											color="error"
											size="small"
											onClick={() => handleRemoveUpload(index)}
											sx={{ height: '40px', minWidth: '40px' }}
										>
											حذف
										</Button>
									</Grid>
								) : (
									''
								)}
							</Grid>
						</React.Fragment>
					))}

					<Button onClick={handleAddUpload} variant="outlined" size="small" sx={{ mt: 1, color: '#000 !important' }}>
						افزودن +
					</Button>
				</Grid>

				<Grid item xs={12} sm={3}>
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
