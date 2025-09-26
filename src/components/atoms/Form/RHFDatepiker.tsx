import { Box, FormHelperText, Typography } from '@mui/material';
import React from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker, { DateObject } from 'react-multi-date-picker';

type RHFDatePickerProps = {
	name: string;
	label?: string;
	width?: number;
	id?: string;
	onChanged?: (value?: string) => void;
};

export default function RHFDatePicker({ name, label, width, id, onChanged }: RHFDatePickerProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				React.useEffect(() => {
					if (onChanged) onChanged(field.value);
				}, [field.value, onChanged]);

				let value = null;
				if (field.value) {
					const parts = field.value.split('/');
					if (parts.length === 3) {
						value = new DateObject({
							calendar: persian,
							locale: persian_fa,
							year: parseInt(parts[0], 10),
							month: parseInt(parts[1], 10),
							day: parseInt(parts[2], 10),
						});
					}
				}

				return (
					<Box>
						{label && (
							<Typography
								component="label"
								htmlFor={id}
								sx={{ fontFamily: 'IRANYekan', fontWeight: 'bold', fontSize: 15, color: '#1F1F1F' }}
							>
								{label}
							</Typography>
						)}
						<Box mt={1}>
							<DatePicker
								calendar={persian}
								locale={persian_fa}
								calendarPosition="bottom-right"
								value={value}
								style={{
									height: 40,
									borderRadius: 6,
									border: error ? '1px solid #ff4842' : '1px solid #e4e4e5',
									fontFamily: 'IRANYekan',
									fontSize: 15,
									padding: '0 12px',
								}}
								onChange={(dateObject) => {
									if (!dateObject) {
										field.onChange('');
										return;
									}
									const y = dateObject.year;
									const m = dateObject.month.toString().padStart(2, '0');
									const d = dateObject.day.toString().padStart(2, '0');
									field.onChange(`${y}/${m}/${d}`);
								}}
							/>
						</Box>
						{error && (
							<FormHelperText error sx={{ px: 1 }}>
								{error.message || 'پر کردن این فیلد اجباری است'}
							</FormHelperText>
						)}
					</Box>
				);
			}}
		/>
	);
}
