import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import * as React from 'react';

import COLORS from '@/theme/colors';

import IconUser from '../../../assets/user';
import * as S from '../styles';

const Index = () => {
	const [value, setValue] = React.useState('one');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	const CardPage = (
		<React.Fragment>
			<CardContent sx={{ paddingBottom: 0 }}>
				<Typography gutterBottom sx={{ color: COLORS.black1, fontSize: 14, fontWeight: 'bold' }}>
					سرمایش و گرمایش (تعمیر و سرویس کولر آبی){' '}
				</Typography>
				<Card
					variant="outlined"
					sx={{
						padding: '9px',
						marginTop: 2,
						marginBottom: 2,
						borderRadius: '8px',
						width: 300,
						height: 40,
						gap: 8,
						backgroundColor: COLORS.Purple1,
					}}
				>
					<Typography component="div" color={COLORS.Purple} fontSize={12}>
						1404/03/15 چهارشنبه ساعت 17:00
					</Typography>
				</Card>
				<S.row>
					<S.cell sx={{ flexBasis: '20px', flexGrow: 0, flexShrink: 0 }}>
						<IconUser />
					</S.cell>
					<S.cell>
						<Typography color={COLORS.black} fontSize={12}>
							موسی مرادیان
						</Typography>
					</S.cell>
					<S.cell>
						<Typography component="div" color={COLORS.Purple} fontSize={14} fontWeight={700} sx={{ textAlign: 'end' }}>
							1,200,000 تومان
						</Typography>
					</S.cell>
				</S.row>
			</CardContent>
			<CardActions>
				<Button
					variant="outlined"
					sx={{
						backgroundColor: COLORS.Purple,
						borderRadius: 2,
						height: 40,
						width: 80,
						marginRight: 2,
						'&:hover': {
							color: COLORS.Purple,
						},
					}}
				>
					جزئیات
				</Button>
			</CardActions>
		</React.Fragment>
	);

	return (
		<>
			<Box sx={{ minWidth: 275 }}>
				<Card variant="outlined" sx={{ borderRadius: '12px', width: 360, height: 200 }}>
					{CardPage}
				</Card>
			</Box>
		</>
	);
};

export default Index;
