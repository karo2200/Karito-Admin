import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useServiceTypeQuestion_GetByServiceTypeQuery } from 'src/graphql/generated';

import CreateCity from './Create';
import MidelForm from './MidelForm';
const Index = () => {
	const [selectedRow, setSelectedRow] = useState(null);
	const [load, setLoad] = useState(0);
	const [SearchData, setSearchData] = useState('');
	const [openModal, setopenModal] = useState(false);
	const {
		data: CategoryList,
		isFetching,
		isSuccess,
		isError,
		error,
	} = useServiceTypeQuestion_GetByServiceTypeQuery(
		{
			take: 1000,
			skip: 0,
			input: { serviceTypeId: SearchData },
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
					}}
					DataRow={selectedRow}
					onSearchItem={(data) => {
						setSearchData(data);
					}}
					openModal={openModal}
				/>
			</Box>
			<MidelForm
				onRefreshItem={() => {
					setLoad(1);
				}}
				DataRow={CategoryList?.serviceTypeQuestion_getByServiceType?.result?.items}
				OnhandleEditClick={(data) => {
					setSelectedRow(data);
					setopenModal(false);
					setTimeout(() => setopenModal(true), 0);
				}}
			/>
		</>
	);
};

export default Index;
