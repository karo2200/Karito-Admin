import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC } from 'react';

import { SelectField, useForm } from '@/components/atoms/Form';
import { FormProvider, TextField } from '@/components/atoms/Form';

import { IPageProps } from './type-page';
const celllist = [
	{ value: 'firstName', option: 'نام' },
	{ value: 'lastName', option: 'نام خانوادگی' },
	{ value: 'code', option: 'کد پرسنلی' },
	{ value: 'phoneNumber', option: 'موبایل' },
];
const Index: FC<IPageProps> = ({ onSearchItem }) => {
	const defaultValues = {
		name: '',
		cell: celllist[0].value,
	};

	const methods = useForm({
		defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = async (data: typeof defaultValues) => {
		onSearchItem(data?.name, data?.cell);
	};

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={3}>
					<TextField required label="جستجو" name="name" placeholder="" fullWidth sx={{ height: '40px' }} />
				</Grid>
				<Grid item xs={12} sm={3}>
					<SelectField name="cell" options={celllist} label="ستون" autoWidth={false} multiple={false} native={false} />
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
