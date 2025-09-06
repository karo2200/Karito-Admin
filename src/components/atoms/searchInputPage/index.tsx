import ClearIcon from '@mui/icons-material/Clear';
import { InputAdornment } from '@mui/material';
import React, { FC, useState } from 'react';
import SearchIcon from 'src/assets/Search';

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
				placeholder="Search"
				id="searchid"
				variant="outlined"
				inputRef={ref}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{value ? (
								<div
									style={{ cursor: 'pointer', marginTop: 5, color: '#dc362e' }}
									onClick={() => {
										setValue('');
										onChange('');
									}}
								>
									<ClearIcon />
								</div>
							) : (
								<S.CircleSerch>
									<SearchIcon />
								</S.CircleSerch>
							)}
						</InputAdornment>
					),

					style: {
						height: '50px',
						borderRadius: 32,
						textAlign: 'center',
						boxShadow: '-2px -2px 2px 0px #FFF, 2px 1px 2px 0px #ABABAB',
						margin: '0 auto',
						width: '100%',
						border: '0px none !important',
					},
				}}
				{...props}
			/>
		</S.GridItem>
	);
};

export default SearchInputPage;
