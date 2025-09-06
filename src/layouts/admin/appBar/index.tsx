import { Typography } from '@mui/material';

import LogoIcon from '@/assets/logo';
import LogoutIcon from '@/assets/logout';
import MenuIcon from '@/assets/menu';

import Menu from './menu';
import * as S from './styles';
const AdminAppBar = ({ mobileView }) => {
	return (
		<S.AppBar color="#50473A" backgroundColor="#fff">
			{!mobileView ? (
				<S.row sx={{ margin: '20px' }}>
					<S.cell sx={{ flexGrow: 0, flexShrink: 0, flexBasis: 50 }}>
						<LogoutIcon />
					</S.cell>
					<S.cellLable>
						<S.row>
							<S.cell>
								<Typography color="#828282" fontSize={{ lg: 16 }} fontWeight={'bold'}>
									1403/01/12
								</Typography>
							</S.cell>
						</S.row>
						<S.row>
							<S.cell>
								<Typography color="#828282" fontSize={{ lg: 16 }} fontWeight={'bold'}>
									12:14:32
								</Typography>
							</S.cell>
						</S.row>
					</S.cellLable>
					<S.cellmenu>
						<Menu />
					</S.cellmenu>
					<S.cell sx={{ flexBasis: '210px', flexGrow: 0 }}>
						<S.row>
							<S.cell sx={{ flexBasis: '100px', flexGrow: 0, textAlign: 'right', marginRight: '10px' }}>
								<Typography color="#003060" fontSize={{ lg: 20 }} fontWeight={'bold'}>
									سامانه داپ
								</Typography>
							</S.cell>
							<S.cell sx={{ flexBasis: '40px', flexGrow: 0 }}>
								<LogoIcon />
							</S.cell>
							<S.cell sx={{ textAlign: 'right' }}>
								<MenuIcon />
							</S.cell>
						</S.row>
					</S.cell>
				</S.row>
			) : (
				<>
					<S.row sx={{ margin: '20px' }}>
						<S.cell sx={{ flexGrow: 0, flexShrink: 0, flexBasis: 50 }}>
							<LogoutIcon />
						</S.cell>
						<S.cellLable>
							<S.row>
								<S.cell>
									<Typography color="#828282" fontSize={{ lg: 16 }} fontWeight={'bold'}>
										1403/01/12
									</Typography>
								</S.cell>
							</S.row>
							<S.row>
								<S.cell>
									<Typography color="#828282" fontSize={{ lg: 16 }} fontWeight={'bold'}>
										12:14:32
									</Typography>
								</S.cell>
							</S.row>
						</S.cellLable>

						<S.cell sx={{ flexBasis: '270px', flexGrow: 0 }}>
							<S.row>
								<S.cell sx={{ flexBasis: '150px', flexGrow: 0, textAlign: 'right', marginRight: '10px' }}>
									<Typography color="#003060" fontSize={{ lg: 20 }} fontWeight={'bold'}>
										سامانه داپ
									</Typography>
								</S.cell>
								<S.cell sx={{ flexBasis: '40px', flexGrow: 0 }}>
									<LogoIcon />
								</S.cell>
								<S.cell sx={{ textAlign: 'right' }}>
									<MenuIcon />
								</S.cell>
							</S.row>
						</S.cell>
					</S.row>
					<S.row>
						<S.cellmenu>
							<Menu />
						</S.cellmenu>
					</S.row>
				</>
			)}
		</S.AppBar>
	);
};

export default AdminAppBar;
