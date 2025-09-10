import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
//import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAuth } from '@/providers/AuthProvider';
import COLORS from '@/theme/colors';

import CellIcon from '../../../assets/menu/cell';
import CellwIcon from '../../../assets/menu/cell.w';
import ChartIcon from '../../../assets/menu/chart';
import ChartwIcon from '../../../assets/menu/chart.w';
import MoneyIcon from '../../../assets/menu/money';
import MoneywIcon from '../../../assets/menu/money.w';
import * as S from '../styles';
const menuItems = [
	{
		text: 'داشبورد',
		Icon: ChartIcon,
		iconW: ChartwIcon,
		link: '/Admin',
	},
	{
		text: 'اطلاعات پایه',
		Icon: ChartIcon,
		iconW: ChartwIcon,
		link: '#',
		subMenu: [
			{ text: '  استان', link: '/Admin/State' },
			{ text: '  شهر', link: '/Admin/City' },
			{ text: '  محله', link: '/Admin/Neighborhood' },
			{ text: '  بنر', link: '/Admin/Baner' },
			{ text: '  منوی یک', link: '/Admin/Category' },
			{ text: '  منوی دو', link: '/Admin/SubCategory' },
			{ text: '  منوی سه', link: '/Admin/SubSubCategory' },
			{ text: 'تصاویر چرخشی', link: '/Admin/Carousel' },
		],
	},
	{
		text: 'متخصصان',
		Icon: MoneyIcon,
		iconW: MoneywIcon,
		link: '/Admin/Expert',
	},
	/*{
		text: 'کاربران',
		Icon: BuyerIcon,
		iconW: BuyerwIcon,
		link: '/buyer',
	},*/
	{
		text: 'سفارشات',
		Icon: CellIcon,
		iconW: CellwIcon,
		link: '/Admin/Orders',
	},
];
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect, useState } from 'react';

const AdminDrawer = ({ toggleCollapse }) => {
	const router = useRouter();
	const { logout } = useAuth();
	const { pathname } = useRouter();
	const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

	const isMobile = useMediaQuery('(max-width:600px)');

	// State for mobile drawer open/close
	const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);

	// State for desktop drawer collapse/expand
	const [isCollapsed, setIsCollapsed] = useState(false);
	const toggleSubmenu = (text: string) => {
		setOpenSubmenus((prev) => ({
			...prev,
			[text]: !prev[text],
		}));
	};

	// Close mobile drawer on route change (optional)
	useEffect(() => {
		setIsActiveMobileMenu(false);
	}, [pathname]);

	const toggleMobileDrawer = () => {
		setIsActiveMobileMenu((prev) => !prev);
	};

	const toggleCollaps = () => {
		toggleCollapse(!isCollapsed);
		setIsCollapsed((prev) => !prev);
	};

	const onLogoutClick = () => {
		logout();
	};

	const onhandelmenu = (link: string) => {
		router.push(link);
	};

	return (
		<>
			{/* Mobile hamburger button */}
			{isMobile && (
				<Box
					sx={{
						position: 'fixed',
						top: 0,
						right: 0,
						zIndex: 10,
						backgroundColor: 'white',
						borderRadius: '8px',
						boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
						cursor: 'pointer',
						padding: '8px',
					}}
					onClick={toggleMobileDrawer}
				>
					{isActiveMobileMenu ? <CloseIcon /> : <MenuIcon />}
				</Box>
			)}

			{/* Desktop collapse toggle button */}

			<S.Mainnav
				isActiveMobileMenu={isMobile ? isActiveMobileMenu : true} // always open on desktop
				sx={{
					width: isCollapsed ? 60 : 260, // shrink width when collapsed
					transition: 'width 0.3s',
					overflowX: 'hidden',
				}}
			>
				{/* Header: show logo and text only when expanded */}
				<Box
					marginBottom="50px"
					paddingTop="16px"
					paddingRight="16px"
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					sx={{ px: isCollapsed ? 1 : 3, cursor: 'pointer' }}
					onClick={toggleCollaps}
				>
					{!isCollapsed && (
						<>
							<Typography fontSize={36} color={COLORS.blue3} sx={{ textAlign: 'right', paddingLeft: '10px' }}>
								کاریتو
							</Typography>
							<Box sx={{ flexBasis: 80, flexGrow: 0, flexShrink: 0 }}>
								<img src="/icons/logo.jpg" alt="business-icon" draggable="false" />
							</Box>
						</>
					)}
					{isCollapsed && (
						<Box sx={{ flexBasis: 60, flexGrow: 0, flexShrink: 0 }}>
							<img src="/icons/logo.jpg" alt="business-icon" draggable="false" style={{ width: 40 }} />
						</Box>
					)}
				</Box>

				<List>
					{menuItems.map((item) => {
						const isOpen = openSubmenus[item.text];

						return (
							<React.Fragment key={item.text}>
								<ListItem disablePadding sx={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
									<ListItemButton
										onClick={() => {
											if (item.subMenu) {
												toggleSubmenu(item.text);
											} else {
												onhandelmenu(item.link);
											}
										}}
										style={{
											height: 55,
											paddingRight: 25,
											background: pathname.includes(item.link) ? '#D7F2F3' : '',
											fontFamily: 'Vazir !important',
											color: '#878686',
										}}
									>
										{item.subMenu && !isCollapsed && (
											<ListItemIcon sx={{ minWidth: 'auto', marginLeft: 1 }}>
												{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
											</ListItemIcon>
										)}
										{!isCollapsed && (
											<ListItemText
												primary={item.text}
												style={{ fontFamily: 'Vazir !important' }}
												sx={{
													fontFamily: 'Vazir !important',
													color: '#878686',
													textAlign: 'right',
													fontSize: '18px',
												}}
											/>
										)}

										<ListItemIcon
											sx={{
												minWidth: 'auto',
												marginLeft: isCollapsed ? '0' : '12px',
												color: '#878686',
												justifyContent: 'center',
												display: 'flex',
												width: 40,
											}}
										>
											<item.Icon />
										</ListItemIcon>
									</ListItemButton>
								</ListItem>

								{/* Render submenu if exists and open */}
								{item.subMenu && isOpen && !isCollapsed && (
									<List component="div" disablePadding sx={{ pl: 4 }}>
										{item.subMenu.map((sub) => (
											<ListItem
												key={sub.text}
												disablePadding
												onClick={() => onhandelmenu(sub.link)}
												sx={{ justifyContent: 'flex-start' }}
											>
												<ListItemButton
													style={{
														height: 40,
														paddingRight: 25,
														background: pathname.includes(sub.link) ? '#E0F7FA' : '',
														fontFamily: 'Vazir !important',
														color: '#666',
														fontSize: '16px',
													}}
												>
													<ListItemText
														primary={sub.text}
														sx={{
															color: '#666',
															textAlign: 'right',
														}}
													/>
												</ListItemButton>
											</ListItem>
										))}
									</List>
								)}
							</React.Fragment>
						);
					})}

					<ListItem
						disablePadding
						sx={{ justifyContent: isCollapsed ? 'center' : 'flex-start', marginTop: '66px' }}
						onClick={onLogoutClick}
					>
						<ListItemButton
							style={{
								height: 55,
								paddingRight: 25,
								fontFamily: 'Vazir !important',
								color: '#878686',
							}}
						>
							<ListItemText
								primary="خروج"
								sx={{ fontFamily: 'Vazir', color: '#838A93', textAlign: 'right', fontSize: '15px' }}
							/>
							<ListItemIcon sx={{ minWidth: 'auto', marginLeft: '12px', color: '#DC5865' }}>
								<LogoutIcon />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
				</List>
			</S.Mainnav>
		</>
	);
};
export default AdminDrawer;
