import React, { FC, useState } from 'react';
import { useNeighborhood_DeleteMutation } from 'src/graphql/generated';

import Modal from '@/components/organisms/Modal';

import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, OnhandleEditClick, onRefreshItem }) => {
	const [open, setOpen] = useState(false);
	const [name, setname] = useState(false);
	const [idNeiborhood, setidNeiborhood] = useState(false);
	const { mutate: mutateState, isLoading: isLoading } = useNeighborhood_DeleteMutation();

	const handleConfirm = async () => {
		await mutateState(
			{
				input: {
					neighborhoodId: idNeiborhood,
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
					setname(data.name);
					setidNeiborhood(data.id);
					setOpen(true);
				}}
			/>
			<Modal open={open} name={name} handleClose={() => setOpen(false)} handleConfirm={() => handleConfirm()}></Modal>
		</>
	);
};

export default Index;
