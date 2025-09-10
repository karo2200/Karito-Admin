import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQueryAxios } from 'src/components/pages/Query';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, TextField } from '@/components/atoms/Form';
import { useAuth } from '@/providers/AuthProvider';
import COLORS from '@/theme/colors';

import * as S from './styles';
const LoginSchema = Yup.object().shape({
	name: Yup.string()?.required('نام کاربری را وارد کنید'),
	password: Yup.string()?.required('رمز عبور را وارد کنید'),
});
const Index = ({ getcode }: { getcode: any }) => {
	const [showPassword, setshowPassword] = useState(false);
	const [loading, setloading] = useState(false);
	const { Signin } = useQueryAxios();
	const defaultValues = {
		Mobil: '',
	};

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit } = methods;

	const { isLoading, signInWithEmail } = useAuth();

	const onSubmit = async (data: typeof defaultValues) => {
		return;
	};

	return (
		<FormProvider methods={methods}>
			<S.Content>
				<Card
					sx={{
						boxShadow: '0px 12px 24px #00000014',
						backgroundColor: COLORS.white2,
					}}
				>
					<CardContent>
						<Box marginBottom="30px" display="flex" flexDirection="column" alignItems="center">
							<Typography
								fontFamily="Vazir"
								color={COLORS.blue}
								fontSize="12px"
								textAlign="center"
								sx={{ marginTop: '10px' }}
							>
								کاریتو
							</Typography>
							<Typography
								fontFamily="Vazir"
								color={COLORS.black}
								fontSize="14px"
								textAlign="center"
								sx={{ marginTop: '10px' }}
							>
								فراموشی رمز عبور
							</Typography>
							<Box
								marginTop="15px"
								display="flex"
								padding="10px"
								sx={{ height: 46, width: '100%', borderRadius: '8px !important', backgroundColor: '#D9D9D9' }}
							>
								<S.cell>
									<Typography fontWeight={400} color={COLORS.red} fontSize="17px" textAlign="right" fontFamily="Vazir">
										.نام کاربری یا رمز عبور صحیح نیست
									</Typography>
								</S.cell>
								<S.cell sx={{ flexBasis: '40px', flexGrow: 0, flexShrink: 0, textAlign: 'center', marginTop: '1px' }}>
									<S.RemoveIcon />
								</S.cell>
							</Box>
						</Box>
						<Box>
							<TextField
								required
								name="Mobil"
								placeholder="09120000000"
								sx={{ mb: 3 }}
								id="Mobil"
								label="لطفا شماره موبایل خودتان را وارد کنید"
							/>
						</Box>

						<LoadingButton
							variant="contained"
							onClick={handleSubmit(onSubmit)}
							loading={loading}
							fullWidth
							sx={{
								fontSize: '15px',
								//backgroundImage: 'linear-gradient(to right,#1D5BD2, #4D88F9)',
								background: '#88b2e1',
								color: '#fff',
								borderRadius: '8px !important',
							}}
						>
							بازیابی رمز عبور
						</LoadingButton>
					</CardContent>
				</Card>
			</S.Content>
		</FormProvider>
	);
};

export default Index;
