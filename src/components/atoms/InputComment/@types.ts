import { Box, TextField } from '@mui/material';
import { styled } from '@mui/system';

export const SearchInputPageWrapper = styled(TextField)<{
	screen?: boolean;
	isActiveback?: boolean;
	setting?: boolean;
}>(({ screen, isActiveback, setting }) => ({
	width: '100%',
}));
export const GridItem = styled(Box)<{
	isActiveback?: boolean;
	isAdmin?: boolean;
	isActive?: boolean;
}>(({ isActiveback, isAdmin, isActive }) => ({
	width: '94%',
	margin: '0 auto',
}));
export const CircleSerch = styled(Box)({
	width: '35px',
	height: '35px',
	borderRadius: '50%',
	boxShadow: '-3px -3px 15px 0px #E8E8E8, 4px 4px 18px 0px rgba(0, 0, 0, 0.25)',
	paddingTop: 5,
});
