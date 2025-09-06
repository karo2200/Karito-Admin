import Box from '@mui/material/Box';
import React, { useState } from 'react';

import Admindrawer from './drawer';
import * as S from './styles';

const drawerWidth = 240;

const AdminLayout = ({ children }: React.PropsWithChildren) => {
	const { Show, ShowState } = useState(false);

	return (
		<S.Main>
			<S.MainContent show={Show}>
				<Box>{children}</Box>
			</S.MainContent>
			<Admindrawer toggleCollapse={(show) => ShowState(show)} />
		</S.Main>
	);
};

export default AdminLayout;
