import { LoadingButton } from '@mui/lab';
import { Button, Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useCarousel_CreateMutation, useCarousel_UpdateMutation } from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, TextField } from '@/components/atoms/Form';
import UploadPage from '@/components/organisms/UploadPage';

const LoginSchema = Yup.object().shape({
	Name: Yup.string().required('نام را وارد کنید'),
	FilePaths: Yup.array().of(Yup.string().required('تصویر را وارد کنید')).min(1, 'حداقل یک تصویر نیاز است'),
});

import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, onRefreshItem }) => {
	const [Empty, setEmpty] = useState(false);
	const [ListFile, setListFile] = useState([]);

	const { mutate: mutateState, isLoading } = useCarousel_CreateMutation();
	const { mutate: mutateCityUpdate, isLoading: isLoadingUpdate } = useCarousel_UpdateMutation();

	const defaultValues = {
		Name: '',
		FilePaths: [''], // ✅ start with one empty upload field
		id: 0,
	};

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, setValue, reset, watch } = methods;
	const [loadingimg, setloadingimg] = useState(false);

	const filePaths = watch('FilePaths');

	useEffect(() => {
		if (DataRow) {
			reset({
				Name: DataRow?.title || '',
				FilePaths: DataRow?.imageUrls || [''],
				id: DataRow?.id || 0,
			});
			setListFile(DataRow?.imageUrls);
		}
	}, [DataRow, reset]);

	const onSubmit = async (data: typeof defaultValues) => {
		const payload = {
			title: data.Name,
			imageUrls: data.FilePaths.filter((f) => f), // remove empty strings
			id: data.id || undefined,
		};

		if (data.id === 0) {
			await mutateState(
				{ input: payload },
				{
					onSuccess: () => {
						setEmpty(true);
						reset(defaultValues);
						onRefreshItem();
					},
				}
			);
		} else {
			await mutateCityUpdate(
				{ input: payload },
				{
					onSuccess: () => {
						setEmpty(true);
						reset(defaultValues);
						onRefreshItem();
					},
				}
			);
		}
	};

	// ✅ Add new empty upload slot
	const handleAddUpload = () => {
		setValue('FilePaths', [...filePaths, '']);
	};

	// ✅ Update one slot
	const handleSetUpload = (index: number, url: string) => {
		const updated = [...filePaths];
		updated[index] = url;
		setValue('FilePaths', updated);
	};

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={3}>
					<TextField required name="Name" placeholder="نام" sx={{ height: '40px' }} id="Name" />
				</Grid>

				<Grid item xs={12} sm={6}>
					{filePaths.map((file, index) => (
						<UploadPage
							Empty={Empty}
							OnhandelEmpty={() => setEmpty(false)}
							//Url={ListFile && ListFile[index]}
							key={index}
							name={`FilePaths.${index}`}
							onDrop={(url) => handleSetUpload(index, url)}
						/>
					))}

					<Button onClick={handleAddUpload} variant="outlined" size="small" sx={{ mt: 1, color: '#000 !important' }}>
						افزودن تصویر +
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
