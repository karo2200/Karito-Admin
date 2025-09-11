import CloseIcon from '@mui/icons-material/Close'; // ✅ Import Close icon
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Dialog, DialogTitle, Grid, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useBanner_GetAllQuery, useCity_SetActiveBannerMutation } from 'src/graphql/generated';

import { FormProvider, SelectField, useForm } from '@/components/atoms/Form';

const COLORS = {
	black: '#000',
	primary: '#1D5BD2',
	secondary: '#4D88F9',
	buttonBg: '#1D5BD2',
	buttonHover: '#1451a8',
	cancelBg: '#a81c1cff',
	cancelHover: '#d64242ff',
};

function MyModal({ open, handleClose, name, handleReject, cityId }) {
	const [list, setList] = useState([]);
	const [Baner, setBaner] = useState('');

	const { mutate: mutateCity, isLoading: isLoading } = useCity_SetActiveBannerMutation();
	const { data, isSuccess, isError } = useBanner_GetAllQuery(
		{
			skip: 0,
			take: 1000,
		},
		{
			keepPreviousData: true,
		}
	);

	useEffect(() => {
		if (isSuccess) {
			const newList = [
				{ option: 'انتخاب کنید...', value: '' }, // <-- added placeholder item
				...(data?.banner_getAll?.result?.items?.map(({ title, id }) => ({
					option: title,
					value: id,
				})) || []),
			];

			setList(newList);
		}
	}, [isSuccess, data]);

	const defaultValues = {
		BanerId: '',
	};

	const methods = useForm({
		defaultValues,
	});
	const { handleSubmit, reset, setValue } = methods;

	const onSubmit = async (data: typeof defaultValues) => {
		mutateCity(
			{
				input: {
					cityId: cityId,
					bannerId: data?.BanerId,
				},
			},
			{}
		);
		handleClose();
	};
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
				<DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px', fontFamily: 'Vazir' }}>
					انتخاب بنر برای شهر <strong>{name}</strong>
				</DialogTitle>

				<FormProvider methods={methods}>
					<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
						<SelectField name="BanerId" options={list} autoWidth={false} multiple={false} native={false} />
					</Grid>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
						<LoadingButton
							variant="contained"
							onClick={handleSubmit(onSubmit)}
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
							ثبت
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
							بستن
						</LoadingButton>
					</Box>
				</FormProvider>
			</Box>
		</Dialog>
	);
}

export default MyModal;
