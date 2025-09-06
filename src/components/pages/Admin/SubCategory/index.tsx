import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useServiceSubCategory_GetAllQuery } from 'src/graphql/generated';

import CreateCity from './Create';
import MidelForm from './MidelForm';
const rows = [{ name: 'خدمات' }, { name: 'بهداشت' }];
const Index = () => {
	const [selectedRow, setSelectedRow] = useState(null);
	const [load, setLoad] = useState(1);
	const [SearchData, setSearchData] = useState('');

	const {
		data: CategoryList,
		isFetching,
		isSuccess,
		isError,
		error,
	} = useServiceSubCategory_GetAllQuery(
		{
			take: 1000,
			skip: 0,
			where: {
				serviceCategory: { id: { eq: SearchData } },
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
				<CreateCity
					onRefreshItem={() => {
						setLoad(1);
					}}
					DataRow={selectedRow}
					onSearchItem={(data) => {
						setSearchData(data);
						setLoad(1);
					}}
				/>
			</Box>
			<MidelForm
				onRefreshItem={() => {
					setLoad(1);
				}}
				DataRow={CategoryList?.serviceSubCategory_getAll?.result?.items}
				OnhandleEditClick={(data) => {
					setSelectedRow(data);
				}}
			/>
		</>
	);
};

export default Index;
