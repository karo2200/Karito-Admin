import React, { FC, useState } from 'react';
import { useDiscountCode_DeleteMutation } from 'src/graphql/generated';

import Modal from '@/components/organisms/Modal';

import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, onRefreshItem }) => {
	const [open, setOpen] = useState(false);
	const [name, setname] = useState(false);
	const [Id, setId] = useState('');
	const { mutate: mutateState, isLoading: isLoading } = useDiscountCode_DeleteMutation();

	const handleConfirm = async () => {
		await mutateState(
			{
				input: {
					id: Id,
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
				onRefreshItem={() => {
					onRefreshItem();
				}}
				OnhandleDeleteClick={(data) => {
					setname(data.name);
					setId(data.id);
					setOpen(true);
				}}
			/>
			<Modal open={open} name={name} handleClose={() => setOpen(false)} handleConfirm={() => handleConfirm()}></Modal>
		</>
	);
};

export default Index;
