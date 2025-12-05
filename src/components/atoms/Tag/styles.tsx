import { Box, styled, Typography } from '@mui/material';
import COLORS from 'src/theme/colors';
export const row = styled(Box)({
	display: 'flex',
});
export const cell = styled(Box)({
	flex: 1,
});
export const ContentTag = styled(Box)({
	backgroundColor: COLORS.grey9,
	height: 25,
	borderRadius: 20,
	padding: '5px',
	marginRight: 2,
	'@media(min-width:1500px)': {
		height: 35,
		padding: '10px',
	},
});

export const font3 = styled(Typography)({
	fontFamily: 'Vazir',
	fontStyle: 'normal',
	lineHeight: 'normal',
	color: COLORS.grey2,
	marginTop: 2,
	textAlign: 'center',
});
export const seeimg = styled('img')({});
