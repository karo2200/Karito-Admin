import { AllHTMLAttributes, FC } from 'react';
import UserIcon from 'src/assets/User';

import * as S from './styles';
export interface ITablePageProps {
	text: string;
}
const AddButton: FC<AllHTMLAttributes<HTMLButtonElement>> = ({ text }) => {
	return (
		<S.AddButton variant="contained">
			<S.AddButtonIconWrapper>
				<UserIcon />
			</S.AddButtonIconWrapper>

			{text}
		</S.AddButton>
	);
};

export default AddButton;
