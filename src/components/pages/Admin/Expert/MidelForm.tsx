import React, { FC, useState } from 'react';
import {
	UserType,
	useSpecialist_VerifyIdCardMutation,
	useSpecialist_VerifyIdentityVerificationVideoMutation,
	useSpecialist_VerifySpecializedDocumentsMutation,
	VerificationStatus,
} from 'src/graphql/generated';

import Modal from '@/components/organisms/ModalAccsept';
import ModalD from '@/components/organisms/ModalDocuments';
import ModalOTP from '@/components/organisms/ModalOTP';

import ModalS from './ModalShow';
import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, OnsetRowsPerPage, TotalCount }) => {
	const [open, setOpen] = useState(false);
	const [openD, setOpenD] = useState(false);
	const [openS, setOpenS] = useState(false);
	const [openOTP, setOpenOTP] = useState(false);
	const [Mobil, setMobil] = useState('');
	const [name, setname] = useState('');
	const [dataShow, setdataShow] = useState(null);
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
				OnhandleShow={(data) => {
					setdataShow(data);
					setOpenS(true);
				}}
				OnsetRowsPerPage={(row, page) => {
					OnsetRowsPerPage(row, page);
				}}
				OnhandleOTP={(row) => {
					setMobil(row?.phoneNumber);
					setname(row?.firstName + ' ' + row?.lastName);
					setOpenOTP(true);
				}}
			/>
			<ModalOTP
				open={openOTP}
				name={name}
				Mobil={Mobil}
				TypeUser={UserType.Specialist}
				handleClose={() => {
					setOpenOTP(false);
					//onRefreshItem();
				}}
			></ModalOTP>
			<Modal
				open={open}
				name={name}
				handleClose={() => setOpen(false)}
				handleConfirm={() => handleConfirm(1)}
				handleReject={() => handleConfirm(0)}
			></Modal>
			<ModalD data={List} open={openD} name={name} handleClose={() => setOpenD(false)}></ModalD>
			<ModalS data={List} open={openS} data={dataShow} handleClose={() => setOpenS(false)}></ModalS>
		</>
	);
};

export default Index;
