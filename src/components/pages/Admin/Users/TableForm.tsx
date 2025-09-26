import BlockIcon from '@mui/icons-material/Block';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { useUser_SetBlockStateMutation } from 'src/graphql/generated';

import Pagination from '@/components/organisms/pagination';
import COLORS from '@/theme/colors';

import { IPageProps } from './type-page';
const index: FC<IPageProps> = ({ rows, onRefreshItem }) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);
	const paginatedRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	const { mutate, isLoading: isLoading } = useUser_SetBlockStateMutation();
	const OnhandelActive = (row) => {
		mutate(
			{
				input: {
					userId: row?.id,
					isBlocked: !row.isBlocked,
				},
			},
			{
				onSuccess: async (res) => {
					onRefreshItem();
				},
				onError: (err) => {},
			}
		);
	};
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
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>کدکاربری</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>نام</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>نام خانوادگی</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>شماره همراه</TableCell>
							<TableCell align="left" sx={{ color: '#555', paddingY: 0 }}></TableCell>
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
									{row.code}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.firstName}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.lastName}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.phoneNumber}
								</TableCell>
								<TableCell align="left" sx={{ paddingY: 0, height: 30 }}>
									<IconButton title={row.isBlocked ? 'بلاک شده' : 'آزاد'}>
										<BlockIcon
											sx={{ color: row.isBlocked ? COLORS.grey1 : COLORS.red }}
											onClick={() => OnhandelActive(row)}
										/>
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
