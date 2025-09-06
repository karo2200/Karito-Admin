import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
	useCity_GetAllQuery,
	useNeighborhood_CreateMutation,
	useNeighborhood_UpdateMutation,
} from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, SelectField, TextField } from '@/components/atoms/Form';

const LoginSchema = Yup.object().shape({
	Name: Yup.string()?.required(' نام محله را وارد کنید'),
	CityId: Yup.string()?.required('شهر را انتخاب کنید'),
});
const Index = ({ DataRow, onRefreshItem, onSearchItem }) => {
	const [listState, setListState] = useState([]);
	const { mutate: mutateCity, isLoading: isLoading } = useNeighborhood_CreateMutation();
	const { mutate: mutateCityUpdate, isLoading: isLoadingUpdate } = useNeighborhood_UpdateMutation();
	const { data, isFetching, isSuccess, isError } = useCity_GetAllQuery(
		{ skip: 0, take: 1000 },
		{
			keepPreviousData: true,
		}
	);

	useEffect(() => {
		if (isSuccess) {
			const newList =
				data?.city_getAll?.result?.items?.map((page) => ({
					option: page.name,
					value: page.id,
				})) || [];

			setListState(newList);
		}
	}, [isSuccess, data]);

	const defaultValues = {
		Name: '',
		CityId: '',
		id: 0,
	};

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, reset, setValue } = methods;

	useEffect(() => {
		if (listState?.length > 0) {
			setValue('CityId', listState[0].value);
			onSearchItem(listState[0].value);
		}
	}, [setValue, listState]);

	useEffect(() => {
		if (DataRow) {
			reset({
				id: DataRow?.id,
				Name: DataRow?.name || '',
				CityId: DataRow?.city?.id || '',
			});
		} else
			reset({
				id: 0,
				Name: '',
				CityId: '',
			});
	}, [DataRow, reset]);

	const onSubmit = async (data: typeof defaultValues) => {
		if (data.id == 0) {
			await mutateCity(
				{
					input: {
						name: data.Name,
						cityId: data.CityId,
					},
				},
				{
					onSuccess: async (res) => {
						setValue('Name', '');
						setValue('CityId', data.CityId);
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
						neighborhoodId: data.id,
					},
				},
				{
					onSuccess: async (res) => {
						DataRow = null;
						setValue('Name', '');
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
				<Grid item xs={12} sm={3}>
					<SelectField
						name="CityId"
						options={listState}
						autoWidth={false}
						multiple={false}
						native={false}
						onChanged={(e) => {
							onSearchItem(e.target.value);
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<TextField required name="Name" placeholder="  محله" sx={{ height: '40px' }} id="Name" />
				</Grid>

				<Grid item xs={12} sm={3}>
					<LoadingButton
						variant="contained"
						onClick={handleSubmit(onSubmit)}
						loading={isLoading || isLoadingUpdate}
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
