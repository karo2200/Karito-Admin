import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import * as React from 'react';

import COLORS from '@/theme/colors';

import BoxCard from './Box';
import EmptyPage from './Empty';
const Index = () => {
	const [value, setValue] = React.useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	return (
		<>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider', direction: 'rtl' }}>
					<TabList onChange={handleChange}>
						<Tab
							value="1"
							label="سفارش های جاری"
							sx={{
								color: COLORS.black + '!important',
								'&.Mui-selected': {
									color: COLORS.Purple + '!important',
								},
							}}
						/>
						<Tab
							value="2"
							label="سفارش های گذشته"
							sx={{
								color: COLORS.black + '!important',
								'&.Mui-selected': {
									color: COLORS.Purple + '!important',
								},
							}}
						/>
						<Tab
							value="3"
							label="سفارش های لغو شده"
							sx={{
								color: COLORS.black + '!important',
								'&.Mui-selected': {
									color: COLORS.Purple + '!important',
								},
							}}
						/>
					</TabList>
				</Box>
				<TabPanel value="1" sx={{ direction: 'rtl' }}>
					<BoxCard />
				</TabPanel>
				<TabPanel value="2" sx={{ direction: 'rtl' }}>
					<EmptyPage />
				</TabPanel>
				<TabPanel value="3" sx={{ direction: 'rtl' }}>
					Item Three
				</TabPanel>
			</TabContext>
		</>
	);
};

export default Index;
