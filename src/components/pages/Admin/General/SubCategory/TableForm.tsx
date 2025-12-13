import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { FC } from 'react';

import Action from '@/components/organisms/Action';
import Pagination from '@/components/organisms/pagination';

import { IPageProps } from './type-page';
const index: FC<IPageProps> = ({ rows, OnhandleEditClick, OnhandleDeleteClick }) => {
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
								background: '#cdd3e28f',
								boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
							}}
						>
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
								align="center"
								sx={{
									color: '#2a2a2a',
									fontWeight: 'bold',
									fontSize: '0.9rem',
									paddingY: 0,
									whiteSpace: 'nowrap',
									width: '70px',
								}}
							>
								عملیات
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
								کد
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
								سرویس
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
								سرویس
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
								تصاویر
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
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									<Action
										OnhandleEdit={() => {
											OnhandleEditClick(row);
										}}
										OnhandelDelete={() => {
											OnhandleDeleteClick(row);
										}}
									/>
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.abbreviation}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.serviceCategory?.name}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.name}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30, width: 100 }}>
									<img src={row.logo} style={{ width: '50px', height: '50px', border: '1px solid #00000036' }}></img>
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
