import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import { GuestGuard } from '@/guards';
import COLORS from '@/theme/colors';

import Code from './code';
import Signin from './signin';
import * as S from './styles';

const Container = styled('div')({
	display: 'flex',
	height: '100vh',
	alignItems: 'center',
	flexDirection: 'column',
	justifyContent: 'center',
	backgroundSize: 'cover',
	backgroundColor: COLORS.white1,
});

const LoginPage = () => {
	const [isCode, setisCode] = useState(false);
	const [Mobil, setMobil] = useState('');
	return (
		<GuestGuard>
			<Container>
				{!isCode ? (
					<Signin
						getcode={(Mobil) => {
							setisCode(true);
							setMobil(Mobil);
						}}
					/>
				) : (
					<Code
						Mobil={Mobil}
						getIscode={() => {
							setisCode(false);
						}}
					/>
				)}
				<Box sx={{ display: 'flex', width: '100%' }}>
					<S.Footer>
						<Typography color="#fff" fontSize="12px" textAlign="right"></Typography>
					</S.Footer>
				</Box>
			</Container>
		</GuestGuard>
	);
};

export default LoginPage;
