import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { useCity_ActivateMutation, useCity_DeactivateMutation } from 'src/graphql/generated';

import Action from '@/components/organisms/Action';
import Pagination from '@/components/organisms/pagination';

import { IPageProps } from './type-page';

const Index: FC<IPageProps> = ({
	rows,
	OnhandleEditClick,
	OnhandleBaner,
	OnhandleCursel,
	onRefreshItem,
	OnhandleMap,
}) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);

	const paginatedRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	const { mutate: mutateCity } = useCity_ActivateMutation();
	const { mutate: mutateCityDe } = useCity_DeactivateMutation();

	const OnhandelActive = (row) => {
		if (!row.isActive) {
			mutateCity({ input: { cityId: row.id } }, { onSuccess: () => onRefreshItem(), onError: () => {} });
		} else {
			mutateCityDe({ input: { cityId: row.id } }, { onSuccess: () => onRefreshItem(), onError: () => {} });
		}
	};

	return (
		<>
			<TableContainer component={Paper} sx={{ direction: 'rtl' }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow sx={{ height: 30, background: '#c7dffa', color: '#555' }}>
							<TableCell align="center" sx={{ color: '#555', paddingY: 0 }}>
								عملیات
							</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>کد</TableCell>

							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>استان</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>شهر</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>بنر</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>تصاویر چرخشی</TableCell>

							{/* ستون‌های مربوط به آیکون‌ها */}
							<TableCell sx={{ textAlign: 'center', color: '#555', paddingY: 0 }}>فعال/غیرفعال</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{paginatedRows?.map((row, index) => (
							<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 30 }}>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									<Action
										OnhandleEdit={() => {
											OnhandleEditClick(row);
										}}
										OnhandleMap={() => {
											OnhandleMap(row);
										}}
										OnhandelCurser={() => {
											OnhandleCursel(row);
										}}
										OnhandleBanner={() => {
											OnhandleBaner(row);
										}}
									/>
								</TableCell>
								<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
									{row.abbreviation}
								</TableCell>
								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>{row.province?.name}</TableCell>
								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>{row.name}</TableCell>
								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>
									<img
										src={row.activeBanner?.imageUrl}
										style={{ width: '50px', height: '50px', border: '1px solid #00000036' }}
										alt="بنر"
									/>
								</TableCell>
								<TableCell sx={{ textAlign: 'right', paddingY: 0 }}>{row.activeCarousel?.title}</TableCell>
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
