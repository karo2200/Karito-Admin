import React, { FC, useState } from 'react';

import Modal from '@/components/organisms/ModalBaner';
import ModalCorsoule from '@/components/organisms/ModalCorsoule';

import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, OnhandleEditClick, onRefreshItem }) => {
	const [open, setOpen] = useState(false);
	const [openCrsoule, setopenCrsoule] = useState(false);

	const [Name, setName] = useState('');
	const [Id, setId] = useState('');

	return (
		<>
			<TableForm
				rows={DataRow}
				OnhandleEditClick={(data) => {
					OnhandleEditClick(data);
				}}
				OnhandleBaner={(data) => {
					setName(data?.name);
					setId(data?.id);
					setOpen(true);
				}}
				OnhandleCursel={(data) => {
					setName(data?.name);
					setId(data?.id);
					setopenCrsoule(true);
				}}
				onRefreshItem={() => {
					onRefreshItem();
				}}
			/>
			<Modal
				open={open}
				name={Name}
				cityId={Id}
				handleClose={() => {
					setOpen(false);
					onRefreshItem();
				}}
				handleReject={() => setOpen(false)}
			></Modal>
			<ModalCorsoule
				open={openCrsoule}
				name={Name}
				cityId={Id}
				handleClose={() => {
					setopenCrsoule(false);
					onRefreshItem();
				}}
				handleReject={() => setopenCrsoule(false)}
			></ModalCorsoule>
		</>
	);
};

export default Index;
