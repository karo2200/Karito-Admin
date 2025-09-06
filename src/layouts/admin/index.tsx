import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';

import AdminAppBar from './appBar';
import * as S from './styles';

const drawerWidth = 240;

const AdminLayout = ({ children }: React.PropsWithChildren) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [state, setState] = useState({
		mobileView: false,
		drawerOpen: true,
	});
	const { mobileView, drawerOpen } = state;

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	useEffect(() => {
		const setResponsiveness = () => {
			return window.innerWidth < 600
				? setState((prevState) => ({ ...prevState, mobileView: true }))
				: setState((prevState) => ({ ...prevState, mobileView: false }));
		};

		setResponsiveness();

		window.addEventListener('resize', () => setResponsiveness());

		return () => {
			window.removeEventListener('resize', () => setResponsiveness());
		};
	}, []);
	const container = typeof window !== 'undefined' ? () => window?.document?.body : undefined;

	return (
		<>
			<AdminAppBar mobileView={mobileView} />
			<S.Main>
				<S.MainContent>
					<Box>{children}</Box>
				</S.MainContent>
			</S.Main>
		</>
	);
};

export default AdminLayout;
