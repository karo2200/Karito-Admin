import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Dialog, DialogTitle, Typography } from '@mui/material';
import React from 'react';

const COLORS = {
	black: '#000',
	primary: '#1D5BD2',
	secondary: '#4D88F9',
	buttonBg: '#1D5BD2',
	buttonHover: '#1451a8',
	cancelBg: '#e0e0e0',
	cancelHover: '#bdbdbd',
};

function MyModal({ open, handleClose, name, handleConfirm }) {
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
				},
			}}
		>
			<Box>
				<DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Yekan' }}>
					حذف اطلاعات
				</DialogTitle>
				<Typography
					fontFamily="Yekan"
					color={COLORS.black}
					fontSize="16px"
					textAlign="right"
					sx={{ marginTop: 2, marginRight: 2 }}
				>
					آیا از حذف <strong>{name}</strong> اطمینان دارید؟
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
						بله
					</LoadingButton>
					<LoadingButton
						variant="contained"
						onClick={handleClose}
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
						خیر
					</LoadingButton>
				</Box>
			</Box>
		</Dialog>
	);
}

export default MyModal;
