import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useCarousel_GetAllQuery } from 'src/graphql/generated';

import CreateCity from './Create';
import MidelForm from './MidelForm';
const rows = [{ name: 'خدمات' }, { name: 'بهداشت' }];
const Index = () => {
	const [selectedRow, setSelectedRow] = useState(null);
	const [load, setLoad] = useState(1);
	const router = useRouter();
	const {
		data: BanerList,
		isSuccess,
		isError,
		error,
	} = useCarousel_GetAllQuery(
		{
			skip: 0,
			take: 10000,
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
				<CreateCity
					onRefreshItem={() => {
						setLoad(1);
					}}
					DataRow={selectedRow}
				/>
			</Box>
			<MidelForm
				onRefreshItem={() => {
					setLoad(1);
				}}
				DataRow={BanerList?.carousel_getAll?.result?.items}
				OnhandleEditClick={(data) => {
					setSelectedRow(data);
				}}
			/>
		</>
	);
};

export default Index;
