import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useStats_GetActiveSpecialistsQuery } from 'src/graphql/generated';

import COLORS from '@/theme/colors';

const index = ({ StartDate, EndDate }) => {
	const [load, setLoad] = useState(1);

	const { data, isSuccess, isError } = useStats_GetActiveSpecialistsQuery(
		{
			input: {
				endDate: EndDate + 'T00:00:00+03:30',
				startDate: StartDate + 'T00:00:00+03:30',
			},
		},
		{
			keepPreviousData: true,
		}
	);

	return (
		<>
			<Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
				<Box
					sx={{
						backgroundColor: COLORS.blue4,
						borderRadius: '9px',
						height: '90px',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						px: 2,
						direction: 'rtl',
					}}
				>
					{' '}
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<Typography sx={{ color: COLORS.white, fontSize: '13px' }}>
							{data?.stats_getActiveSpecialists?.result + ' متخصص فعال '}
						</Typography>
					</Box>
					<img src="/images/expert.png" alt="expert" style={{ height: '50px' }} />
				</Box>
			</Grid>
		</>
	);
};

export default index;
