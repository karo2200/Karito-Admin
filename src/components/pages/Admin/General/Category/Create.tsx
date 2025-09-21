import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
	useServiceCategory_CreateServiceCategoryMutation,
	useServiceCategory_UpdateServiceCategoryMutation,
} from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, TextField } from '@/components/atoms/Form';
import UploadPage from '@/components/organisms/UploadPage';
const LoginSchema = Yup.object().shape({
	Name: Yup.string()?.required(' نام را وارد کنید'),
	FilePath: Yup.string()?.required('  تصویر را وارد کنید'),
});
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, onRefreshItem }) => {
	const [Empty, setEmpty] = useState(false);

	const { mutate: mutateState, isLoading: isLoading } = useServiceCategory_CreateServiceCategoryMutation();
	const { mutate: mutateCityUpdate, isLoading: isLoadingUpdate } = useServiceCategory_UpdateServiceCategoryMutation();
	const defaultValues = {
		Name: '',
		FilePath: '',
		id: 0,
	};
	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, setValue, reset, getValues } = methods;

	useEffect(() => {
		if (DataRow) {
			reset({
				Name: DataRow?.name || '',
				FilePath: DataRow?.logo || '',
				id: DataRow?.id || 0,
			});
		}
	}, [DataRow, reset]);

	const onSubmit = async (data: typeof defaultValues) => {
		if (data.id == 0) {
			await mutateState(
				{
					input: {
						name: data.Name,
						logo: data.FilePath,
					},
				},
				{
					onSuccess: async (res) => {
						setEmpty(true);
						setValue('Name', '');
						setValue('FilePath', '');

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
						serviceCategoryId: data.id,
					},
				},
				{
					onSuccess: async (res) => {
						DataRow = null;
						setEmpty(true);
						setValue('Name', '');
						setValue('FilePath', '');
						setValue('id', 0);
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
					<TextField required name="Name" placeholder="  سرویس" sx={{ height: '40px' }} id="Name" />
				</Grid>

				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<UploadPage
						Empty={Empty}
						OnhandelEmpty={() => setEmpty(false)}
						Url={getValues('FilePath')}
						name="FilePath"
						onDrop={(url) => setValue('FilePath', url)}
					/>
					{/*<RHFUploadAvatar name="FilePath" onDrop={handleDrop} />*/}
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
