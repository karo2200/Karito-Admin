import { Box, styled, Typography } from '@mui/material';
import COLORS from 'src/theme/colors';

export const row = styled(Box)({
	display: 'flex',
});
export const cell = styled(Box)({
	flex: 1,
});

export const BoxReport = styled(Box)({
	borderRadius: 32,
	boxShadow: '-2px -2px 2px 0px #FFF, 2px 1px 2px 0px #ABABAB',
	height: 50,
	margin: '0px auto',
	width: '90%',
	padding: 17,
	backgroundColor: '#E8E8E8',
	'@media(min-width:1500px)': {
		height: 62,
		padding: 22,
	},
});
export const font = styled(Typography)({
	color: COLORS.black,
	fontFamily: 'Vazir',
	fontStyle: 'normal',
	fontWeight: 700,
	lineHeight: 'normal',
	textAlign: 'center',
	cursor: 'pointer',
});
