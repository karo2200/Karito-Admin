import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SortEnumType, useCustomer_GetAllQuery } from 'src/graphql/generated';

import COLORS from '@/theme/colors';

import MidelForm from './MidelForm';
import SearchPage from './SearchForm';

const index = () => {
	const [value, setValue] = useState('');
	const [cell, setCell] = useState<'firstName' | 'lastName' | 'code' | 'phoneNumber'>('firstName');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);
	const [load, setLoad] = useState(1);
	const getWhereByCell = () => {
		if (!value) return {};
		switch (cell) {
			case 'firstName':
				return {
					firstName: { contains: value },
				};
			case 'lastName':
				return {
					lastName: { contains: value },
				};

			case 'code':
				return {
					code: { eq: value },
				};
			case 'phoneNumber':
				return {
					phoneNumber: { contains: value },
				};
			default:
				return {};
		}
	};
	const {
		data: list,
		isSuccess,
		isError,
	} = useCustomer_GetAllQuery(
		{
			take: rowsPerPage,
			skip: page * rowsPerPage,
			order: { id: SortEnumType.Desc },
			where: {
				...getWhereByCell(),
			},
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
					backgroundColor: COLORS.grey3,
					border: '1px solid #c1c1c1a8',
				}}
			>
				<SearchPage
					onSearchItem={(search, cell) => {
						setValue(search);
						setCell(cell);
						setLoad(1);
					}}
				/>
			</Box>
			<MidelForm
				TotalCount={list?.customer_getAll?.result?.totalCount || 1}
				DataRow={list?.customer_getAll?.result?.items || []}
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
