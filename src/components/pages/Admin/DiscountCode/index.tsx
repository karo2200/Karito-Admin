import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDiscountCode_GetAllQuery } from 'src/graphql/generated';

import COLORS from '@/theme/colors';

import Create from './Create';
import MidelForm from './MidelForm';

const Index = () => {
	const router = useRouter();
	const [load, setLoad] = useState(false);
	const { customerId, customerName } = router.query;

	const [customerIds, setCustomerIds] = useState<string | undefined>(undefined);

	// وقتی router.query آماده شد، مقداردهی کنیم
	useEffect(() => {
		if (router.isReady) {
			if (typeof customerId === 'string') setCustomerIds(customerId);
			setLoad(true);
		}
	}, [router.isReady]);

	const {
		data: CityList,
		isSuccess,
		isError,
	} = useDiscountCode_GetAllQuery(
		{
			take: 1000,
			skip: 0,
			where: customerIds
				? {
						customer: { id: { eq: customerIds } },
				  }
				: undefined,
		},
		{
			enabled: load && !!customerId,
			keepPreviousData: true,
		}
	);

	const [selectedRow, setSelectedRow] = useState(null);

	useEffect(() => {
		if (load && (isSuccess || isError)) {
			setLoad(false);
		}
	}, [load, isSuccess, isError]);

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
				<Create
					onRefreshItem={() => {
						setLoad(true);
						setSelectedRow(null);
					}}
					customerName={customerName}
					customerId={customerId}
				/>
			</Box>
			<MidelForm
				DataRow={CityList?.discountCode_getAll?.result?.items}
				OnhandleEditClick={(data) => {
					setSelectedRow(data);
				}}
				onRefreshItem={() => {
					setLoad(true);
				}}
			/>
		</>
	);
};

export default Index;
