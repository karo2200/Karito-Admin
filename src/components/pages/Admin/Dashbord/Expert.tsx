import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { SortEnumType, useSpecialist_GetAllQuery } from 'src/graphql/generated';

import { IPageProps } from './type-page';

const index: FC<IPageProps> = () => {
	const [load, setLoad] = useState(1);

	const { data, isSuccess, isError } = useSpecialist_GetAllQuery(
		{
			take: 10,
			skip: 0,
			order: { id: SortEnumType.Desc },
		},
		{
			keepPreviousData: true,
			enabled: load === 1,
		}
	);
	useEffect(() => {
		if (load === 1 && (isSuccess || isError)) {
			setLoad(0);
		}
	}, [load, isSuccess, isError]);
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
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>نام</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>نام خانواادگی</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>شهر</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>سرویس</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>کارت ملی</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.specialist_getAll?.result?.totalCount === 0 ? (
							<TableRow>
								<TableCell colSpan={9} align="center">
									هیچ داده‌ای یافت نشد
								</TableCell>
							</TableRow>
						) : (
							data?.specialist_getAll?.result?.items?.map((row) => (
								<TableRow
									key={row.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
										height: 30,
									}}
								>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.firstName}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.lastName}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.city?.name}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.serviceTypes[0]?.name}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										<img
											src={row?.profileImageUrl}
											style={{ width: '50px', height: '50px', border: '1px solid #00000036', borderRadius: '50%' }}
										></img>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default index;
