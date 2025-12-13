import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SortEnumType, useServiceRequest_GetAllQuery } from 'src/graphql/generated';

import COLORS from '@/theme/colors';

import MidelForm from './MidelForm';
import SearchPage from './SearchForm';

const index = () => {
	const [CityId, setCityId] = useState('');
	const [name, setname] = useState('');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);
	const [load, setLoad] = useState(1);
	const [SortItem, setSortItem] = useState('');
	const [SortIndex, setSortIndex] = useState(SortEnumType.Desc);
	const order = React.useMemo(() => {
		switch (SortItem) {
			case 'D':
				return { requestDate: SortIndex };
			case 'P':
				return { basePrice: SortIndex };
			case 'DP':
				return { discountAmount: SortIndex };
			default:
				return { finalPrice: SortIndex };
		}
	}, [SortIndex]);

	const {
		data: list,
		isSuccess,
		isError,
	} = useServiceRequest_GetAllQuery(
		{
			take: rowsPerPage,
			skip: page * rowsPerPage,
			order,
			where:
				CityId != ''
					? {
							address: {
								city: {
									id: { eq: CityId },
								},
							},

							...(name && {
								or: [{ customer: { firstName: { contains: name } } }, { customer: { lastName: { contains: name } } }],
							}),
					  }
					: {
							...(name && {
								or: [{ customer: { firstName: { contains: name } } }, { customer: { lastName: { contains: name } } }],
							}),
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
					onSearchItem={(name, CityId) => {
						setname(name);
						setCityId(CityId);
						setLoad(1);
					}}
				/>
			</Box>
			<MidelForm
				TotalCount={list?.serviceRequest_getAll?.result?.totalCount || 1}
				DataRow={list?.serviceRequest_getAll?.result?.items || []}
				onRefreshItem={() => {
					setLoad(1);
				}}
				OnsetRowsPerPage={(row, page) => {
					setRowsPerPage(row);
					setPage(page);
					setLoad(1);
				}}
				Onhandlesort={(data) => {
					setSortItem(data);
					setSortIndex(SortEnumType.Desc);
					if (SortIndex === SortEnumType.Desc) setSortIndex(SortEnumType.Asc);
					setLoad(1);
				}}
			/>
		</>
	);
};

export default index;
