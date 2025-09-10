import AdUnitsRoundedIcon from '@mui/icons-material/AdUnitsRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { Box, styled } from '@mui/material';

import COLORS from '@/theme/colors';
export const AdIcon = styled(AdUnitsRoundedIcon)({
	color: COLORS.red,
});
export const ViewCarousel = styled(ViewCarouselIcon)({
	color: COLORS.blue2,
});
export const EditIcons = styled(EditIcon)({
	color: COLORS.Yellow,
});
export const DeleteIcons = styled(DeleteIcon)({
	color: COLORS.red,
});
export const row = styled(Box)({
	display: 'flex',
	flexWrap: 'wrap',
});
export const rowwrap = styled(Box)({
	display: 'flex',
	flexWrap: 'wrap',
});
export const cell = styled(Box)({
	flex: 1,
});
export const cell30 = styled(Box)({
	flex: 1,
	flexBasis: '40%',
	flexGrow: 0,
	'@media(max-width:900px)': {
		flexBasis: '100%',
		flexGrow: 0,
		flexShrink: 0,
	},
});
export const BoxDataNumber = styled(Box)<{ backgroundColor?: string }>(({ backgroundColor }) => ({
	width: 220,
	height: 121,
	backgroundColor: backgroundColor,
	borderRadius: 15,
	marginBottom: 10,
	textAlign: 'right',
	color: '#fff',
	'@media(max-width:600px)': {
		margin: '10px auto',
	},
}));
export const Radio = styled(Box)({
	width: 17,
	height: 17,
	borderRadius: '50%',
	border: '1px solid #fff',
	marginTop: 12,
});
export const FilterDashbord = styled(Box)({
	width: 370,
	height: 55,
	borderRadius: 10,
	margin: '12px auto',
	display: 'flex',
	boxShadow: '-3px -3px 15px 0px #E8E8E8, 4px 4px 18px 0px rgba(0, 0, 0, 0.25)',
	padding: 7,
});
export const Filterbtn = styled(Box)<{ isActive?: boolean }>(({ isActive }) => ({
	width: 150,
	height: 40,
	borderRadius: 8,
	padding: 10,
	textAlign: 'center',
	cursor: 'pointer',
	backgroundColor: isActive ? '#f4f7fc' : '#fff',
	'&:hover': {
		backgroundColor: '#f4f7fc',
	},
}));
export const textBox = styled('input')({
	width: '100%',
	maxWidth: '400px',
	padding: '10px 15px',
	fontSize: '16px',
	borderRadius: '6px',
	border: '1px solid #ccc',
	boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
	transition: 'border-color 0.3s ease',
});
