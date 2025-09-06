import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
	useServiceCategory_GetAllQuery,
	useServiceSubCategory_CreateMutation,
	useServiceSubCategory_UpdateMutation,
} from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, SelectField, TextField } from '@/components/atoms/Form';
import UploadPage from '@/components/organisms/UploadPage';
const LoginSchema = Yup.object().shape({
	Name: Yup.string()?.required(' نام را وارد کنید'),
	FilePath: Yup.string()?.required('  تصویر را وارد کنید'),
	serviceCategoryId: Yup.string()?.required('فیلد اجباری است'),
});
const Index = ({ DataRow, onRefreshItem, onSearchItem }) => {
	const [Empty, setEmpty] = useState(false);
	const [disabled, setdisabled] = useState(false);
	const [listCategury, setlistCategury] = useState([]);

	const { mutate: mutateState, isLoading: isLoading } = useServiceSubCategory_CreateMutation();
	const { mutate: mutateCityUpdate, isLoading: isLoadingUpdate } = useServiceSubCategory_UpdateMutation();
	const { data, isSuccess, isError } = useServiceCategory_GetAllQuery(
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

			//setlistCategury(newList);
		}
	}, [isSuccess, data]);

	const defaultValues = {
		Name: '',
		FilePath: '',
		id: 0,
		serviceCategoryId: '',
	};
	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, setValue, reset, getValues } = methods;
	const [loadingimg, setloadingimg] = useState(false);
	useEffect(() => {
		if (listCategury?.length > 0) {
			setValue('serviceCategoryId', listCategury[0].value);
			//onSearchItem(listCategury[0].value);
		}
	}, [setValue, listCategury]);

	useEffect(() => {
		if (DataRow) {
			reset({
				Name: DataRow?.name || '',
				FilePath: DataRow?.logo || '',
				id: DataRow?.id || 0,
				serviceCategoryId: DataRow?.serviceCategoryId || listCategury[0].value,
			});
			setdisabled(true);
		}
	}, [DataRow, reset]);

	const onSubmit = async (data: typeof defaultValues) => {
		if (data.id == 0) {
			await mutateState(
				{
					input: {
						name: data.Name,
						logo: data.FilePath,
						serviceCategoryId: data.serviceCategoryId,
					},
				},
				{
					onSuccess: async (res) => {
						setEmpty(true);
						setValue('serviceCategoryId', data.serviceCategoryId);
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
						serviceSubCategoryId: data.id,
					},
				},
				{
					onSuccess: async (res) => {
						setEmpty(true);
						setValue('serviceCategoryId', data.serviceCategoryId);
						setValue('Name', '');
						setValue('FilePath', '');
						setValue('id', 0);
						onRefreshItem();
						setdisabled(false);
					},
					onError: (err) => {},
				}
			);
	};

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<SelectField
						disabled={disabled}
						name="serviceCategoryId"
						options={listCategury}
						autoWidth={false}
						multiple={false}
						native={false}
						onChanged={(e) => {
							onSearchItem(e.target.value);
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<TextField required name="Name" placeholder="  سرویس" sx={{ height: '40px' }} id="Name" />
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
							marginTop: '5px',
						}}
					>
						ثبت
					</LoadingButton>
				</Grid>
			</Grid>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl" marginTop="5px">
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
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}></Grid>
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}></Grid>
			</Grid>
		</FormProvider>
	);
};

export default Index;
