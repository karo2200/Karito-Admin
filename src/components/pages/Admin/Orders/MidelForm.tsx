import React, { FC, useState } from 'react';

import ModalS from './ModalShow';
import TableForm from './TableForm';
import { IPageProps } from './type-page';

const MidelForm: FC<IPageProps> = ({ DataRow, OnsetRowsPerPage, TotalCount, Onhandlesort }) => {
	const [openModal, setOpenModal] = useState(false);
	const [dataShow, setDataShow] = useState<any>(null);

	return (
		<>
			<TableForm
				rows={DataRow}
				OnsetRowsPerPage={OnsetRowsPerPage}
				OnhandleShow={(data) => {
					setDataShow(data);
					setOpenModal(true);
				}}
				TotalCount={TotalCount}
				Onhandlesort={Onhandlesort}
			/>

			<ModalS data={dataShow} open={openModal} handleClose={() => setOpenModal(false)} />
		</>
	);
};

export default MidelForm;
