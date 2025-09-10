import { TablePagination } from '@mui/material';
import React, { FC } from 'react';

import { IPageProps } from './type-page';
const index: FC<IPageProps> = ({ rowsPerPage, page, Len, OnchangePage, OnsetRowsPerPage }) => {
	return (
		<>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={Len}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={(event, newPage) => OnchangePage(newPage)}
				onRowsPerPageChange={(event) => {
					OnsetRowsPerPage(parseInt(event.target.value, 10));
					OnchangePage(0);
				}}
				labelRowsPerPage={10}
				sx={{
					'.MuiTablePagination-toolbar': {
						bgcolor: '#cdd3e28f', // soft blue background
						borderRadius: '0 0 8px 8px',
						minHeight: '50px',
						padding: '0 16px',
						gap: 1,
						color: '#333 !important',
						fontWeight: '600',
						fontSize: '14px',
					},
					'.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
						color: '#555 !important',
					},
					'.MuiButtonBase-root-MuiMenuItem-root-MuiTablePagination-menuItem.Mui-selected': { color: '#555 !important' },
					'.MuiButtonBase-root': { color: '#555 !important' },
					'.MuiTablePagination-select': {
						borderRadius: '6px',
						bgcolor: 'white',
						boxShadow: '0 0 6px rgba(0,0,0,0.1)',
						padding: '5px 12px',
						fontWeight: '500',
						color: '#555 !important',
					},

					'.MuiSelect-icon': {
						color: '#030202ff !important',
					},
					'.MuiTablePagination-actions > button': {
						color: '#1976d2 !important', // MUI primary blue
						'&:hover': {
							bgcolor: '#e3f2fd',
							borderRadius: '50%',
						},
					},
				}}
			/>
		</>
	);
};

export default index;
