import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { toJalaali } from 'jalaali-js';
import React, { FC } from 'react';

import Action from '@/components/organisms/Action';
import Statues from '@/components/organisms/Approve';
import Pagination from '@/components/organisms/pagination';

import { IPageProps } from './type-page';
function convertToJalali(dateString) {
	if (!dateString) return;
	const date = new Date(dateString);
	if (isNaN(date)) return;
	const jDate = toJalaali(date);
	return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
}
const index: FC<IPageProps> = ({ rows, TotalCount, OnsetRowsPerPage, OnhandleShow }) => {
	const [rowsPerPage, setRowsPerPage] = React.useState(20);
	const [page, setPage] = React.useState(0);

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
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>عملیات</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>تاریخ</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>کد </TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>مشتری </TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>آدرس</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>متخصص</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>سرویس</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>قیمت</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>تخفیف</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>قیمت نهایی</TableCell>

							<TableCell align="center" sx={{ color: '#555', paddingY: 0 }}>
								وضعیت
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
											OnhandleShow={() => {
												OnhandleShow(row);
											}}
										/>
									</TableCell>
									<TableCell scope="row" sx={{ fontFamily: 'Tahoma', textAlign: 'right', paddingY: 0, height: 30 }}>
										{convertToJalali(row?.requestDate)}
									</TableCell>
									<TableCell scope="row" sx={{ fontFamily: 'Tahoma', textAlign: 'right', paddingY: 0, height: 30 }}>
										{row?.trackingCode}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row?.customer?.firstName || '' + ' ' + row?.customer?.lastName || ''}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row?.address?.city?.province?.name +
											'-' +
											row?.address?.city?.name +
											'- پلاک:' +
											row?.address?.buildingNumber +
											'- طبقه:' +
											row?.address?.floorNumber +
											'-' +
											row?.address?.text}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row?.specialist?.firstName || '' + ' ' + row?.specialist?.lastName || ''}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.serviceType?.name}
									</TableCell>
									<TableCell scope="row" sx={{ fontFamily: 'Tahoma', textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.basePrice.toLocaleString()}
									</TableCell>
									<TableCell scope="row" sx={{ fontFamily: 'Tahoma', textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.discountAmount.toLocaleString()}
									</TableCell>
									<TableCell scope="row" sx={{ fontFamily: 'Tahoma', textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.finalPrice.toLocaleString()}
									</TableCell>

									<TableCell align="left" sx={{ paddingY: 0, height: 30, width: 120 }}>
										<Statues status={row?.status} />
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
