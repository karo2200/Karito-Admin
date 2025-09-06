import { Box, styled, Typography } from '@mui/material';
export const AppBar = styled(Box)<{ backgroundColor?: string; color?: string }>(({ backgroundColor, color }) => ({
	width: '100%',
	height: 100,
	backgroundColor: backgroundColor,
	color: color,
	padding: 10,
	borderBottom: '1px solid #CDD7E3',
	'@media(max-width:600px)': {
		height: 'auto',
	},
}));
export const row = styled(Box)({
	display: 'flex',
});
export const rowbtn = styled(Box)({
	display: 'flex',
});
export const cell = styled(Box)({
	flex: 1,
});
export const cellbtn = styled(Box)({
	flex: 1,
	flexGrow: 0,
	flexShrink: 0,
	flexBasis: 530,
	'@media(max-width:600px)': {
		display: 'none',
	},
});
export const cellLable = styled(Box)({
	flex: 1,
	flexGrow: 0,
	flexShrink: 0,
	flexBasis: 95,
	'@media(max-width:610px)': {
		display: 'none',
	},
});
export const cellmenu = styled(Box)({
	flex: 1,
});
export const cellAvatar = styled(Box)({
	flex: 1,
	flexGrow: 0,
	flexShrink: 0,
	flexBasis: 70,
	'@media(max-width:600px)': {
		display: 'none',
	},
});
export const rowmenuMobil = styled(Box)({
	display: 'none',
	'@media(max-width:1200px)': {
		display: 'flex',
	},
});

export const imgLogo = styled('img')({
	width: 181,
	height: 105,
});

export const Ul = styled('ul')({
	display: 'flex',
	listStyleType: 'none',
	flexWrap: 'wrap',
	width: '480px',
	margin: '0 auto',
	'@media(max-width:600px)': {
		width: 'auto',
	},
});

export const Li = styled('li')({
	flex: '1',
	flexBasis: 60,
	flexGrow: 0,
	flexShrink: 0,
	textAlign: 'center',
	'@media(min-width:1500px)': {
		flexBasis: 60,
	},
});

export const textMenu = styled(Typography)({
	fontFamily: 'Amiri',
});
