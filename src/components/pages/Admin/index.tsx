import { Typography } from '@mui/material';
import React from 'react';

import COLORS from '@/theme/colors';

const index = () => {
	return (
		<>
			<Typography fontSize={36} color={COLORS.blue} sx={{ margin: '-10px 20px 0 0', textAlign: 'right' }}>
				کاریتو
			</Typography>
		</>
	);
};

export default index;
