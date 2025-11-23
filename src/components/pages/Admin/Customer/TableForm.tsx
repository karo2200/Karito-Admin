import DiscountIcon from '@mui/icons-material/Discount';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import Pagination from '@/components/organisms/pagination';
import COLORS from '@/theme/colors';

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
								height: 30,
								background: '#c7dffa', // nice blue gradient
								color: '#555', // white text
							}}
						>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>کد مشتری</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>نام</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>نام خانواگی </TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>موبایل</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>تصویر</TableCell>
							<TableCell sx={{ textAlign: 'center', color: '#555', paddingY: 0 }}>تخفیف</TableCell>
							<TableCell sx={{ textAlign: 'center', color: '#555', paddingY: 0 }}>OTP</TableCell>
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
									<TableCell align="center" sx={{ paddingY: 0 }}>
										<IconButton>
											<DiscountIcon
												sx={{ color: COLORS.grey1 }}
												onClick={() =>
													router.push({
														pathname: '/Admin/DiscountCode',
														query: {
															customerName: row.firstName + '' + row.lastName,
															customerId: row.id,
														},
													})
												}
											/>
										</IconButton>
									</TableCell>
									<TableCell align="center" sx={{ paddingY: 0 }}>
										<IconButton>
											<PermPhoneMsgIcon onClick={() => OnhandleOTP(row)} />
										</IconButton>
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
