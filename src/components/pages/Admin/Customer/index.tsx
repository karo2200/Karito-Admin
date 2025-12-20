import { Box } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { SortEnumType, useCustomer_GetAllQuery } from 'src/graphql/generated';

import COLORS from '@/theme/colors';

import MidelForm from './MidelForm';
import SearchPage from './SearchForm';
type SortKey = 'D' | 'F' | 'L';

const index = () => {
	const [value, setValue] = useState('');
	const [valueend, setvalueend] = useState('');
	const [cell, setCell] = useState<'firstName' | 'lastName' | 'code' | 'phoneNumber' | 'registeredAt'>('firstName');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);
	const [load, setLoad] = useState(1);
	const [sort, setSort] = useState<{ key: SortKey; direction: SortEnumType }>({
		key: 'D',
		direction: SortEnumType.Desc,
	});

	const order = useMemo(() => {
		const map: Record<SortKey, any> = {
			D: { registeredAt: sort.direction },
			F: { firstName: sort.direction },
			L: { lastName: sort.direction },
		};
		return map[sort.key];
	}, [sort]);
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
				return {
					registeredAt: {
						gte: value,
						lte: valueend,
					},
				};
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
			order,
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
	const handleSort = (key: SortKey) => {
		setSort((prev) => ({
			key,
			direction: prev.key === key && prev.direction === SortEnumType.Desc ? SortEnumType.Asc : SortEnumType.Desc,
		}));
		setPage(0);
		setLoad(1);
	};
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
					onSearchItem={(search, cell, end) => {
						setValue(search);
						setvalueend(end);
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
				Onhandlesort={handleSort}
			/>
		</>
	);
};

export default index;
