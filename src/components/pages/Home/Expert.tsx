import { Box, Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';

import COLORS from '@/theme/colors';

import * as S from '../styles';

const Index = () => {
	const [value, setValue] = React.useState('one');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	const CardPage = (
		<React.Fragment>
			<CardContent sx={{ padding: '8px 4px 0 4px' }}>
				<S.row>
					<S.cell>
						<img
							style={{ width: 76, height: 76, borderRadius: '50%', marginBottom: '10px' }}
							src="./images/image1.png"
						></img>
					</S.cell>
				</S.row>
				<Typography gutterBottom sx={{ color: COLORS.black1, fontSize: 9.38 }}>
					محمد مردانی
				</Typography>
				<Typography gutterBottom sx={{ color: COLORS.black1, fontSize: 9.38 }}>
					(سلامت و زیبایی)
				</Typography>
			</CardContent>
		</React.Fragment>
	);

	return (
		<>
			<Box sx={{ minWidth: 275 }}>
				<Card
					variant="outlined"
					sx={{
						borderColor: '#fff',
						width: 80,
						height: 130,
						direction: 'rtl',
						textAlign: 'center',
					}}
				>
					{CardPage}
				</Card>
			</Box>
		</>
	);
};

export default Index;
