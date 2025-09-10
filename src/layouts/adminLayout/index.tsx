import Box from '@mui/material/Box';
import React, { useState } from 'react';

import Admindrawer from './drawer';
import * as S from './styles';

const AdminLayout = ({ children }: React.PropsWithChildren) => {
	const [show, setShowState] = useState(false);

	return (
		<S.Main>
			<S.MainContent show={show}>
				<Box>{children}</Box>
			</S.MainContent>
			<Admindrawer toggleCollapse={(value) => setShowState(value)} />
		</S.Main>
	);
};

export default AdminLayout;
