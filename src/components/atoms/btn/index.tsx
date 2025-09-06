import React, { FC } from 'react';

import * as S from './styles';

export interface ITablePageProps {
	colorbtn: string;
	backgroundColor: string;
	text: string;
	widthbt: number;
}

const AddButton: FC<ITablePageProps> = ({ colorbtn, backgroundColor, text, widthbt }) => {
	return (
		<S.AddButton
			widthbt={widthbt}
			backgroundColor={backgroundColor || '#fff'}
			colorbtn={colorbtn || '#000'}
			variant="contained"
		>
			{text}
		</S.AddButton>
	);
};

export default AddButton;
