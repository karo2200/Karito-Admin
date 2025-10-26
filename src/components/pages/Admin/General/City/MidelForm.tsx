import dynamic from 'next/dynamic';
import { useSnackbar } from 'notistack';
import React, { FC, useState } from 'react';
import { useCity_UpdateBoundaryMutation } from 'src/graphql/generated';

import Modal from '@/components/organisms/ModalBaner';
import ModalCorsoule from '@/components/organisms/ModalCorsoule';

import TableForm from './TableForm';
import { IPageProps } from './type-page';
const Index: FC<IPageProps> = ({ DataRow, OnhandleEditClick, onRefreshItem }) => {
	const { enqueueSnackbar } = useSnackbar();

	const [open, setOpen] = useState(false);
	const [openMap, setopenMap] = useState(false);
	const [openCrsoule, setopenCrsoule] = useState(false);
	const ModalMap = dynamic(() => import('@/components/organisms/ModalLatlong'), { ssr: false });
	const { mutate: mutateCity, isLoading: isLoading } = useCity_UpdateBoundaryMutation();

	const [Name, setName] = useState('');
	const [Id, setId] = useState('');
	const [Map, setMap] = useState('');

	const SaveLatLong = async (wkt) => {
		await mutateCity(
			{
				input: {
					cityId: Id,
					newWktBoundary: wkt,
				},
			},
			{
				onSuccess: async (res) => {
					if (res?.city_updateBoundary?.status?.code == 0) {
						const errorMessage = res?.city_updateBoundary?.status?.message || 'خطایی رخ داده است';
						enqueueSnackbar(errorMessage, { variant: 'error' });
					}

					onRefreshItem();
				},
				onError: (err) => {
					enqueueSnackbar('محدوده انتخابی نادرست است', { variant: 'error' });
				},
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
					setMap(data?.boundary);
					setId(data?.id);
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
				disabled={false}
				lat={Map}
				open={openMap}
				handleClose={() => {
					setopenMap(false);
				}}
				handleConfirm={(wkt) => {
					SaveLatLong(wkt);
					setOpen(false);
				}}
			></ModalMap>
		</>
	);
};

export default Index;
