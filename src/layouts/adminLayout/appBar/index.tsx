import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import React from 'react';

import * as S from '../styles';
const drawerWidth = 270;
const pages = ['Home', 'About', 'Services', 'Contact'];

export default function VerticalNavBar() {
	return (
		<S.Mainnav>
			{/* Permanent Drawer */}
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
			>
				{/* Header */}
				<Toolbar sx={{ bgcolor: 'primary.main', color: 'white', justifyContent: 'center' }}>
					<Typography variant="h6" noWrap component="div">
						My Header
					</Typography>
				</Toolbar>

				{/* Navigation List */}
				<List>
					{pages.map((text) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>

			{/* Main content placeholder */}
		</S.Mainnav>
	);
}
