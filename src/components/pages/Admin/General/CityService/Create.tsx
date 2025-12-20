import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useCity_GetAllQuery, useProvincesQuery } from 'src/graphql/generated';

import { FormProvider, SelectField, useForm } from '@/components/atoms/Form';

import Modal from './ModalInsert';
import { IPageProps } from './type-page';

const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, onSearchItem, openModal }) => {
	/* ----------------------- STATES ----------------------- */
	const [open, setOpen] = useState(false);
	const [stateId, setStateId] = useState<string>('');

	const [listStates, setListStates] = useState<any[]>([]);
	const [listCities, setListCities] = useState<any[]>([]);

	/* ----------------------- FORM ----------------------- */
	const methods = useForm({
		defaultValues: {
			StateId: '',
			CityId: '',
		},
	});

	const { setValue } = methods;

	/* ----------------------- QUERIES ----------------------- */
	const { data: provinceData, isSuccess: stateLoaded } = useProvincesQuery(
		{ skip: 0, take: 1000 },
		{ keepPreviousData: true }
	);

	const { data: cityData, isSuccess: cityLoaded } = useCity_GetAllQuery(
		{
			skip: 0,
			take: 1000,
			where: stateId ? { province: { id: { eq: stateId } } } : undefined,
		},
		{
			keepPreviousData: true,
			enabled: !!stateId, // ⭐ فقط وقتی استان داریم
		}
	);

	/* ----------------------- EFFECTS ----------------------- */

	// استان‌ها
	useEffect(() => {
		if (!stateLoaded) return;

		const mapped =
			provinceData?.province_getAll?.result?.items?.map(({ id, name }) => ({
				value: id,
				option: name,
			})) || [];

		setListStates(mapped);

		// ⭐ انتخاب پیش‌فرض اولین استان
		if (mapped.length > 0) {
			setValue('StateId', mapped[0].value);
			setStateId(mapped[0].value);
		}
	}, [stateLoaded, provinceData, setValue]);

	// شهرها
	useEffect(() => {
		if (!cityLoaded) return;

		const mapped =
			cityData?.city_getAll?.result?.items?.map(({ id, name }) => ({
				value: id,
				option: name,
			})) || [];

		setListCities(mapped);

		// ⭐ انتخاب پیش‌فرض اولین شهر
		if (mapped.length > 0) {
			setValue('CityId', mapped[0].value);
			onSearchItem(mapped[0].value);
		}
	}, [cityLoaded, cityData, setValue, onSearchItem]);

	// باز شدن مودال
	useEffect(() => {
		if (openModal) setOpen(true);
	}, [openModal]);

	/* ----------------------- RENDER ----------------------- */
	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} dir="rtl" alignItems="center">
				{/* استان */}
				<Grid item xs={12} sm={3}>
					<SelectField
						name="StateId"
						options={listStates}
						onChanged={(e) => {
							const value = e.target.value;
							setStateId(value);
							setValue('CityId', ''); // ریست شهر
						}}
					/>
				</Grid>

				{/* شهر */}
				<Grid item xs={12} sm={3}>
					<SelectField name="CityId" options={listCities} onChanged={(e) => onSearchItem(e.target.value)} />
				</Grid>

				{/* دکمه جدید */}
				<Grid item xs={12} sm={3}>
					<LoadingButton
						variant="contained"
						onClick={() => setOpen(true)}
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
