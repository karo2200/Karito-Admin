import { styled } from '@mui/material';
export const Main = styled('main')<{ show: boolean }>(({ show }) => ({
	display: 'grid',
	width: '100%',
	gridTemplateColumns: show ? '1fr 70px' : '1fr 270px',
	// columnGap: 16,
	minHeight: '100%',
	margin: '0 auto',
	overflowX: 'hidden',
	//paddingBottom: 24,
	'@media(max-width:600px)': {
		//display: 'flow-root',
		gridTemplateColumns: '1fr',
	},
	/*[mediaScreen('md')]: {
		display: 'flow-root',
		gridTemplateColumns: '1fr',
	},*/
}));
export const MainContent = styled('div', {
	shouldForwardProp: (prop) => prop !== 'show',
})<{ show: boolean }>(({ show }) => ({
	minHeight: 'calc(100vh - 81px - 24px)',
	maxWidth: show ? 'calc(100vw - 70px)' : 'calc(100vw - 270px)',
	scrollbarWidth: 'none',
	overflowY: 'auto',
	overflowX: 'hidden',
	padding: 30,
	'@media(max-width:600px)': {
		maxWidth: '100vw',
	},
}));
export const Mainnav = styled('div')<{ isActiveMobileMenu: boolean }>(({ isActiveMobileMenu }) => ({
	backgroundColor: '#fff',
	borderRight: '1px solid #D9D8D8',
	boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
	visibility: isActiveMobileMenu ? 'initial' : 'hidden',
	position: isActiveMobileMenu ? 'fixed' : 'inherit',
	right: isActiveMobileMenu ? 0 : '-100%',
	top: 0,
	zIndex: 5,
	borderRadius: 0,
	height: '100%',
	transition: 'width 0.3s ease, right 0.3s ease',

	width: 200, // default width, overridden by inline sx for collapsed state
	overflowX: 'hidden',
}));
