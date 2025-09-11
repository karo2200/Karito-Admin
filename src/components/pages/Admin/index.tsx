import { Box, Grid } from '@mui/material';
import React from 'react';

import Order from './Dashbord/order';
const index = () => {
	return (
		<>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={6}>
					<Box
						sx={{
							boxShadow: ' rgb(100 100 111 / 9%) 0px 7px 29px 0px',
							width: '100%',
							minHeight: '90px',
							borderRadius: 2,
							marginBottom: 5,
							padding: 2,
							border: '1px solid #00000014',
						}}
					>
						<Order />
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Box
						sx={{
							boxShadow: ' rgb(100 100 111 / 9%) 0px 7px 29px 0px',
							width: '100%',
							minHeight: '90px',
							borderRadius: 2,
							marginBottom: 5,
							padding: 2,
							border: '1px solid #00000014',
						}}
					>
						<Order />
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default index;
