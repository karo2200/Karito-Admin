import { Grid } from '@mui/material';
import React from 'react';

import Order from './orderNumber';
import Price from './Price';
import Special from './speciallist';
const index = ({ StartDate, EndDate }) => {
	return (
		<>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Special StartDate={StartDate} EndDate={EndDate} />
				<Price StartDate={StartDate} EndDate={EndDate} />
				<Order StartDate={StartDate} EndDate={EndDate} />
			</Grid>
		</>
	);
};

export default index;
