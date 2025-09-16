import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCity_GetAllQuery } from 'src/graphql/generated';

import CreateCity from './CreateCity';
import MidelForm from './MidelForm';

const Index = () => {
	const [load, setLoad] = useState(0);
	const [SearchData, setSearchData] = useState('');
	const {
		data: CityList,
		isFetching,
		isSuccess,
		isError,
		error,
	} = useCity_GetAllQuery(
		{
			take: 1000,
			skip: 0,
			where: {
				province: { id: { eq: SearchData } },
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
	const [selectedRow, setSelectedRow] = useState(null);

	useEffect(() => {
		if (SearchData != '' && SearchData != null) {
			setLoad(1);
		}
	}, [SearchData]);
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
						setSelectedRow(null);
					}}
					DataRow={selectedRow}
					onSearchItem={(data) => {
						setSearchData(data);
					}}
				/>
			</Box>
			<MidelForm
				DataRow={CityList?.city_getAll?.result?.items}
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
