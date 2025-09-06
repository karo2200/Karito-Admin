import { styled } from '@mui/material';
export const Main = styled('main')({
	display: 'grid',
	width: '100%',
	gridTemplateColumns: ' 1fr ',
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
});
export const MainContent = styled('div')({
	minHeight: 'calc(100vh - 81px - 24px)',
	maxWidth: 'calc(100vw )',
	scrollbarWidth: 'none' /* Firefox 64 */,
	'@media(max-width:600px)': {
		maxWidth: '100vw',
	},
	padding: 25,
	overflowY: 'auto',
	overflowX: 'hidden',
	'@media(min-width:1600px)': {
		maxWidth: '100vw ',
	},
	//  backgroundColor: COLORS.grey13,

	/*'@media(min-width:1400px)': {
		minWidth: 1070,
	},
	'@media(max-width:1310px)': {
		minWidth: 'calc(100vw - 280px)',
	},*/
});
export const Mainnav = styled('div')<{ isActiveMobileMenu: boolean }>(({ isActiveMobileMenu }) => ({
	height: '100%',
	backgroundColor: '#fff',
	borderRight: '1px solid #D9D8D8',
	visibility: isActiveMobileMenu ? 'initial' : 'visible',
	position: isActiveMobileMenu ? 'fixed' : 'inherit',
	right: isActiveMobileMenu ? 0 : '-100%',
	top: 0,
	zIndex: 5,
	width: 280,
}));
