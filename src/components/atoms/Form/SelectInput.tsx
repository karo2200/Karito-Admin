import { FormHelperText, InputLabel, MenuItem, Select as MSelect } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';

const SelectInput = styled(MSelect)<{ light?: boolean; height?: number }>(({ theme, light = false, height = 0 }) => ({
	height: 40,
	border: 'none',
	fontFamily: 'Vazir',
	fontSize: 15,
	borderRadius: 4,
	color: theme.palette.text.primary,
	fontWeight: 'bold',
	direction: 'ltr',
	textAlign: 'end',
	'.MuiSvgIcon-root ': {
		fontSize: '25px',
		left: 0,
	},
	'.MuiOutlinedInput-notchedOutline': {
		borderColor: `#dee2e6`,
	},
}));

type RHFSelectInputType = SelectInputProps &
	React.PropsWithChildren & {
		name: string;
		label?: string;
		light?: boolean;
		height?: number;
		options?: any;
		onChanged?: (e: any) => void;
	};

export default function RHFSelectInput({ name, label, options, onChanged, ...other }: RHFSelectInputType) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<>
					<InputLabel
						sx={{
							lineHeight: '2rem',
							'&.MuiInputLabel-shrink': {
								fontSize: '19px',
							},
							fontFamily: 'Vazir',
							fontSize: 14,
							fontWeight: 'bold',
							color: '#000',
							marginTop: 0,
						}}
					>
						{label}
					</InputLabel>
					<SelectInput
						fullWidth
						// variant="filled"
						{...field}
						error={!!error}
						onChange={(e) => {
							field.onChange(e.target.value);
							onChanged && onChanged(e);
						}}
						labelId={name}
						id={name}
						name={name}
						{...other}
					>
						{options?.map((o: any, i: any) => (
							<MenuItem
								style={{ color: '#000', fontFamily: 'Vazir', fontSize: 15 }}
								disabled={o.disabled}
								key={`${i}-${o.option}`}
								value={o.value}
							>
								{o.option}
							</MenuItem>
						))}
					</SelectInput>

					{!!error && (
						<FormHelperText error sx={{ px: 2 }}>
							{error.message}
						</FormHelperText>
					)}
				</>
			)}
		/>
	);
}
