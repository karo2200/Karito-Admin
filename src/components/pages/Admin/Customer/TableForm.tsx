import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import Action from '@/components/organisms/Action';
import Pagination from '@/components/organisms/pagination';

import { IPageProps } from './type-page';
const index: FC<IPageProps> = ({ rows, TotalCount, OnsetRowsPerPage, OnhandleOTP }) => {
	const [rowsPerPage, setRowsPerPage] = React.useState(20);
	const [page, setPage] = React.useState(0);
	const router = useRouter();

	return (
		<>
			<TableContainer component={Paper} sx={{ direction: 'rtl' }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow
							sx={{
								height: 45,
								background: '#d1e6ffff',
								boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
							}}
						>
							<TableCell
								sx={{
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: 'bold',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
									width: '60px',
								}}
							>
								ردیف
							</TableCell>
							<TableCell
								sx={{
									color: '#2a2a2a',
									fontWeight: 'bold',
									fontSize: '0.9rem',
									paddingY: 0,
									width: '70px',
									whiteSpace: 'nowrap',
								}}
							>
								عملیات
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: 'bold',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								کد مشتری
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: 'bold',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								نام
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: 'bold',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								نام خانواگی{' '}
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: 'bold',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								موبایل
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: 'bold',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								تصویر
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
										height: 40,
										backgroundColor: index % 2 === 0 ? '#f7faff' : '#ffffff', // یکی در میون
									}}
								>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{index + 1}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										<Action
											OnhandleOTP={() => {
												OnhandleOTP(row);
											}}
											OnhandelDiscount={() => {
												router.push({
													pathname: '/Admin/DiscountCode',
													query: {
														customerName: row.firstName + '' + row.lastName,
														customerId: row.id,
													},
												});
											}}
										/>
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row?.code}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row?.firstName}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row?.lastName}
									</TableCell>
									<TableCell scope="row" sx={{ fontFamily: 'Tahoma', textAlign: 'right', paddingY: 0, height: 30 }}>
										{row?.phoneNumber}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										<img
											src={row?.profileImageUrl}
											style={{ width: '50px', height: '50px', border: '1px solid #00000036', borderRadius: '50%' }}
										></img>
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
		</>
	);
};

export default index;
