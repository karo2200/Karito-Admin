import { Box, Grid, Typography } from '@mui/material';
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns';
import React, { useEffect, useState } from 'react';

import { useForm } from '@/components/atoms/Form';
import { FormProvider, SelectField } from '@/components/atoms/Form';
import COLORS from '@/theme/colors';

import Expert from './Dashbord/Expert';
import Number from './Dashbord/NumberUp';
import Order from './Dashbord/order';
const Time = [
	{ option: 'هفتگی', value: 'weekly' },
	{ option: 'ماهانه', value: 'monthly' },
];
const index = () => {
	const [period, setPeriod] = useState('weekly'); // یا 'monthly'
	const [dateRange, setDateRange] = useState({ start: '', end: '' });

	useEffect(() => {
		const now = new Date();

		if (period === 'weekly') {
			const start = startOfWeek(now, { weekStartsOn: 6 }); // هفته از شنبه شروع میشه (6 = شنبه)
			const end = endOfWeek(now, { weekStartsOn: 6 });
			setDateRange({
				start: format(start, 'yyyy-MM-dd'),
				end: format(end, 'yyyy-MM-dd'),
			});
		} else if (period === 'monthly') {
			const start = startOfMonth(now);
			const end = endOfMonth(now);
			setDateRange({
				start: format(start, 'yyyy-MM-dd'),
				end: format(end, 'yyyy-MM-dd'),
			});
		}
	}, [period]);
	const defaultValues = {
		Time: 'weekly',
	};
	const methods = useForm({
		defaultValues,
	});
	const { handleSubmit, reset, setValue } = methods;

	return (
		<>
			<Grid container spacing={2} marginBottom="20px" alignItems="center" justifyContent="flex-start" dir="rtl">
				<FormProvider methods={methods}>
					<Grid item xs={12} sm={12}>
						<Box
							sx={{
								backgroundColor: COLORS.blue4,
								borderRadius: '9px',
								height: '40px',
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center', // وسط چین افقی
								gap: 2, // فاصله افقی مساوی بین تایپوگرافی و سِلِکت
								direction: 'rtl',
							}}
						>
							<Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>وضعیت نمایش</Typography>
							<SelectField
								sx={{ width: '150px', borderColor: 'transparent' }}
								name="Time"
								options={Time}
								autoWidth={false}
								multiple={false}
								native={false}
								onChanged={(e) => {
									setPeriod(e.target.value);
								}}
							/>
						</Box>
					</Grid>
				</FormProvider>
				<Grid item xs={12} sm={12}>
					<Number StartDate={dateRange.start} EndDate={dateRange.end} />
				</Grid>
			</Grid>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={6}>
					<Box
						sx={{
							boxShadow: ' rgb(100 100 111 / 9%) 0px 7px 29px 0px',
							width: '100%',
							height: '400px',
							borderRadius: 2,
							marginBottom: 5,
							padding: 2,
							border: '1px solid #00000014',
							overflowY: 'scroll',
						}}
					>
						<Typography
							fontFamily="Vazir"
							color={COLORS.blue}
							fontSize="20px"
							fontWeight="bold"
							textAlign="center"
							sx={{ marginBottom: '5px' }}
						>
							لیست سفارشات
						</Typography>
						<Order />
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Box
						sx={{
							boxShadow: ' rgb(100 100 111 / 9%) 0px 7px 29px 0px',
							width: '100%',
							height: '400px',
							borderRadius: 2,
							marginBottom: 5,
							padding: 2,
							border: '1px solid #00000014',
							overflow: 'hidden',
						}}
					>
						<Typography
							fontFamily="Vazir"
							color={COLORS.blue}
							fontSize="20px"
							fontWeight="bold"
							textAlign="center"
							sx={{ marginBottom: '5px' }}
						>
							لیست متخصصین
						</Typography>
						<Expert />
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default index;
