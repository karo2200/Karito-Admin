import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const AddButton = styled(Button)<{ backgroundColor?: string; colorbtn?: string; widthbt?: number }>(
	({ backgroundColor, colorbtn, widthbt }) => ({
		borderRadius: '32px !important',
		color: colorbtn || '#000',
		fontSize: 15,
		height: 48,
		fontFamily: 'Vazir',
		backgroundColor: backgroundColor || '#fff',
		width: widthbt,
		':hover': {
			backgroundColor: backgroundColor || '#fff',
			boxShadow: '-2px -2px #fff',
		},
		boxShadow: '-2px -2px #fff',
	})
);
