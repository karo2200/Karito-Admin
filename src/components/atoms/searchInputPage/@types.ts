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
	boxShadow: '-2px -2px 2px 0px #FFF, 2px 1px 2px 0px #ABABAB',
	paddingTop: 5,
});
