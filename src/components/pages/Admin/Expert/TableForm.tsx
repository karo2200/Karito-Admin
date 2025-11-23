import { LoadingButton } from '@mui/lab';
import {
	Dialog,
	DialogContent,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { toJalaali } from 'jalaali-js';
import React, { FC, useState } from 'react';
import { VerificationStatus } from 'src/graphql/generated';

import Action from '@/components/organisms/Action';
import Pagination from '@/components/organisms/pagination';

import { IPageProps } from './type-page';
function convertToJalali(dateString) {
	if (!dateString) return;
	const date = new Date(dateString);
	if (isNaN(date)) return;
	const jDate = toJalaali(date);
	return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
}
const index: FC<IPageProps> = ({
	rows,
	OnhandleEditClick,
	OnhandleVideo,
	OnhandleDocument,
	OnhandleListDocument,
	OnhandleShow,
	OnsetRowsPerPage,
	OnhandleOTP,
	TotalCount,
}) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);
	const [page, setPage] = React.useState(0);
	// Open modal with image
	const handleImageClick = (url: string) => {
		setSelectedImage(url);
	};

	// Close modal
	const handleCloseModal = () => {
		setSelectedImage(null);
	};
	return (
		<>
			<TableContainer component={Paper} sx={{ direction: 'rtl' }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow
							sx={{
								height: 30,
								background: '#c7dffa', // nice blue gradient
								color: '#555', // white text
							}}
						>
							<TableCell align="center" sx={{ color: '#555', paddingY: 0 }}>
								عملیات
							</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>تاریخ</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>کد پرسنلی</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>نام</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>نام خانوادگی</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>شهر</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>کارت ملی</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>ویدئو</TableCell>

							<TableCell align="center" sx={{ color: '#555', paddingY: 0 }}>
								کارت ملی
							</TableCell>
							<TableCell align="center" sx={{ color: '#555', paddingY: 0 }}>
								ویدئو
							</TableCell>
							<TableCell align="center" sx={{ color: '#555', paddingY: 0 }}>
								داکیومنت
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.length === 0 ? (
							<TableRow>
								<TableCell colSpan={9} align="center">
									هیچ داده‌ای یافت نشد
								</TableCell>
							</TableRow>
						) : (
							rows?.map((row, index) => (
								<TableRow
									key={index}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
										height: 30,
									}}
								>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										<Action
											OnhandleListDocument={() => {
												OnhandleListDocument(row);
											}}
											OnhandleShow={() => {
												OnhandleShow(row);
											}}
											OnhandleOTP={() => {
												OnhandleOTP(row);
											}}
										/>
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{convertToJalali(row?.registeredAt)}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.code}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.firstName}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.lastName}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.city?.name}
									</TableCell>

									<TableCell
										scope="row"
										sx={{ textAlign: 'right', cursor: 'pointer', paddingY: 0, height: 30, width: 100 }}
									>
										<img
											src={row?.idCardImageUrl}
											style={{ width: '50px', height: '50px', border: '1px solid #00000036' }}
											onClick={() => handleImageClick(row?.idCardImageUrl)}
										></img>
									</TableCell>
									<TableCell
										scope="row"
										sx={{ textAlign: 'right', cursor: 'pointer', paddingY: 0, height: 30, width: 100 }}
									>
										<video
											src={row?.identityVerificationVideoUrl}
											style={{ width: '50px', height: '50px', border: '1px solid #00000036' }}
											onClick={() => handleImageClick(row?.identityVerificationVideoUrl)}
										/>
									</TableCell>

									<TableCell align="left" sx={{ paddingY: 0, height: 30, width: 120 }}>
										<LoadingButton
											variant="contained"
											onClick={() => OnhandleEditClick(row)}
											//loading={loading}
											fullWidth
											sx={{
												fontSize: '13px',
												background:
													row?.idCardVerificationStatus === VerificationStatus.Pending
														? '#ccb349'
														: row?.idCardVerificationStatus === VerificationStatus.Approved
														? '#3eb14b'
														: '#db7450',
												color: '#fff',
												borderRadius: '8px !important',
												width: '100px',
												height: '35px !important',
												margin: '3px',
												boxShadow:
													' 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12) !important',
												'&:hover': {
													background:
														row?.idCardVerificationStatus === VerificationStatus.Pending
															? '#b39f33'
															: row?.idCardVerificationStatus === VerificationStatus.Approved
															? '#3eb14b'
															: '#db7450',
													boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // add some shadow on hover
												},
											}}
										>
											{row?.idCardVerificationStatus === VerificationStatus.Pending
												? 'در انتظار'
												: row?.idCardVerificationStatus === VerificationStatus.Approved
												? 'تایید شده'
												: 'رد شده'}
										</LoadingButton>
									</TableCell>
									<TableCell align="left" sx={{ paddingY: 0, height: 30, width: 120 }}>
										<LoadingButton
											variant="contained"
											onClick={() => OnhandleVideo(row)}
											//loading={loading}
											fullWidth
											sx={{
												fontSize: '13px',
												background:
													row?.identityVerificationVideoStatus === VerificationStatus.Pending
														? '#ccb349'
														: row?.identityVerificationVideoStatus === VerificationStatus.Approved
														? '#3eb14b'
														: '#db7450',
												color: '#fff',
												borderRadius: '8px !important',
												width: '100px',
												height: '35px !important',
												margin: '3px',
												boxShadow:
													' 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12) !important',
												'&:hover': {
													background:
														row?.identityVerificationVideoStatus === VerificationStatus.Pending
															? '#b39f33'
															: row?.identityVerificationVideoStatus === VerificationStatus.Approved
															? '#3eb14b'
															: '#db7450',
													boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // add some shadow on hover
												},
											}}
										>
											{row?.identityVerificationVideoStatus === VerificationStatus.Pending
												? 'در انتظار'
												: row?.identityVerificationVideoStatus === VerificationStatus.Approved
												? 'تایید شده'
												: 'رد شده'}
										</LoadingButton>
									</TableCell>
									<TableCell align="left" sx={{ paddingY: 0, height: 30, width: 120 }}>
										<LoadingButton
											variant="contained"
											onClick={() => OnhandleDocument(row)}
											//loading={loading}
											fullWidth
											sx={{
												fontSize: '13px',
												background:
													row?.specializedDocumentsVerificationStatus === VerificationStatus.Pending
														? '#ccb349'
														: row?.specializedDocumentsVerificationStatus === VerificationStatus.Approved
														? '#3eb14b'
														: '#db7450',
												color: '#fff',
												borderRadius: '8px !important',
												width: '100px',
												height: '35px !important',
												margin: '3px',
												boxShadow:
													' 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12) !important',
												'&:hover': {
													background:
														row?.specializedDocumentsVerificationStatus === VerificationStatus.Pending
															? '#b39f33'
															: row?.specializedDocumentsVerificationStatus === VerificationStatus.Approved
															? '#3eb14b'
															: '#db7450',
													boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // add some shadow on hover
												},
											}}
										>
											{row?.specializedDocumentsVerificationStatus === VerificationStatus.Pending
												? 'در انتظار'
												: row?.specializedDocumentsVerificationStatus === VerificationStatus.Approved
												? 'تایید شده'
												: 'رد شده'}
										</LoadingButton>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination
				Len={TotalCount || 1}
				rowsPerPage={rowsPerPage || 5}
				page={page}
				OnchangePage={(newPage) => {
					setPage(newPage);
					OnsetRowsPerPage(rowsPerPage, newPage);
				}}
				OnsetRowsPerPage={(event) => {
					OnsetRowsPerPage(event, 0);
					setRowsPerPage(event);
				}}
			></Pagination>
			<Dialog open={!!selectedImage} onClose={handleCloseModal} fullWidth maxWidth="md">
				<DialogContent
					sx={{
						p: 0,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '80vh',
						backgroundColor: '#000',
					}}
				>
					{selectedImage &&
					(selectedImage.endsWith('.mp4') || selectedImage.endsWith('.webm') || selectedImage.endsWith('.ogg')) ? (
						<video
							src={selectedImage}
							controls
							style={{
								maxWidth: '100%',
								maxHeight: '100%',
							}}
						/>
					) : (
						<img
							src={selectedImage}
							alt="Preview"
							style={{
								maxWidth: '100%',
								maxHeight: '100%',
								objectFit: 'contain',
								display: 'block',
								margin: '0 auto',
							}}
						/>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default index;
