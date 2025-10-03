import dynamic from 'next/dynamic';
import React, { FC, useState } from 'react';

import Modal from '@/components/organisms/ModalBaner';
import ModalCorsoule from '@/components/organisms/ModalCorsoule';

import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, OnhandleEditClick, onRefreshItem }) => {
	const [open, setOpen] = useState(false);
	const [openMap, setopenMap] = useState(false);
	const [openCrsoule, setopenCrsoule] = useState(false);
	const ModalMap = dynamic(() => import('@/components/organisms/ModalLatlong'), { ssr: false });

	const [Name, setName] = useState('');
	const [Id, setId] = useState('');
	const [Map, setMap] = useState('');
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
				OnhandleMap={(data) => {
					setMap(data);
					setopenMap(true);
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
			<ModalMap
				disabled={true}
				lat={Map}
				open={openMap}
				handleClose={() => {
					setopenMap(false);
				}}
			></ModalMap>
		</>
	);
};

export default Index;
