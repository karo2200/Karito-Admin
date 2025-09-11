import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SortEnumType, useCustomer_GetAllQuery } from 'src/graphql/generated';

import MidelForm from './MidelForm';
import SearchPage from './SearchForm';

const index = () => {
	const [Code, setCode] = useState('');
	const [name, setname] = useState('');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [load, setLoad] = useState(1);

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
				code: { contains: Code },
				or: [{ firstName: { contains: name } }, { lastName: { contains: name } }],
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
					border: '1px solid #00000014',
				}}
			>
				<SearchPage
					onSearchItem={(name, Code) => {
						setname(name);
						setCode(Code);
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
