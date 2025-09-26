import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SortEnumType, useSpecialist_GetAllQuery } from 'src/graphql/generated';

import MidelForm from './MidelForm';
import SearchPage from './SearchForm';
const rows = [
	{ name: 'Ice cream', calories: 200, fat: 10, carbs: 30, protein: 4, active: true },
	{ name: 'Cake', calories: 250, fat: 15, carbs: 35, protein: 5, active: false },
];
const index = () => {
	const [selectedRow, setSelectedRow] = useState('');
	const [CityId, setCityId] = useState('');
	const [load, setLoad] = useState(1);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);
	const {
		data: List,
		isSuccess,
		isError,
	} = useSpecialist_GetAllQuery(
		{
			take: rowsPerPage,
			skip: page * rowsPerPage,
			order: { id: SortEnumType.Desc },
			where:
				CityId != '' && CityId != '0'
					? {
							city: { id: { eq: CityId } },
							or: [{ lastName: { contains: selectedRow } }, { firstName: { contains: selectedRow } }],
					  }
					: { or: [{ lastName: { contains: selectedRow } }, { firstName: { contains: selectedRow } }] },
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
			<Box
				sx={{
					//boxShadow: ' rgb(100 100 111 / 9%) 0px 7px 29px 0px',
					width: '100%',
					minHeight: '90px',
					borderRadius: 2,
					marginBottom: 5,
					padding: 2,
					border: '1px solid #00000014',
				}}
			>
				<SearchPage
					onSearchItem={(name, CityId) => {
						setSelectedRow(name);
						setCityId(CityId);
						setLoad(1);
					}}
				/>
			</Box>
			<MidelForm
				DataRow={List?.specialist_getAll?.result?.items || []}
				onRefreshItem={() => {
					setLoad(1);
				}}
				OnsetRowsPerPage={(row, page) => {
					setRowsPerPage(row);
					setPage(page);
					setLoad(1);
				}}
			/>
		</>
	);
};

export default index;
