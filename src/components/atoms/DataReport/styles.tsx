import { Box, styled, Typography } from '@mui/material';
import COLORS from 'src/theme/colors';

export const row = styled(Box)({
	display: 'flex',
});
export const cell = styled(Box)({
	flex: 1,
});
export const cellborder = styled(Box)({
	flex: 1,
	'@media(min-width:1500px)': {
		borderRight: '3px solid #8A8A8A',
		paddingLeft: 20,
	},
});
export const cellend = styled(Box)({
	flex: 1,
	'@media(min-width:1500px)': {
		paddingLeft: 20,
	},
});
export const BoxReport = styled(Box)({
	borderRadius: 32,
	boxShadow: '-2px -2px 2px 0px #FFF, 2px 1px 2px 0px #ABABAB',
	height: 62,
	margin: '20px auto',
	width: '94%',
	padding: 15,
});
export const font16 = styled(Typography)({
	color: COLORS.black,
	fontFamily: 'Amiri',
	fontSize: '16px',
	fontStyle: 'normal',
	fontWeight: 700,
	lineHeight: 'normal',
});
export const font12 = styled(Typography)({
	color: COLORS.grey6,
	fontFamily: 'Amiri',
	fontSize: '12px',
	fontStyle: 'normal',
	fontWeight: 400,
	lineHeight: 'normal',
});
