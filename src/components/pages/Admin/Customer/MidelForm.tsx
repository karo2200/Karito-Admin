import React, { FC, useState } from 'react';
import { UserType } from 'src/graphql/generated';

import Modal from '@/components/organisms/ModalOTP';

import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, Onhandlesort, OnsetRowsPerPage, TotalCount, onRefreshItem }) => {
	const [open, setOpen] = useState(false);
	const [Name, setName] = useState('');
	const [Mobil, setMobil] = useState('');
	return (
		<>
			<TableForm
				rows={DataRow}
				OnsetRowsPerPage={(row, page) => {
					OnsetRowsPerPage(row, page);
				}}
				onRefreshItem={() => {
					onRefreshItem();
				}}
				TotalCount={TotalCount}
				OnhandleOTP={(row) => {
					setMobil(row?.phoneNumber);
					setName(row?.firstName + ' ' + row?.lastName);
					setOpen(true);
				}}
				Onhandlesort={Onhandlesort}
			/>
			<Modal
				open={open}
				name={Name}
				Mobil={Mobil}
				TypeUser={UserType.Customer}
				handleClose={() => {
					setOpen(false);
					//onRefreshItem();
				}}
			></Modal>
		</>
	);
};

export default Index;
