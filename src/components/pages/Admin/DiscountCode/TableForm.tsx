import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { toJalaali } from 'jalaali-js';
import React, { FC } from 'react';
import { useDiscountCode_ActivateMutation, useDiscountCode_DeactivateMutation } from 'src/graphql/generated';

import Pagination from '@/components/organisms/pagination';
import * as S from '@/components/pages/styles';

import { IPageProps } from './type-page';

function convertToJalali(dateString) {
	if (!dateString) return;
	const date = new Date(dateString);
	if (isNaN(date)) return;
	const jDate = toJalaali(date);
	return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
}

const Index: FC<IPageProps> = ({ rows, OnhandleDeleteClick, onRefreshItem }) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);

	const paginatedRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	const { mutate } = useDiscountCode_ActivateMutation();
	const { mutate: mutateDe } = useDiscountCode_DeactivateMutation();

	const OnhandelActive = (row) => {
		if (row.isActive) mutateDe({ input: { id: row.id } }, { onSuccess: () => onRefreshItem(), onError: () => {} });
		else mutate({ input: { id: row.id } }, { onSuccess: () => onRefreshItem(), onError: () => {} });
	};

	return (
		<>
			<TableContainer component={Paper} sx={{ direction: 'rtl' }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow sx={{ height: 45, background: '#cdd3e28f', boxShadow: '0px 2px 4px rgba(0,0,0,0.08)' }}>
							<TableCell
								sx={{
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: '400px',
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
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: '400px',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								کد تخفیف
							</TableCell>

							<TableCell
								sx={{
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: '400px',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								مشتری
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: '400px',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								عنوان
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: '400px',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								قیمت
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: '400px',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								{' '}
								isPercentage
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: '400px',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								تاریخ انقضا
							</TableCell>

							{/* ستون‌های مربوط به آیکون‌ها */}
							<TableCell
								sx={{
									textAlign: 'center',
									color: '#2a2a2a',
									fontWeight: 'bold',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								حذف
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'center',
									color: '#2a2a2a',
									fontWeight: 'bold',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								فعال/غیرفعال
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{paginatedRows?.map((row, index) => (
							<TableRow
								key={index}
								sx={{
									'&:last-child td, &:last-child th': { border: 0 },
									height: 40,
									backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff',
								}}
							>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{index + 1}
								</TableCell>
								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>{row.code}</TableCell>

								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>
									{row.customer?.firstName + '' + row.customer?.lastName}
								</TableCell>
								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>{row.title}</TableCell>
								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>{row.amount.toLocaleString()}</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30, width: 100 }}>
									<input
										disabled
										type="checkbox"
										checked={row.isSpecial}
										style={{ width: '25px', height: '25px', border: '1px solid #DEE2E6' }}
									/>
								</TableCell>
								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>{convertToJalali(row.expiryDate)}</TableCell>

								{/* آیکون ویرایش */}
								<TableCell align="center" sx={{ paddingY: 0 }}>
									<IconButton>
										<S.DeleteIcons onClick={() => OnhandleDeleteClick(row)} />
									</IconButton>
								</TableCell>

								{/* آیکون فعال/غیرفعال */}
								<TableCell align="center" sx={{ paddingY: 0 }}>
									<IconButton onClick={() => OnhandelActive(row)}>
										{row?.isActive ? (
											<ToggleOnIcon color="success" sx={{ height: '35px ', width: '35px' }} />
										) : (
											<ToggleOffIcon color="disabled" sx={{ height: '35px ', width: '35px' }} />
										)}
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination */}
			<Pagination
				Len={rows?.length || 1}
				rowsPerPage={rowsPerPage}
				page={page}
				OnchangePage={(newPage) => setPage(newPage)}
				OnsetRowsPerPage={(event) => {
					setRowsPerPage(event);
					setPage(0);
				}}
			/>
		</>
	);
};

export default Index;
