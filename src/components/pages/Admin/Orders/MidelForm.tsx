import React, { FC, useState } from 'react';

import ModalS from './ModalShow';
import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, OnsetRowsPerPage, TotalCount, Onhandlesort }) => {
	const [openS, setOpenS] = useState(false);
	const [dataShow, setdataShow] = useState(null);
	const [List, setList] = useState([]);

	return (
		<>
			<TableForm
				rows={DataRow}
				OnsetRowsPerPage={(row, page) => {
					OnsetRowsPerPage(row, page);
				}}
				OnhandleShow={(data) => {
					setdataShow(data);
					setOpenS(true);
				}}
				TotalCount={TotalCount}
				Onhandlesort={(data) => {
					Onhandlesort(data);
				}}
			/>

			<ModalS data={List} open={openS} data={dataShow} handleClose={() => setOpenS(false)}></ModalS>
		</>
	);
};

export default Index;
