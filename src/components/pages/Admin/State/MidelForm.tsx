import React, { FC, useState } from 'react';
import { useProvince_DeleteMutation } from 'src/graphql/generated';

//import COLORS from '@/theme/colors';
import Modal from '@/components/organisms/Modal';

import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, OnhandleEditClick, onRefreshItem }) => {
	const [open, setOpen] = useState(false);
	const [name, setname] = useState(false);
	const [idstate, setidstate] = useState(false);
	const { mutate: mutateState, isLoading: isLoading } = useProvince_DeleteMutation();

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
					setname(data.name);
					setidstate(data.id);
					setOpen(true);
				}}
			/>
			<Modal open={open} name={name} handleClose={() => setOpen(false)} handleConfirm={() => handleConfirm()}></Modal>
		</>
	);
};

export default Index;
