import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
//import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAuth } from '@/providers/AuthProvider';
import COLORS from '@/theme/colors';

import * as S from '../styles';

const menuItems = [
	{
		text: 'داشبورد',
		Icon: '/icons/dashbord.png',
		link: '/Admin',
	},
	{
		text: 'اطلاعات پایه',
		Icon: '/icons/baseinformation.png',
		link: '#',
		subMenu: [
			{ text: '  استان', link: '/Admin/General/State' },
			{ text: '  شهر', link: '/Admin/General/City' },
			{ text: '  بنر', link: '/Admin/General/Baner' },
			{ text: 'تصاویر چرخشی', link: '/Admin/General/Carousel' },
			{ text: 'ارتباط شهر و سرویس', link: '/Admin/General/CityService' },
		],
	},
	{
		text: 'سرویس ها',
		Icon: '/icons/service.png',
		link: '#',
		subMenu: [
			{ text: 'Main Category', link: '/Admin/General/Category' },
			{ text: 'Sub Category', link: '/Admin/General/SubCategory' },
			{ text: 'Specialized Service', link: '/Admin/General/SubSubCategory' },
			{ text: 'سوالات', link: '/Admin/General/Question' },
		],
	},
	{
		text: 'متخصصان',
		Icon: '/icons/export.png',
		link: '/Admin/Expert',
	},
	{
		text: 'مشتریان',
		Icon: '/icons/users.png',
		link: '/Admin/Customer',
	},
	{
		text: 'سفارشات',
		Icon: '/icons/orders.png',
		link: '#',
		subMenu: [
			{ text: 'لیست سفارشات', link: '/Admin/Orders' },
			{ text: 'دلایل کنسل کردن سفارش', link: '/Admin/ReasonsCancel' },
		],
	},
	{
		text: 'کاربران',
		Icon: '/icons/users.png',
		link: '/Admin/Users',
	},
];
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AdminDrawer = ({ toggleCollapse }) => {
	const router = useRouter();
	const { logout } = useAuth();
	const { pathname } = useRouter();
	const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
	const pageData = useSelector(({ pageData }: any) => pageData);

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
						boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
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
					paddingTop="14px"
					paddingRight="14px"
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
											color: '#000',
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
													color: '#000',

													textAlign: 'right',
													fontSize: '18px',
												}}
											/>
										)}

										<ListItemIcon
											sx={{
												minWidth: 'auto',
												marginLeft: isCollapsed ? '0' : '12px',
												color: '#000',

												justifyContent: 'center',
												display: 'flex',
												width: 35,
											}}
										>
											<img src={item.Icon} width="35px" />
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
														color: '#000',

														fontSize: '14px',
													}}
												>
													<ListItemText
														primary={sub.text}
														sx={{
															color: '#000',

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
						sx={{ justifyContent: isCollapsed ? 'center' : 'flex-start', marginTop: '50px' }}
						onClick={onLogoutClick}
					>
						<ListItemButton
							style={{
								height: 55,
								paddingRight: 25,
								fontFamily: 'Vazir !important',
								color: '#000',
							}}
						>
							{!isCollapsed && (
								<ListItemText
									primary="خروج"
									sx={{ fontFamily: 'Vazir', color: '#000', textAlign: 'right', fontSize: '14px' }}
								/>
							)}
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
