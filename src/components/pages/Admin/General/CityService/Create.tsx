import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useCity_GetAllQuery, useProvincesQuery } from 'src/graphql/generated';

import { SelectField, useForm } from '@/components/atoms/Form';
import { FormProvider } from '@/components/atoms/Form';

import Modal from './ModalInsert';
import { IPageProps } from './type-page';

const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, onSearchItem, openModal }) => {
	/* -----------------------  STATES  ----------------------- */
	const [open, setOpen] = useState(false);
	const [stateId, setStateId] = useState('');

	const [listStates, setListStates] = useState([]);
	const [listCities, setListCities] = useState([]);

	/* -----------------------  FORM  ----------------------- */
	const defaultValues = {
		StateId: '',
		CityId: '',
	};

	const methods = useForm({
		defaultValues,
	});

	/* -----------------------  QUERIES  ----------------------- */
	const { data: provinceData, isSuccess: stateLoaded } = useProvincesQuery(
		{ skip: 0, take: 1000 },
		{ keepPreviousData: true }
	);

	const { data: cityData, isSuccess: cityLoaded } = useCity_GetAllQuery(
		{
			skip: 0,
			take: 1000,
			where: { province: { id: { eq: stateId } } },
		},
		{ keepPreviousData: true }
	);

	/* -----------------------  MAPPING EFFECTS  ----------------------- */
	useEffect(() => {
		if (!stateLoaded) return;
		const mapped =
			provinceData?.province_getAll?.result?.items?.map(({ id, name }) => ({
				value: id,
				option: name,
			})) || [];
		setListStates(mapped);
	}, [stateLoaded, provinceData]);

	useEffect(() => {
		if (!cityLoaded) return;
		const mapped =
			cityData?.city_getAll?.result?.items?.map(({ id, name }) => ({
				value: id,
				option: name,
			})) || [];
		setListCities(mapped);
	}, [cityLoaded, cityData]);
	/* -----------------------  MODAL AUTO OPEN  ----------------------- */
	useEffect(() => {
		if (openModal) setOpen(true);
	}, [openModal]);

	/* ================================================================== */
	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} dir="rtl" alignItems="center">
				{/* استان */}
				<Grid item xs={12} sm={3}>
					<SelectField name="StateId" options={listStates} onChanged={(e) => setStateId(e.target.value)} />
				</Grid>

				{/* شهر */}
				<Grid item xs={12} sm={3}>
					<SelectField name="CityId" options={listCities} onChanged={(e) => onSearchItem(e.target.value)} />
				</Grid>

				{/* دکمه جدید */}
				<Grid item xs={12} sm={3}>
					<LoadingButton
						variant="contained"
						onClick={() => {
							setOpen(true);
						}}
						sx={{
							background: '#88b2e1',
							color: '#fff',
							borderRadius: '8px',
							fontSize: '15px',
							width: 120,
						}}
					>
						جدید
					</LoadingButton>
				</Grid>
			</Grid>

			{/* MODAL */}
			<Modal
				open={open}
				handleClose={() => {
					setOpen(false);
					onRefreshItem();
				}}
				DataRow={DataRow}
			/>
		</FormProvider>
	);
};

export default Index;
