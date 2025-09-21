import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useAdmin_CreateMutation } from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, TextField } from '@/components/atoms/Form';
export const PHONE_VALIDATION = /^9\d{9}$/;

const LoginSchema = Yup.object().shape({
	FirstName: Yup.string()?.required(' نام را وارد کنید'),
	LastName: Yup.string()?.required(' نام خانوادگی را وارد کنید'),
	Mobil: Yup.string()
		.required('موبایل را وارد کنید')
		.matches(PHONE_VALIDATION, 'شماره موبایل معتبر نیست')
		.max(10, 'شماره موبایل نباید بیشتر از 10 رقم باشد'),
});
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, onRefreshItem }) => {
	const { mutate: mutateState, isLoading: isLoading } = useAdmin_CreateMutation();

	const defaultValues = {
		FirstName: '',
		LastName: '',
		Mobil: '',
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
				LastName: DataRow?.lastName || '',
				FirstName: DataRow?.firstName || '',
				Mobil: DataRow?.phoneNumber || '',
				id: DataRow?.id || '',
			});
		}
	}, [DataRow, reset]);

	const onSubmit = async (data: typeof defaultValues) => {
		if (data.id == 0) {
			await mutateState(
				{
					input: {
						lastName: data.LastName,
						firstName: data.FirstName,
						phoneNumber: '+98' + data.Mobil,
					},
				},
				{
					onSuccess: async (res) => {
						setValue('LastName', '');
						setValue('FirstName', '');
						setValue('Mobil', '');
						onRefreshItem();
					},
					onError: (err) => {},
				}
			);
		}
	};

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={3}>
					<TextField required name="FirstName" placeholder="  نام" sx={{ mb: 0, height: '40px' }} id="Name" />
				</Grid>
				<Grid item xs={12} sm={3}>
					<TextField required name="LastName" placeholder="  نام خانوادگی" sx={{ mb: 0, height: '40px' }} id="Name" />
				</Grid>
				<Grid item xs={12} sm={3}>
					<TextField required name="Mobil" placeholder="موبایل" sx={{ mb: 0, height: '40px' }} id="Name" />
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
