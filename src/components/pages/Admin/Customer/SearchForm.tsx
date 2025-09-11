import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useQueryAxios } from 'src/components/pages/Query';
import { useCity_GetAllQuery, useProvincesQuery } from 'src/graphql/generated';

import { useForm } from '@/components/atoms/Form';
import { FormProvider, TextField } from '@/components/atoms/Form';

import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ onSearchItem }) => {
	const [listState, setListState] = useState([]);
	const [listCity, setListCity] = useState([]);
	const [SelectState, SetSelectState] = useState('');

	const { data, isSuccess, isError } = useProvincesQuery(
		{ skip: 0, take: 1000 },
		{
			keepPreviousData: true,
		}
	);
	const { data: DataCity, isSuccess: isSuccessCity } = useCity_GetAllQuery(
		{ skip: 0, take: 1000, where: { province: { id: { eq: SelectState } } } },
		{
			keepPreviousData: true,
			enabled: SelectState != '',
		}
	);
	useEffect(() => {
		if (isSuccessCity) {
			const newList =
				DataCity?.city_getAll?.result?.items?.map(({ name, id }) => ({
					option: name,
					value: id,
				})) || [];

			setListCity(newList);
		}
	}, [isSuccessCity, DataCity]);

	useEffect(() => {
		if (isSuccess) {
			const newList =
				data?.province_getAll?.result?.items?.map(({ name, id }) => ({
					option: name,
					value: id,
				})) || [];

			if (newList.length > 0) setListState(newList);
		}
	}, [isSuccess, data]);

	const [loading, setloading] = useState(false);
	const router = useRouter();
	const { Signin } = useQueryAxios();
	const defaultValues = {
		name: '',
		Code: '',
	};

	const methods = useForm({
		defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = async (data: typeof defaultValues) => {
		console.log(data);
		onSearchItem(data?.name, data?.Code);
	};

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={3}>
					<TextField required label="نام/ نام خانوادگی" name="name" placeholder="" fullWidth sx={{ height: '40px' }} />
				</Grid>

				<Grid item xs={12} sm={3}>
					<TextField required label="کدمشتری" name="Code" placeholder="" fullWidth sx={{ height: '40px' }} />
				</Grid>
			</Grid>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-end" dir="rtl" sx={{ marginTop: '1px' }}>
				<Grid item xs={12} sm="auto" sx={{ mr: 'auto' }}>
					<LoadingButton
						variant="contained"
						onClick={handleSubmit(onSubmit)}
						sx={{
							fontSize: '15px',
							background: '#88b2e1',
							color: '#fff',
							borderRadius: '8px',
							minWidth: 100,
							height: 40,
						}}
					>
						جستجو
					</LoadingButton>
				</Grid>
			</Grid>
		</FormProvider>
	);
};

export default Index;
