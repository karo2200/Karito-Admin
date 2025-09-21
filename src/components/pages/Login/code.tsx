import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, InputAdornment, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth_RequestOtpMutation } from 'src/graphql/generated';
import { setPageData } from 'src/redux/action';

import PersonIcon from '@/assets/person';
import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, TextField } from '@/components/atoms/Form';
import { useAuth } from '@/providers/AuthProvider';
import COLORS from '@/theme/colors';

import * as S from './styles';

const LoginSchema = Yup.object().shape({
	Code: Yup.string()?.required(' کد را وارد کنید'),
});

const Index = ({ Mobil, userType }: { Mobil: any }) => {
	const [showerror, setshowerror] = useState(false);
	const [loading, setloading] = useState(false);
	const { mutate: mutate, isLoading: isLoadinglogin } = useAuth_RequestOtpMutation();
	const dispatch = useDispatch();
	const pageData = useSelector(({ pageData }: any) => pageData);

	const [timer, setTimer] = useState(120); // 2 دقیقه = 120 ثانیه

	const router = useRouter();

	const defaultValues = {
		Code: '',
	};

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit } = methods;

	const { isLoading, signInWithEmail } = useAuth();

	const onSubmit = async (data: typeof defaultValues) => {
		signInWithEmail('+98' + Mobil, data.Code, userType);
	};

	// شمارش معکوس تایمر
	useEffect(() => {
		dispatch(setPageData({ ...pageData, UserType: userType }));

		if (timer <= 0) return;

		const interval = setInterval(() => {
			setTimer((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timer]);

	const minutes = Math.floor(timer / 60);
	const seconds = timer % 60;
	const SendCode = async () => {
		await mutate(
			{
				input: {
					phoneNumber: '+98' + Mobil,
					userType: userType,
				},
			},
			{
				onSuccess: async (res) => {
					setTimer(120); // ریست تایمر به 2 دقیقه
				},
				onError: (err) => {
					setshowerror(true);
				},
			}
		);
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
							<img src="/icons/logo.jpg" alt="business" draggable="false" width={150} />

							<Typography
								fontFamily="Vazir"
								color={COLORS.blue}
								fontSize="24px"
								fontWeight="bold"
								textAlign="center"
								sx={{ marginTop: '10px' }}
							>
								کاریتو
							</Typography>
							<Typography
								fontFamily="Vazir"
								color={COLORS.black}
								fontSize="20px"
								fontWeight="bold"
								textAlign="center"
								sx={{ marginTop: '10px' }}
							>
								ورود به پنل مدیریت
							</Typography>

							{showerror && (
								<Box
									marginTop="15px"
									display="flex"
									padding="10px"
									sx={{ height: 46, width: '100%', borderRadius: '8px !important', backgroundColor: '#D9D9D9' }}
								>
									<S.cell>
										<Typography
											fontWeight={400}
											color={COLORS.red}
											fontSize="17px"
											textAlign="right"
											fontFamily="Vazir"
										>
											اطلاعات صحیح نیست
										</Typography>
									</S.cell>
									<S.cell sx={{ flexBasis: '40px', flexGrow: 0, flexShrink: 0, textAlign: 'center', marginTop: '1px' }}>
										<S.RemoveIcon />
									</S.cell>
								</Box>
							)}
						</Box>

						<Box>
							<TextField
								required
								name="Code"
								placeholder=" کد ارسال شده"
								sx={{ mb: 3 }}
								id="Code"
								label=" کد ارسال شده"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<PersonIcon />
										</InputAdornment>
									),
									style: {
										backgroundColor: '#f8f8f8',
										textAlign: 'right',
									},
								}}
							/>
						</Box>

						{/* تایمر نمایش */}
						<Typography
							fontFamily="Vazir"
							color={COLORS.black}
							fontSize="16px"
							fontWeight="bold"
							textAlign="center"
							sx={{ marginBottom: '10px' }}
						>
							{timer > 0
								? `ارسال مجدد کد در ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
								: 'می‌توانید کد را دوباره ارسال کنید'}
						</Typography>

						{/* دکمه ورود */}
						<LoadingButton
							variant="contained"
							onClick={handleSubmit(onSubmit)}
							loading={loading}
							fullWidth
							sx={{
								fontSize: '15px',
								background: '#88b2e1',
								color: '#fff',
								borderRadius: '8px !important',
							}}
						>
							ورود
						</LoadingButton>

						{/* دکمه ارسال مجدد کد (غیرفعال تا وقتی تایمر تمام بشه) */}
						<LoadingButton
							variant="contained"
							onClick={() => {
								if (timer === 0) {
									//getIscode();
									SendCode();
								}
							}}
							disabled={timer > 0}
							fullWidth
							sx={{
								fontSize: '15px',
								background: timer > 0 ? '#ccc' : '#b8bcc0',
								color: '#fff',
								borderRadius: '8px !important',
								marginTop: '5px',
							}}
						>
							{timer > 0
								? `ارسال مجدد غیرفعال (${minutes}:${seconds < 10 ? `0${seconds}` : seconds})`
								: 'ارسال مجدد کد'}
						</LoadingButton>
					</CardContent>
				</Card>
			</S.Content>
		</FormProvider>
	);
};

export default Index;
