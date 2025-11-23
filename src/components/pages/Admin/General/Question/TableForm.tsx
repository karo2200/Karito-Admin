import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { QuestionType } from 'src/graphql/generated';

import Action from '@/components/organisms/Action';
import Pagination from '@/components/organisms/pagination';

import { IPageProps } from './type-page';
const index: FC<IPageProps> = ({ rows, OnhandleEditClick }) => {
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
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>سوال</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>آپشن</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>نوع سوال</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>اجباری بودن</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedRows?.map((row, index) => (
							<TableRow
								key={index}
								sx={{
									'&:last-child td, &:last-child th': { border: 0 },
								}}
							>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									<Action
										OnhandleEdit={() => {
											OnhandleEditClick(row);
										}}
									/>
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0 }}>
									{row.text}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0 }}>
									{row?.options?.map((data, i) => (
										<div key={i}>{data}</div>
									))}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.isRequired ? 'اجباری' : 'غیراجباری'}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0 }}>
									<input
										disabled
										type={row.questionType == QuestionType.CheckBox ? 'checkbox' : 'radio'}
										checked={true}
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
