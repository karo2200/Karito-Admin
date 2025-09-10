import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, Grid, IconButton } from '@mui/material';
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

function MyModal({ open, handleClose, data }) {
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
					maxWidth: 800,
					width: '100%',
					position: 'relative',
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
					right: 8, // for RTL, swap to left if needed
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon sx={{ color: COLORS.cancelHover }} />
			</IconButton>

			{/* ✅ Two images per row */}
			<Grid container spacing={2} justifyContent="rigth">
				{data?.map((item, index) => (
					<Grid item xs={12} sm={4} key={index}>
						<Box
							component="img"
							src={item}
							alt={`preview-${index}`}
							sx={{
								width: '100%',
								height: 300,
								borderRadius: 2,
								objectFit: 'cover', // use "contain" if you don’t want cropping
								boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
							}}
						/>
					</Grid>
				))}
			</Grid>
		</Dialog>
	);
}

export default MyModal;
