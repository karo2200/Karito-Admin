import React, { FC, useState } from 'react';

import * as S from './@types';
import { ISearchInputPageProps } from './types';
export interface ITablePageProps {
	onhandelclike?(startDate: string, endDate: string): void;
}
const SearchInputPage: FC<ISearchInputPageProps> = ({ isActiveback, isActive, isAdmin, onChange, ...props }, ref) => {
	const [value, setValue] = useState<string>('');

	return (
		<S.GridItem>
			<S.SearchInputPageWrapper
				value={value}
				onKeyUp={() => {
					onChange(value);
				}}
				onChange={(event) => {
					setValue(event.target.value);
				}}
				placeholder="Add Comment"
				id="searchid"
				variant="outlined"
				inputRef={ref}
				InputProps={{
					style: {
						height: '45px',
						borderRadius: 32,
						textAlign: 'center',
						boxShadow: '-3px -3px 15px 0px #E8E8E8, 4px 4px 18px 0px rgba(0, 0, 0, 0.25)',
						margin: '0 auto',
						width: '100%',
						border: '0px none !important',
						color: '#AEAFBD',
						fontSize: 14,
					},
				}}
				{...props}
			/>
		</S.GridItem>
	);
};

export default SearchInputPage;
