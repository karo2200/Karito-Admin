import { Box, TextField, TextFieldProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';

import COLORS from '@/theme/colors';
type RHFTextFieldType = TextFieldProps & {
	name: string;
	label?: string;
	id?: string;
	onChanged?: (e?: any) => void;
};
const CommonTextField = styled(TextField)({
	fontFamily: 'Vazir',
	fontSize: 15,
	'& .MuiOutlinedInput-root': {
		borderRadius: '2px', // Custom border-radius
		'& input': {
			padding: '0 14px', // Control vertical padding here
			height: '100%', // Make sure input fills container
			boxSizing: 'border-box',
			textAlign: 'right',
			fontFamily: 'vazir',
			fontSize: 13,
			height: '40px !important', // Total height of the input container
		},
	},
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: '#DEE2E6 !important', // change border color if needed
		borderRadius: '5px', // redundant but safe
	},
});
export default function RHFTextField({ name, label, id, onChanged, ...other }: RHFTextFieldType) {
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
								style={{ fontFamily: 'Vazir', fontSize: 14, fontWeight: 'bold' }}
							>
								{label}
							</Typography>
						)}

						<Box marginTop="2px">
							<CommonTextField
								inputProps={{
									sx: {
										height: '40px',
										fontFamily: 'Vazir',
										fontSize: 15,
										fontWeight: 'bold',
										'&:hover': {
											borderColor: '#DEE2E6' + ' !important',
										},
										helperText: {
											'& .MuiFormHelperText-root': {
												textAlign: 'right',
											},
										},
									},
								}}
								//sx={{ '& .MuiOutlinedInput-root.Mui-disabled': { '& > fieldset': { border: '1px solid green' } } }}
								{...field}
								fullWidth
								id={id}
								error={!!error}
								helperText={error?.message}
								{...other}
							/>
						</Box>
					</Box>
				);
			}}
		/>
	);
}
