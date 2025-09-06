import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useBanner_CreateMutation, useBanner_UpdateMutation } from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, TextField } from '@/components/atoms/Form';
import UploadPage from '@/components/organisms/UploadPage';
const LoginSchema = Yup.object().shape({
	Name: Yup.string()?.required(' نام را وارد کنید'),
	FilePath: Yup.string()?.required('  تصویر را وارد کنید'),
});
const Index = ({ DataRow, onRefreshItem }) => {
	const [Empty, setEmpty] = useState(false);

	const { mutate: mutateState, isLoading: isLoading } = useBanner_CreateMutation();
	const { mutate: mutateCityUpdate, isLoading: isLoadingUpdate } = useBanner_UpdateMutation();

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
	const [loadingimg, setloadingimg] = useState(false);

	useEffect(() => {
		if (DataRow) {
			reset({
				Name: DataRow?.title || '',
				FilePath: DataRow?.imageUrl || '',
				id: DataRow?.id || 0,
			});
		}
	}, [DataRow, reset]);

	const onSubmit = async (data: typeof defaultValues) => {
		if (data.id == 0) {
			await mutateState(
				{
					input: {
						title: data.Name,
						imageUrl: data.FilePath,
					},
				},
				{
					onSuccess: async (res) => {
						setValue('Name', '');
						setValue('FilePath', '');
						setEmpty(true);

						onRefreshItem();
					},
					onError: (err) => {},
				}
			);
		} else
			await mutateCityUpdate(
				{
					input: {
						title: data.Name,
						imageUrl: data.FilePath,
						id: data.id,
					},
				},
				{
					onSuccess: async (res) => {
						DataRow = null;
						setValue('Name', '');
						setValue('FilePath', '');
						setValue('id', 0);
						setEmpty(true);
						onRefreshItem();
					},
					onError: (err) => {},
				}
			);
	};

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={3}>
					<TextField required name="Name" placeholder="  بنر" sx={{ height: '40px' }} id="Name" />
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
