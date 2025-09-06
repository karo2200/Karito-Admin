import React, { FC, useState } from 'react';
import {
	useSpecialist_VerifyIdCardMutation,
	useSpecialist_VerifyIdentityVerificationVideoMutation,
	useSpecialist_VerifySpecializedDocumentsMutation,
	VerificationStatus,
} from 'src/graphql/generated';

import Modal from '@/components/organisms/ModalAccsept';
import ModalD from '@/components/organisms/ModalDocuments';

import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, onRefreshItem }) => {
	const [open, setOpen] = useState(false);
	const [openD, setOpenD] = useState(false);
	const [name, setname] = useState('');
	const [List, setList] = useState([]);
	const [id, setid] = useState(0);
	const [FormType, setFormType] = useState(0);
	const { mutate: mutateState, isLoading: isLoading } = useSpecialist_VerifyIdCardMutation();
	const { mutate: mutatevideo, isLoading: isLoadingvideo } = useSpecialist_VerifyIdentityVerificationVideoMutation();
	const { mutate: mutateDocumment, isLoading: isLoadingDoucument } = useSpecialist_VerifySpecializedDocumentsMutation();
	const handleConfirm = async (Confirm) => {
		if (FormType === 0) {
			await mutateState(
				{
					input: {
						specialistId: id.toString(),
						status: Confirm === 1 ? VerificationStatus.Approved : VerificationStatus.Rejected,
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
		} else if (FormType === 1) {
			await mutatevideo(
				{
					input: {
						specialistId: id.toString(),
						status: Confirm === 1 ? VerificationStatus.Approved : VerificationStatus.Rejected,
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
		} else if (FormType === 2) {
			await mutateDocumment(
				{
					input: {
						specialistId: id.toString(),
						status: Confirm === 1 ? VerificationStatus.Approved : VerificationStatus.Rejected,
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
		}
	};
	return (
		<>
			<TableForm
				rows={DataRow}
				OnhandleEditClick={(data) => {
					setname(data.lastName);
					setid(data.id);
					setOpen(true);
					setFormType(0);
				}}
				OnhandleVideo={(data) => {
					setname(data.lastName);
					setid(data.id);
					setOpen(true);
					setFormType(1);
				}}
				OnhandleDocument={(data) => {
					setname(data.lastName);
					setid(data.id);
					setOpen(true);
					setFormType(2);
				}}
				OnhandleListDocument={(data) => {
					setname(data.lastName);
					setList(data.specializedDocumentUrls);
					setOpenD(true);
				}}
			/>
			<Modal
				open={open}
				name={name}
				handleClose={() => setOpen(false)}
				handleConfirm={() => handleConfirm(1)}
				handleReject={() => handleConfirm(0)}
			></Modal>
			<ModalD data={List} open={openD} name={name} handleClose={() => setOpenD(false)}></ModalD>
		</>
	);
};

export default Index;
