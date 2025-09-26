import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useCancellationReason_CreateMutation, useCancellationReason_UpdateMutation } from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, TextField } from '@/components/atoms/Form';

const LoginSchema = Yup.object().shape({
	Name: Yup.string()?.required('  دلیل را وارد کنید'),
});
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, onRefreshItem }) => {
	const { mutate: mutateState, isLoading: isLoading } = useCancellationReason_CreateMutation();
	const { mutate: mutateStateUp, isLoading: isLoadingUp } = useCancellationReason_UpdateMutation();

	const defaultValues = {
		Name: '',
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
				Name: DataRow?.name || '',
				id: DataRow?.id || '',
			});
		}
	}, [DataRow, reset]);

	const onSubmit = async (data: typeof defaultValues) => {
		if (data.id == 0) {
			await mutateState(
				{
					input: {
						name: data.Name,
					},
				},
				{
					onSuccess: async (res) => {
						setValue('Name', '');
						onRefreshItem();
					},
					onError: (err) => {},
				}
			);
		} else {
			await mutateStateUp(
				{
					input: {
						name: data.Name,
						id: data.id,
					},
				},
				{
					onSuccess: async (res) => {
						setValue('Name', '');
						setValue('id', 0);
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
					<TextField required name="Name" placeholder="دلیل" sx={{ mb: 0, height: '40px' }} id="Name" />
				</Grid>
				<Grid item xs={12} sm={3}>
					<LoadingButton
						variant="contained"
						onClick={handleSubmit(onSubmit)}
						loading={isLoading || isLoadingUp}
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
