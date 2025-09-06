import { CircularProgress, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const Wrapper = styled('div')(({ theme }) => ({
	width: '100%',
	display: 'flex',
	height: '100vh',
	alignItems: 'center',
	flexDirection: 'column',
	justifyContent: 'center',
	backdropFilter: 'blur(5px)',
	WebkitBackdropFilter: 'blur(5px)', // Fix on Mobile
	backgroundColor: alpha(theme.palette.background.default, 0.7),
}));

export default function FullscreenLoading() {
	return (
		<Wrapper>
			<CircularProgress size={32} />
			<Typography variant="h6" mt={3}>
				Loading, please wait ...
			</Typography>
		</Wrapper>
	);
}
