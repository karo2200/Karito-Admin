import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useState } from 'react';

import { useForm } from '@/components/atoms/Form';
import { FormProvider, SelectField, TextField } from '@/components/atoms/Form';
import RHFDatePicker from '@/components/atoms/Form/RHFDatepiker';
import Convert from '@/utils/convert';

import { IPageProps } from './type-page';
const celllist = [
	{ value: 'customer', option: 'مشتری' },
	{ value: 'specialist', option: 'متخصص' },
	{ value: 'service', option: 'سرویس' },
	{ value: 'orderNumber', option: 'شماره سفارش' },
	{ value: 'basePrice', option: 'قیمت' },
	{ value: 'finalPrice', option: 'قیمت نهایی' },
	{ value: 'discountAmount', option: 'تخفیف' },
	{ value: 'createdAt', option: 'تاریخ سفارش' },
	{ value: 'completedAt', option: 'تاریخ تکمیل سفارش' },
	{ value: 'cancelledAt', option: 'تاریخ لغو سفارش' },
	{ value: 'assignedAt', option: 'تاریخ تایید سفارش توسط متخصص' },
	{ value: 'arrivedAt', option: 'تاریخ رسیدن متخصص به محل' },
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
		if (
			value != 'createdAt' &&
			value != 'completedAt' &&
			value != 'cancelledAt' &&
			value != 'assignedAt' &&
			value != 'arrivedAt'
		)
			onSearchItem(data?.name, data?.cell);
		else {
			try {
				const dates = Convert.convertShamsitomiladi(data?.Date);
				const start = Convert.TimeZoneStart(dates);
				const end = Convert.addOneDay(dates);
				const end1 = Convert.TimeZoneStart(end);
				onSearchItem(start, data?.cell, end1);
			} catch (e) {
				onSearchItem('', '');
			}
		}
	};

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={3}>
					{value != 'createdAt' && value != 'completedAt' && value != 'cancelledAt' ? (
						<TextField required label="جستجو" name="name" placeholder="" fullWidth sx={{ height: '40px' }} />
					) : (
						<RHFDatePicker name="Date" label="جستجو" />
					)}
				</Grid>
				<Grid item xs={12} sm={3}>
					<SelectField name="cell" options={celllist} label="ستون" onChanged={(e) => setValue(e.target.value)} />
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
