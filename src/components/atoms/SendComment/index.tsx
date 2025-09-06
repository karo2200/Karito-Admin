import { Avatar } from '@mui/material';
import React, { FC, useRef } from 'react';
import InputComment from 'src/components/atoms/InputComment';

import * as S from './styles';
export interface ITablePageProps {
	onhandelComment?(Comment: string): void;
}
const Index: FC<ITablePageProps> = ({ onhandelComment }) => {
	const inputRef = useRef<HTMLInputElement>();

	return (
		<>
			<S.row sx={{ margin: '30px 0' }}>
				<S.cell sx={{ flexGrow: 0, flexShrink: 0, flexBasis: 40 }}>
					<Avatar src="/images/user2.png" />
				</S.cell>
				<S.cell>
					<InputComment
						inputRef={inputRef as any}
						onChange={(value: any) => {
							if (typeof onhandelComment !== 'function') return;
							onhandelComment(value);
						}}
					/>
				</S.cell>
			</S.row>
		</>
	);
};

export default Index;
