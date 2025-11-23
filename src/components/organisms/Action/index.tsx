import ArticleIcon from '@mui/icons-material/Article';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Menu } from '@mui/material';
import React, { FC } from 'react';

import * as S from './action.style';

const Action: FC<{
	OnhandleListDocument?(): void;
	OnhandleShow?(): void;
	OnhandleOTP?(): void;
}> = ({ OnhandleShow, OnhandleListDocument, OnhandleOTP }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const isListDocument = typeof OnhandleListDocument === 'function',
		isShow = typeof OnhandleShow === 'function',
		isOTP = typeof OnhandleOTP === 'function';

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? 'long-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>

			<Menu
				id="long-menu"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: '200px',
						width: '22ch',
					},
				}}
			>
				{isListDocument && (
					<S.MenuItem
						onClick={() => {
							OnhandleListDocument();
							handleClose();
						}}
					>
						<ArticleIcon /> <span style={{ marginLeft: '10px' }}>داکیومنت </span>
					</S.MenuItem>
				)}

				{isShow && (
					<S.MenuItem
						onClick={() => {
							OnhandleShow();
							handleClose();
						}}
					>
						<VisibilityIcon />
						<span style={{ marginLeft: '10px' }}>نمایش جزئیات</span>
					</S.MenuItem>
				)}

				{isOTP && (
					<S.MenuItem
						onClick={() => {
							OnhandleOTP();
							handleClose();
						}}
					>
						<PermPhoneMsgIcon /> <span style={{ marginLeft: '10px' }}>OTP</span>
					</S.MenuItem>
				)}
			</Menu>
		</div>
	);
};

export default Action;
