import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { useDiscountCode_ActivateMutation } from 'src/graphql/generated';

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

	const OnhandelActive = (row) => {
		mutate({ input: { id: row.id } }, { onSuccess: () => onRefreshItem(), onError: () => {} });
	};

	return (
		<>
			<TableContainer component={Paper} sx={{ direction: 'rtl' }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow sx={{ height: 30, background: '#c7dffa', color: '#555' }}>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>کد تخفیف</TableCell>

							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>مشتری</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>عنوان</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>قیمت</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}> isPercentage</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>تاریخ انقضا</TableCell>

							{/* ستون‌های مربوط به آیکون‌ها */}
							<TableCell sx={{ textAlign: 'center', color: '#555', paddingY: 0 }}>حذف</TableCell>
							<TableCell sx={{ textAlign: 'center', color: '#555', paddingY: 0 }}>فعال/غیرفعال</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{paginatedRows?.map((row, index) => (
							<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 30 }}>
								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>{row.code}</TableCell>

								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>
									{row.customerDto?.firstName + '' + row.customerDto?.lastName}
								</TableCell>
								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>{row.title}</TableCell>
								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>{row.amount.toLocaleString()}</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30, width: 100 }}>
									<input
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
