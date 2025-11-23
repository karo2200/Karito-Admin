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
								height: 30,
								background: '#c7dffa', // nice blue gradient
								color: '#555', // white text
							}}
						>
							<TableCell align="center" sx={{ color: '#555', paddingY: 0, width: '70px' }}>
								عملیات
							</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>کد</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>سرویس</TableCell>

							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>سرویس</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>قیمت</TableCell>

							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>لوگو</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>بنر</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>isSpecial</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedRows?.map((row, index) => (
							<TableRow
								key={index}
								sx={{
									'&:last-child td, &:last-child th': { border: 0 },
									height: 30,
								}}
							>
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
									{row.serviceSubCategory?.name}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.name}
								</TableCell>
								<TableCell scope="row" sx={{ fontFamily: 'Tahoma', textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.basePrice.toLocaleString()}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30, width: 100 }}>
									<img src={row.logo} style={{ width: '50px', height: '50px', border: '1px solid #00000036' }}></img>
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30, width: 100 }}>
									<img src={row.banner} style={{ width: '50px', height: '50px', border: '1px solid #00000036' }}></img>
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30, width: 100 }}>
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
