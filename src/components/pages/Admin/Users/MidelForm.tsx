import React, { FC } from 'react';

//import COLORS from '@/theme/colors';
import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, OnhandleEditClick, onRefreshItem }) => {
	return (
		<>
			<TableForm
				rows={DataRow}
				onRefreshItem={() => {
					onRefreshItem();
				}}
			/>
		</>
	);
};

export default Index;
