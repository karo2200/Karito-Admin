import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { FC } from 'react';

import Pagination from '@/components/organisms/pagination';

import { IPageProps } from './type-page';
const index: FC<IPageProps> = ({ rows }) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);

	const paginatedRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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
									textAlign: 'right',
									color: '#2a2a2a',
									fontWeight: 'bold',
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
									fontWeight: 'bold',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
								}}
							>
								لوگو
							</TableCell>

							<TableCell
								align="left"
								sx={{ color: '#2a2a2a', fontWeight: 'bold', fontSize: '0.9rem', paddingY: 0, whiteSpace: 'nowrap' }}
							>
								special
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
									backgroundColor: index % 2 === 0 ? '#f7faff' : '#ffffff',
								}}
							>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{index + 1}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.name}
								</TableCell>
								{/*<TableCell
									scope="row"
									sx={{ textAlign: 'right', cursor: 'pointer' }}
									onClick={() => OnhandleListDocument(row)}
								>
									نمایش لیست
								</TableCell>*/}
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0 }}>
									<img src={row.logo} style={{ width: '50px', height: '50px', border: '1px solid #00000036' }}></img>
								</TableCell>

								<TableCell align="left" sx={{ paddingY: 0, height: 30, width: 120 }}>
									<input
										disabled
										type="checkbox"
										checked={row.isSpecial}
										style={{ width: '25px', height: '25px', border: '1px solid #DEE2E6' }}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination
				Len={rows?.length || 1}
				rowsPerPage={rowsPerPage || 5}
				page={page}
				OnchangePage={(newPage) => setPage(newPage)}
				OnsetRowsPerPage={(event) => {
					setRowsPerPage(event);
					setPage(0);
				}}
			></Pagination>
		</>
	);
};

export default index;
