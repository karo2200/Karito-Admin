import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { useCity_ActivateMutation, useCity_DeactivateMutation } from 'src/graphql/generated';

import Pagination from '@/components/organisms/pagination';
import * as S from '@/components/pages/styles';

import { IPageProps } from './type-page';
const index: FC<IPageProps> = ({ rows, OnhandleEditClick, OnhandleBaner, OnhandleCursel, onRefreshItem }) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const paginatedRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	const { mutate: mutateCity, isLoading: isLoading } = useCity_ActivateMutation();
	const { mutate: mutateCityDe, isLoading: isLoadingde } = useCity_DeactivateMutation();

	const OnhandelActive = (row) => {
		if (row.isActive == false) {
			mutateCity(
				{
					input: {
						cityId: row?.id,
					},
				},
				{
					onSuccess: async (res) => {
						onRefreshItem();
					},
					onError: (err) => {},
				}
			);
		} else {
			mutateCityDe(
				{
					input: {
						cityId: row?.id,
					},
				},
				{
					onSuccess: async (res) => {
						onRefreshItem();
					},
					onError: (err) => {},
				}
			);
		}
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
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>استان</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>شهر</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>بنر</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>Carsoule</TableCell>
							<TableCell align="left" sx={{ color: '#555', paddingY: 0 }}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedRows?.map((row) => (
							<TableRow
								key={row.name}
								sx={{
									'&:last-child td, &:last-child th': { border: 0 },
									height: 30,
								}}
							>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.province?.name}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.name}
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									<img
										src={row.activeBanner?.imageUrl}
										style={{ width: '50px', height: '50px', border: '1px solid #00000036' }}
									></img>
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									<img
										src={row.activeCarousel?.imageUrls[0]}
										style={{ width: '50px', height: '50px', border: '1px solid #00000036' }}
									></img>
								</TableCell>
								<TableCell align="left" sx={{ paddingY: 0, height: 30 }}>
									<IconButton>
										<S.EditIcons onClick={() => OnhandleEditClick(row)} />
									</IconButton>

									<IconButton
										onClick={() => {
											OnhandelActive(row);
										}}
									>
										{row?.isActive ? (
											<ToggleOnIcon color="success" sx={{ height: '35px ', width: '50px' }} />
										) : (
											<ToggleOffIcon color="disabled" sx={{ height: '35px ', width: '50px' }} />
										)}
									</IconButton>
									<IconButton>
										<S.AdIcon onClick={() => OnhandleBaner(row)} />
									</IconButton>
									<IconButton>
										<S.ViewCarousel onClick={() => OnhandleCursel(row)} />
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
