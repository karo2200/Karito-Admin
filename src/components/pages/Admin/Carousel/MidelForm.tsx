import React, { FC, useState } from 'react';
import { useCarousel_DeleteMutation } from 'src/graphql/generated';

import Modal from '@/components/organisms/Modal';
import ModalD from '@/components/organisms/ModalDocuments';

import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, OnhandleEditClick, onRefreshItem }) => {
	const [open, setOpen] = useState(false);
	const [openD, setOpenD] = useState(false);
	const [name, setname] = useState('');
	const [List, setList] = useState([]);
	const [idstate, setidstate] = useState(false);
	const { mutate: mutateState, isLoading: isLoading } = useCarousel_DeleteMutation();

	const handleConfirm = async () => {
		await mutateState(
			{
				input: {
					id: idstate,
				},
			},
			{
				onSuccess: async (res) => {
					onRefreshItem();
					setOpen(false);
				},
				onError: (err) => {},
			}
		);
	};
	return (
		<>
			<TableForm
				rows={DataRow}
				OnhandleEditClick={(data) => {
					OnhandleEditClick(data);
				}}
				OnhandleDeleteClick={(data) => {
					setname(data.title);
					setidstate(data.id);
					setOpen(true);
				}}
				OnhandleListDocument={(data) => {
					setname(data.lastName);
					setList(data.imageUrls);
					setOpenD(true);
				}}
			/>
			<ModalD data={List} open={openD} name={name} handleClose={() => setOpenD(false)}></ModalD>
			<Modal open={open} name={name} handleClose={() => setOpen(false)} handleConfirm={() => handleConfirm()}></Modal>
		</>
	);
};

export default Index;
