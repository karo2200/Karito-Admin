import { Box, Checkbox, CheckboxProps, FormControlLabel, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';

import COLORS from '@/theme/colors';

type RHFCheckboxType = CheckboxProps & {
	name: string;
	label?: string;
	id?: string;
	onChanged?: (value?: boolean) => void;
};

const CommonCheckbox = styled(Checkbox)({
	padding: '4px',
	'& .MuiSvgIcon-root': {
		fontSize: 25,
		border: '1px solid #DEE2E6',
	},
	'& .Mui-checked': {
		color: COLORS.Purple1,
	},
});

export default function RHFCheckbox({ name, label, id, onChanged, ...other }: RHFCheckboxType) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				if (typeof onChanged === 'function') onChanged(field?.value);

				return (
					<Box sx={{ textAlign: 'right' }}>
						{typeof label === 'string' && (
							<Typography
								component="label"
								htmlFor={id}
								color={COLORS.black}
								textAlign="right"
								sx={{ fontFamily: 'Vazir', fontSize: 13, fontWeight: 'bold' }}
							>
								{label}
							</Typography>
						)}

						<Box marginTop="4px">
							<FormControlLabel
								control={
									<CommonCheckbox
										{...field}
										id={id}
										checked={!!field.value}
										onChange={(e) => field.onChange(e.target.checked)}
										{...other}
									/>
								}
								label=""
								//sx={{ m: 0 }}
							/>
							{error && (
								<Typography color="error" variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>
									{error.message}
								</Typography>
							)}
						</Box>
					</Box>
				);
			}}
		/>
	);
}
