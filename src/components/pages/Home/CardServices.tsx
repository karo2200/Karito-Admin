import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
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
							style={{ width: 186, height: 186, borderRadius: 8, marginBottom: '10px' }}
							src="./images/image1.png"
						></img>
					</S.cell>
				</S.row>
				<Typography gutterBottom sx={{ color: COLORS.black1, fontSize: 16 }}>
					اثاث کشی با کامیون
				</Typography>
			</CardContent>
			<CardActions sx={{ padding: '10px 3px' }}>
				<Button
					variant="outlined"
					sx={{
						backgroundColor: COLORS.Purple,
						borderRadius: 2,
						height: 40,
						width: 186,
						'&:hover': {
							color: COLORS.Purple,
						},
					}}
				>
					سفارش
				</Button>
			</CardActions>
		</React.Fragment>
	);

	return (
		<>
			<Box sx={{ minWidth: 275 }}>
				<Card
					variant="outlined"
					sx={{
						borderColor: '#f6f6f6',
						borderRadius: '8px',
						width: 194,
						height: 300,
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
