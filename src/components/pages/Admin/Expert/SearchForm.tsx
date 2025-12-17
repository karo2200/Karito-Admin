import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useState } from 'react';

import { useForm } from '@/components/atoms/Form';
import { FormProvider, SelectField, TextField } from '@/components/atoms/Form';
import RHFDatePicker from '@/components/atoms/Form/RHFDatepiker';
import Convert from '@/utils/convert';

import { IPageProps } from './type-page';
const celllist = [
	{ value: 'firstName', option: 'نام' },
	{ value: 'lastName', option: 'نام خانوادگی' },
	{ value: 'code', option: 'کد پرسنلی' },
	{ value: 'phoneNumber', option: 'موبایل' },
	{ value: 'registeredAt', option: 'تاریخ ' },
	{ value: 'city', option: 'شهر' },
	{ value: 'state', option: 'استان' },
];
const Index: FC<IPageProps> = ({ onSearchItem }) => {
	const [value, setValue] = useState('');

	const defaultValues = {
		name: '',
		Date: '',
		cell: celllist[0].value,
	};

	const methods = useForm({
		defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = async (data: typeof defaultValues) => {
		if (value != 'registeredAt') onSearchItem(data?.name, data?.cell);
		else {
			try {
				const dates = Convert.convertShamsitomiladi(data?.Date);
				const start = Convert.TimeZoneStart(dates);
				const end = Convert.TimeZoneStart(dates);
				onSearchItem(start, data?.cell, end);
			} catch {
				onSearchItem('', '');
			}
		}
	};

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={3}>
					{value != 'registeredAt' ? (
						<TextField required label="جستجو" name="name" placeholder="" fullWidth sx={{ height: '40px' }} />
					) : (
						<RHFDatePicker name="Date" label="جستجو" />
					)}
				</Grid>
				<Grid item xs={12} sm={3}>
					<SelectField
						name="cell"
						options={celllist}
						label="ستون"
						onChanged={(e) => setValue(e.target.value)}
						autoWidth={false}
						multiple={false}
						native={false}
					/>
				</Grid>
				<Grid item xs={12} sm={3} sx={{ marginTop: '28px' }}>
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
