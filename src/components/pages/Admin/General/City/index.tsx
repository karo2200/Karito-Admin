import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCity_GetAllQuery } from 'src/graphql/generated';

import COLORS from '@/theme/colors';

import CreateCity from './CreateCity';
import MidelForm from './MidelForm';

const Index = () => {
	const [load, setLoad] = useState(0);
	const [SearchData, setSearchData] = useState('');
	const {
		data: CityList,
		isSuccess,
		isError,
	} = useCity_GetAllQuery(
		{
			take: 1000,
			skip: 0,
			where: SearchData
				? {
						province: { id: { eq: SearchData } },
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

	useEffect(() => {
		setLoad(1);
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
					backgroundColor: COLORS.grey3,
					border: '1px solid #c1c1c1a8',
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
