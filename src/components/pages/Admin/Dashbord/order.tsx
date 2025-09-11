import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { toJalaali } from 'jalaali-js';
import React, { FC, useEffect, useState } from 'react';
import { SortEnumType, useServiceRequest_GetAllQuery } from 'src/graphql/generated';

import Statues from '@/components/organisms/Approve';

import { IPageProps } from './type-page';

function convertToJalali(dateString) {
	if (!dateString) return;
	const date = new Date(dateString);
	if (isNaN(date)) return;
	const jDate = toJalaali(date);
	return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
}
const index: FC<IPageProps> = () => {
	const [load, setLoad] = useState(1);

	const { data, isSuccess, isError } = useServiceRequest_GetAllQuery(
		{
			take: 10,
			skip: 0,
			order: { requestDate: SortEnumType.Desc },
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
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>تاریخ</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>مشتری </TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>متخصص</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>سرویس</TableCell>
							<TableCell sx={{ textAlign: 'right', color: '#555', paddingY: 0 }}>قیمت نهایی</TableCell>
							<TableCell align="center" sx={{ color: '#555', paddingY: 0 }}>
								وضعیت
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.serviceRequest_getAll?.result?.totalCount === 0 ? (
							<TableRow>
								<TableCell colSpan={9} align="center">
									هیچ داده‌ای یافت نشد
								</TableCell>
							</TableRow>
						) : (
							data?.serviceRequest_getAll?.result?.items?.map((row) => (
								<TableRow
									key={row.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
										height: 30,
									}}
								>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{convertToJalali(row?.requestDate)}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row?.customer?.firstName || '' + ' ' + row?.customer?.lastName || ''}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.address?.neighborhood?.city?.province?.name +
											'-' +
											row.address?.neighborhood?.city?.name +
											'-' +
											row.address?.neighborhood?.name +
											'-' +
											row.address?.text}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row?.specialist?.firstName || '' + ' ' + row?.specialist?.lastName || ''}
									</TableCell>
									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.serviceType?.name}
									</TableCell>

									<TableCell scope="row" sx={{ textAlign: 'right', paddingY: 0, height: 30 }}>
										{row.finalPrice}
									</TableCell>

									<TableCell align="left" sx={{ paddingY: 0, height: 30, width: 120 }}>
										<Statues status={row?.status} />
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
