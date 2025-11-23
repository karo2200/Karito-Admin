import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCity_GetAvailableServiceTypesQuery } from 'src/graphql/generated';

import CreateCity from './Create';
import MidelForm from './MidelForm';
const Index = () => {
	const [selectedRow, setSelectedRow] = useState(null);
	const [cityId, setcityId] = useState('');
	const [load, setLoad] = useState(1);
	const {
		data: BanerList,
		isSuccess,
		isError,
		error,
	} = useCity_GetAvailableServiceTypesQuery(
		{
			skip: 0,
			take: 10000,
			input: {
				cityId: cityId,
			},
		},
		{
			keepPreviousData: true,
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
						setSelectedRow(null);
					}}
					onSearchItem={(cityId) => {
						setcityId(cityId);
					}}
					DataRow={selectedRow}
				/>
			</Box>
			<MidelForm
				onRefreshItem={() => {
					setLoad(1);
				}}
				DataRow={BanerList?.city_getAvailableServiceTypes?.result?.items}
				OnhandleEditClick={(data) => {
					setSelectedRow(data);
				}}
			/>
		</>
	);
};

export default Index;
