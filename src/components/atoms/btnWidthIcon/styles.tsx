import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import COLORS from 'src/theme/colors';

export const AddButton = styled(Button)({
	borderRadius: 32,
	color: COLORS.white,
	fontSize: 16,
	height: 35,
	fontFamily: 'Poppins',
	backgroundColor: COLORS.black,
	minWidth: 196,
	':hover': {
		backgroundColor: COLORS.black,
	},
	marginLeft: '20px',
});

export const AddButtonIconWrapper = styled(Box)({
	width: 28,
	height: 28,
	borderRadius: 6,
	marginRight: 16,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const AddButtonIcon = styled(AddIcon)({
	color: COLORS.white,
});
