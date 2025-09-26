import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Grid, IconButton, Rating, Typography } from '@mui/material';
import { toJalaali } from 'jalaali-js';
import React from 'react';

const COLORS = {
	black: '#000',
	primary: '#1D5BD2',
	secondary: '#4D88F9',
	buttonBg: '#1D5BD2',
	buttonHover: '#1451a8',
	cancelBg: '#a81c1cff',
	cancelHover: '#d64242ff',
	textcolor: '#00143fd6',
};
function convertToJalali(dateString) {
	if (!dateString) return;
	const date = new Date(dateString);
	if (isNaN(date)) return;
	const jDate = toJalaali(date);
	return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
}
function MyModal({ open, handleClose, data }) {
	console.log(data);
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
			<Grid container spacing={2} sx={{ marginTop: '5px', borderBottom: '1px solid #DEE2E6' }}>
				<Grid item xs={12} sx={{ flexBasis: '90px !important', flexGrow: 0, flexShrink: 0 }}>
					<img src={data?.profileImageUrl} style={{ width: '80px', height: '80px', borderRadius: 5 }}></img>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Typography sx={{ color: COLORS.textcolor, marginBottom: '5px' }}>
						{data?.firstName + ' ' + data?.lastName}
					</Typography>
					<Rating name="half-rating-read" defaultValue={data?.averageRating} precision={0.5} readOnly dir="ltr" />
					<Typography sx={{ color: COLORS.textcolor, marginBottom: '5px' }}>
						{'تعداد رای دهندگان: ' + data?.rateCount}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Typography sx={{ color: COLORS.textcolor, marginBottom: '5px' }}>
						{' تاریخ تولد : ' + convertToJalali(data?.birthDate)}
					</Typography>
					<Typography sx={{ color: COLORS.textcolor, marginBottom: '5px' }}>
						{'کد ملی : ' + data?.nationalCode}
					</Typography>
					<Typography sx={{ color: COLORS.textcolor, marginBottom: '5px' }}>
						{' موبایل : ' + data?.phoneNumber}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Typography sx={{ color: COLORS.textcolor, marginBottom: '5px' }}>{' شهر: ' + data?.city?.name}</Typography>
					<Typography sx={{ color: COLORS.textcolor, marginBottom: '5px' }}>
						{'سرویس: ' + data?.serviceTypes?.map((data, i) => <div key={i}>{data?.name}</div>)}
					</Typography>
				</Grid>
			</Grid>
			<Grid container spacing={2} sx={{ marginTop: '5px' }}>
				<Grid item xs={12} sm={4}></Grid>
				<Grid item xs={12} sm={4}></Grid>
				<Grid item xs={12} sm={4}></Grid>
			</Grid>
		</Dialog>
	);
}

export default MyModal;
