import Box from '@mui/material/Box';
import React from 'react';

import COLORS from '@/theme/colors';

const UserInfo = () => {
	return (
		<Box
			sx={{
				width: '100%',
				height: '45px',
				backgroundColor: COLORS.blue,
				borderRadius: '10px',
				marginBottom: '10px',
			}}
		></Box>
	);
};

export default UserInfo;
