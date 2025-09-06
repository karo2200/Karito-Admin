import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { FC } from 'react';

import Pagination from '@/components/organisms/pagination';
import * as S from '@/components/pages/styles';

import { IPageProps } from './type-page';
const index: FC<IPageProps> = ({ rows, OnhandleEditClick, OnhandleDeleteClick }) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>بنر</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>تصاویر</TableCell>

							<TableCell align="left" sx={{ color: '#555', paddingY: 0 }}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedRows?.map((row) => (
							<TableRow
								key={row.title}
								sx={{
									'&:last-child td, &:last-child th': { border: 0 },
									height: 30,
								}}
							>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.title}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30, width: 100 }}>
									<img src={row.imageUrl} style={{ width: '50px', border: '1px solid #00000036' }}></img>
								</TableCell>
								<TableCell align="left" sx={{ paddingY: 0, height: 30, width: 120 }}>
									<IconButton>
										<S.EditIcons onClick={() => OnhandleEditClick(row)} />
									</IconButton>
									<IconButton>
										<S.DeleteIcons onClick={() => OnhandleDeleteClick(row)} />
									</IconButton>
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
