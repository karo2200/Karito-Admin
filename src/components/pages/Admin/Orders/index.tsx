// src/components/pages/ServiceRequestPage.tsx
import { Box } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { SortEnumType, useServiceRequest_GetAllQuery } from 'src/graphql/generated';

import COLORS from '@/theme/colors';

import MidelForm from './MidelForm';
import SearchPage from './SearchForm';

type SortKey = 'D' | 'P' | 'DP' | 'PT' | 'DR' | 'DCO' | 'DM' | 'DMR';

const ServiceRequestPage = () => {
	const [value, setValue] = useState('');
	const [valueend, setvalueend] = useState('');

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(20);
	const [cell, setCell] = useState<
		| 'discountAmount'
		| 'customer'
		| 'specialist'
		| 'orderNumber'
		| 'basePrice'
		| 'finalPrice'
		| 'city'
		| 'state'
		| 'completedAt'
		| 'cancelledAt'
		| 'createdAt'
		| 'service'
		| 'arrivedAt'
		| 'assignedAt'
	>('customer');

	const [sort, setSort] = useState<{ key: SortKey; direction: SortEnumType }>({
		key: 'D',
		direction: SortEnumType.Desc,
	});

	const order = useMemo(() => {
		const map: Record<SortKey, any> = {
			D: { createdAt: sort.direction },
			P: { basePrice: sort.direction },
			DP: { discountAmount: sort.direction },
			PT: { finalPrice: sort.direction },
			DR: { cancelledAt: sort.direction },
			DCO: { completedAt: sort.direction },
			DM: { assignedAt: sort.direction },
			DMR: { arrivedAt: sort.direction },
		};
		return map[sort.key];
	}, [sort]);

	const getWhereByCell = () => {
		if (!value) return {};
		switch (cell) {
			case 'customer':
				return {
					or: [{ customer: { firstName: { contains: value } } }, { customer: { lastName: { contains: value } } }],
				};
			case 'specialist':
				return {
					or: [{ specialist: { firstName: { contains: value } } }, { specialist: { lastName: { contains: value } } }],
				};

			case 'orderNumber':
				return {
					orderNumber: { eq: Number(value) },
				};
			case 'basePrice':
				return {
					basePrice: { eq: Number(value) },
				};
			case 'finalPrice':
				return {
					finalPrice: { eq: Number(value) },
				};
			case 'discountAmount':
				return {
					discountAmount: { eq: Number(value) },
				};
			case 'city':
				return {
					address: { city: { name: { contains: value } } },
				};
			case 'state':
				return {
					address: { city: { province: { name: { contains: value } } } },
				};
			case 'createdAt':
				return {
					createdAt: {
						gte: value,
						lte: valueend,
					},
				};
			case 'completedAt':
				return {
					completedAt: {
						gte: value,
						lte: valueend,
					},
				};
			case 'cancelledAt':
				return {
					cancelledAt: {
						gte: value,
						lte: valueend,
					},
				};
			case 'arrivedAt':
				return {
					arrivedAt: {
						gte: value,
						lte: valueend,
					},
				};
			case 'assignedAt':
				return {
					assignedAt: {
						gte: value,
						lte: valueend,
					},
				};
			case 'service':
				return {
					serviceType: { name: { contains: value } },
				};
			default:
				return {
					createdAt: {
						gte: value,
						lte: valueend,
					},
				};
		}
	};

	const { data: list } = useServiceRequest_GetAllQuery({
		take: rowsPerPage,
		skip: page * rowsPerPage,
		order,
		where: {
			...getWhereByCell(),
		},
	});

	const handleSort = (key: SortKey) => {
		setSort((prev) => ({
			key,
			direction: prev.key === key && prev.direction === SortEnumType.Desc ? SortEnumType.Asc : SortEnumType.Desc,
		}));
		setPage(0);
	};
	return (
		<>
			<Box
				sx={{
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
						setPage(0);
					}}
				/>
			</Box>

			<MidelForm
				TotalCount={list?.serviceRequest_getAll?.result?.totalCount || 0}
				DataRow={list?.serviceRequest_getAll?.result?.items || []}
				OnsetRowsPerPage={(rows, page) => {
					setRowsPerPage(rows);
					setPage(page);
				}}
				Onhandlesort={handleSort}
			/>
		</>
	);
};

export default ServiceRequestPage;
