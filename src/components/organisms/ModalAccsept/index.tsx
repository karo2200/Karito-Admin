import CloseIcon from '@mui/icons-material/Close'; // ✅ Import Close icon
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import React from 'react';

const COLORS = {
	black: '#000',
	primary: '#1D5BD2',
	secondary: '#4D88F9',
	buttonBg: '#1D5BD2',
	buttonHover: '#1451a8',
	cancelBg: '#a81c1cff',
	cancelHover: '#d64242ff',
};

function MyModal({ open, handleClose, name, handleConfirm, handleReject }) {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
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
				onClick={handleClose}
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
				<DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px', fontFamily: 'Yekan' }}>
					پذیرفتن اطلاعات / رد شدن اطلاعات
				</DialogTitle>
				<DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px', fontFamily: 'Yekan' }}>
					{name}
				</DialogTitle>
				<Typography
					fontFamily="Yekan"
					color={COLORS.black}
					fontSize="16px"
					textAlign="right"
					sx={{ marginTop: 2, marginRight: 2 }}
				>
					آیا اطمینان دارید؟
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
					<LoadingButton
						variant="contained"
						onClick={handleConfirm}
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
						پذیرفتن
					</LoadingButton>
					<LoadingButton
						variant="contained"
						onClick={handleReject}
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
						رد کردن
					</LoadingButton>
				</Box>
			</Box>
		</Dialog>
	);
}

export default MyModal;
