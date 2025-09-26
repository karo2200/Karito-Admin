import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { useDiscountCode_CreateMutation } from 'src/graphql/generated';

import { CheckBox, useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, TextField } from '@/components/atoms/Form';
import RHFDatePicker from '@/components/atoms/Form/RHFDatepiker';
import Convert from '@/utils/convert'; // حتما این فایل کمکت میکنه به تبدیل تاریخ شمسی به میلادی

const LoginSchema = Yup.object().shape({
	Name: Yup.string().required('نام مشتری را وارد کنید'),
	Amount: Yup.number().required('فیلد اجباری می باشد'),
	Title: Yup.string().required('فیلد اجباری می باشد'),
	Date: Yup.string().required('فیلد اجباری می باشد'),
});

import { IPageProps } from './type-page';

const Index: FC<IPageProps> = ({ customerId, onRefreshItem, customerName }) => {
	const { mutate: mutateCity, isLoading } = useDiscountCode_CreateMutation();

	const defaultValues = {
		Amount: '',
		Title: '',
		Date: '',
		Name: customerName || '',
		isPercentage: false,
	};

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, reset, setValue } = methods;

	const onSubmit = async (data: typeof defaultValues) => {
		// تبدیل تاریخ شمسی به میلادی سپس به ISO
		let isoDate = null;
		if (data.Date) {
			const miladiDateStr = Convert.convertShamsitomiladi(data.Date);
			if (miladiDateStr) {
				const [year, month, day] = miladiDateStr.split('/').map(Number);
				isoDate = new Date(year, month - 1, day).toISOString();
			}
		}

		await mutateCity(
			{
				input: {
					customerId,
					expiryDate: isoDate,
					amount: data.Amount,
					isPercentage: data.isPercentage,
					title: data.Title,
				},
			},
			{
				onSuccess: () => {
					reset({
						Amount: '',
						Title: '',
						Date: '',
						Name: customerName || '',
						isPercentage: false,
					});
					onRefreshItem();
				},
				onError: (err) => {
					// مدیریت ارور در صورت نیاز
					console.error(err);
				},
			}
		);
	};

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl" sx={{ padding: 2 }}>
				<Grid item xs={12} sm={3}>
					<TextField required name="Name" label="نام مشتری" fullWidth sx={{ height: 40 }} id="Name" />
				</Grid>

				<Grid item xs={12} sm={3}>
					<TextField required name="Title" label="عنوان" fullWidth sx={{ height: 40 }} id="Title" />
				</Grid>

				<Grid item xs={12} sm={3}>
					<TextField required name="Amount" label="قیمت" fullWidth sx={{ height: 40 }} id="Amount" />
				</Grid>

				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<CheckBox name="isPercentage" label="درصدی" />
				</Grid>

				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<RHFDatePicker name="Date" label="تاریخ انقضا" />
				</Grid>

				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<LoadingButton
						variant="contained"
						onClick={handleSubmit(onSubmit)}
						loading={isLoading}
						sx={{
							fontSize: 15,
							backgroundColor: '#88b2e1',
							color: '#fff',
							borderRadius: '8px',
							width: 100,
							marginTop: 1,
							height: 40,
							'&:hover': {
								backgroundColor: '#6a92c3',
							},
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
