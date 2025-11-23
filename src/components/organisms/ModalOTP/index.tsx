import CloseIcon from '@mui/icons-material/Close'; // ✅ Import Close icon
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Dialog, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useAuth_AdminRequestOtpForUserMutation } from 'src/graphql/generated';

const COLORS = {
	black: '#000',
	primary: '#1D5BD2',
	secondary: '#4D88F9',
	buttonBg: '#1D5BD2',
	buttonHover: '#1451a8',
	cancelBg: '#a81c1cff',
	cancelHover: '#d64242ff',
};

function MyModal({ open, handleClose, name, Mobil, TypeUser }) {
	const { mutate: mutateCity, isLoading } = useAuth_AdminRequestOtpForUserMutation();
	const [Result, setResult] = useState('');
	const onSubmit = () => {
		mutateCity(
			{
				input: {
					phoneNumber: Mobil,
					targetUserType: TypeUser,
				},
			},
			{
				onSuccess: async (res) => {
					setResult(res?.auth_adminRequestOtpForUser?.result);
				},
				onError: (err) => {},
			}
		);
	};
	return (
		<Dialog
			open={open}
			onClose={() => {
				setResult('');
				handleClose();
			}}
			dir="rtl"
			PaperProps={{
				sx: {
					borderRadius: 3,
					boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
					padding: 3,
					width: 320,
					position: 'relative', // Needed for absolute close button
				},
			}}
		>
			{/* ✅ Close Icon */}
			<IconButton
				aria-label="close"
				onClick={() => {
					setResult('');
					handleClose();
				}}
				sx={{
					position: 'absolute',
					top: 8,
					right: 8, // Adjust for RTL: use `left` instead of `right`
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon sx={{ color: COLORS.cancelHover }} />
			</IconButton>

			<Box>
				<DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px', fontFamily: 'Vazir' }}>
					OTP (<strong>{name}</strong>)
				</DialogTitle>
				<DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px', fontFamily: 'Vazir' }}>
					{Result}
				</DialogTitle>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
					<LoadingButton
						variant="contained"
						onClick={() => onSubmit()}
						loading={isLoading}
						fullWidth
						sx={{
							fontSize: '15px',
							backgroundColor: COLORS.primary,
							color: '#fff',
							borderRadius: 2,
							marginRight: 1,
							paddingY: 1.5,
							transition: 'background-color 0.3s ease',
							'&:hover': {
								backgroundColor: COLORS.buttonHover,
							},
						}}
					>
						دریافت کد
					</LoadingButton>
					<LoadingButton
						variant="contained"
						onClick={() => {
							setResult('');
							handleClose();
						}}
						fullWidth
						sx={{
							fontSize: '15px',
							backgroundColor: COLORS.cancelBg,
							color: '#000',
							borderRadius: 2,
							marginLeft: 1,
							marginRight: '5px',
							paddingY: 1.5,
							transition: 'background-color 0.3s ease',
							'&:hover': {
								backgroundColor: COLORS.cancelHover,
							},
						}}
					>
						بستن
					</LoadingButton>
				</Box>
			</Box>
		</Dialog>
	);
}

export default MyModal;
