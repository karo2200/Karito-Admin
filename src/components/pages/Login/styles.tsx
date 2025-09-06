import CancelIcon from '@mui/icons-material/Cancel';
import { Box, styled } from '@mui/material';

import COLORS from '@/theme/colors';
export const RemoveIcon = styled(CancelIcon)({
	color: COLORS.red,
});

export const Content = styled(Box)({
	width: 375,
	maxWidth: '100%',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: COLORS.white2,
	'@media(max-width:600px)': {
		width: '90%',
	},
});

export const Footer = styled(Box)({
	flex: 1,
	paddingRight: '27px',
	'@media(max-width:600px)': {
		paddingRight: 16,
	},
});
export const rowpage = styled(Box)({
	display: 'flex',
	width: '100%',
	padding: '0 0 0 0px',
	flexDirection: 'row',
	margin: '0 auto',
	textAlign: 'right',
	justifyContent: 'flex-end', // aligns both elements to the right edge
	marginTop: '7px',
});

export const cellpagetext = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	marginRight: '10px', // space between texts
});

export const cellpage = styled(Box)({
	display: 'flex',
	alignItems: 'center',
});

export const cell = styled(Box)({
	flex: 1,
});
export const Authsingup = styled(Box)({
	fontSize: 16,
	fontFamily: 'Yekan',
	cursor: 'pointer',
	color: COLORS.black1,
	marginLeft: 10,
});

export const Authsingupabi = styled(Box)({
	fontSize: 16,
	fontFamily: 'Yekan',
	cursor: 'pointer',
	color: COLORS.blue,
});
