import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDiscountCode_GetAllQuery } from 'src/graphql/generated';

import Create from './Create';
import MidelForm from './MidelForm';

const Index = () => {
	const router = useRouter();
	const { customerName, customerId } = router.query;

	const [load, setLoad] = useState(0);
	const {
		data: CityList,
		isSuccess,
		isError,
	} = useDiscountCode_GetAllQuery(
		{
			take: 1000,
			skip: 0,
			where: customerId
				? {
						customerDto: { id: { eq: customerId } },
				  }
				: undefined,
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
	const [selectedRow, setSelectedRow] = useState(null);
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
				<Create
					onRefreshItem={() => {
						setLoad(1);
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
					setLoad(1);
				}}
			/>
		</>
	);
};

export default Index;
