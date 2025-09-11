import React, { FC, useState } from 'react';

import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, OnsetRowsPerPage, TotalCount }) => {
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
				TotalCount={TotalCount}
			/>
		</>
	);
};

export default Index;
