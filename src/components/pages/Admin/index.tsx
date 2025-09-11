import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import COLORS from '@/theme/colors';

import Expert from './Dashbord/Expert';
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
							height: '400px',
							borderRadius: 2,
							marginBottom: 5,
							padding: 2,
							border: '1px solid #00000014',
							overflowY: 'scroll',
						}}
					>
						<Typography
							fontFamily="Vazir"
							color={COLORS.blue}
							fontSize="20px"
							fontWeight="bold"
							textAlign="center"
							sx={{ marginBottom: '5px' }}
						>
							لیست سفارشات
						</Typography>
						<Order />
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Box
						sx={{
							boxShadow: ' rgb(100 100 111 / 9%) 0px 7px 29px 0px',
							width: '100%',
							height: '400px',
							borderRadius: 2,
							marginBottom: 5,
							padding: 2,
							border: '1px solid #00000014',
							overflow: 'hidden',
						}}
					>
						<Typography
							fontFamily="Vazir"
							color={COLORS.blue}
							fontSize="20px"
							fontWeight="bold"
							textAlign="center"
							sx={{ marginBottom: '5px' }}
						>
							لیست متخصصین
						</Typography>
						<Expert />
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default index;
