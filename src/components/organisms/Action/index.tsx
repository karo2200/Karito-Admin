import AdUnitsRoundedIcon from '@mui/icons-material/AdUnitsRounded';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import DiscountIcon from '@mui/icons-material/Discount';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Menu } from '@mui/material';
import React, { FC } from 'react';

import * as S from './action.style';

const Action: FC<{
	OnhandleListDocument?(): void;
	OnhandleShow?(): void;
	OnhandleOTP?(): void;
	OnhandelDiscount?(): void;
	OnhandleMap?(): void;
	OnhandleBanner?(): void;
	OnhandleEdit?(): void;
	OnhandelCurser?(): void;
	OnhandelDelete?(): void;
}> = ({
	OnhandleShow,
	OnhandleListDocument,
	OnhandleOTP,
	OnhandelDiscount,
	OnhandleMap,
	OnhandleBanner,
	OnhandleEdit,
	OnhandelCurser,
	OnhandelDelete,
}) => {
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
		isDiscount = typeof OnhandelDiscount === 'function',
		isMap = typeof OnhandleMap === 'function',
		isBanner = typeof OnhandleBanner === 'function',
		isEdit = typeof OnhandleEdit === 'function',
		isCurser = typeof OnhandelCurser === 'function',
		isDelete = typeof OnhandelDelete === 'function',
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
						maxHeight: '500px',
						width: '200px',
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
				{isDiscount && (
					<S.MenuItem
						onClick={() => {
							OnhandelDiscount();
							handleClose();
						}}
					>
						<DiscountIcon /> <span style={{ marginLeft: '10px' }}>تخفیف</span>
					</S.MenuItem>
				)}
				{isEdit && (
					<S.MenuItem
						onClick={() => {
							OnhandleEdit();
							handleClose();
						}}
					>
						<EditIcon /> <span style={{ marginLeft: '10px' }}>ویرایش</span>
					</S.MenuItem>
				)}
				{isMap && (
					<S.MenuItem
						onClick={() => {
							OnhandleMap();
							handleClose();
						}}
					>
						<LocationOnIcon /> <span style={{ marginLeft: '10px' }}>نقشه</span>
					</S.MenuItem>
				)}
				{isCurser && (
					<S.MenuItem
						onClick={() => {
							OnhandelCurser();
							handleClose();
						}}
					>
						<ViewCarouselIcon /> <span style={{ marginLeft: '10px' }}>تصاویر چرخشی</span>
					</S.MenuItem>
				)}
				{isBanner && (
					<S.MenuItem
						onClick={() => {
							OnhandleBanner();
							handleClose();
						}}
					>
						<AdUnitsRoundedIcon /> <span style={{ marginLeft: '10px' }}>بنر</span>
					</S.MenuItem>
				)}
				{isDelete && (
					<S.MenuItem
						onClick={() => {
							OnhandelDelete();
							handleClose();
						}}
					>
						<DeleteIcon sx={{ color: 'red' }} /> <span style={{ marginLeft: '10px', color: 'red' }}>حذف</span>
					</S.MenuItem>
				)}
			</Menu>
		</div>
	);
};

export default Action;
