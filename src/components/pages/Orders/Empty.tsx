import { Box, Button } from '@mui/material';
import * as React from 'react';

import COLORS from '@/theme/colors';

import IconEmpty from '../../../assets/empty';
import * as S from '../styles';

const Index = () => {
	return (
		<>
			<Box sx={{ width: '100%' }}>
				<center>
					<>
						<IconEmpty />
						<S.row marginTop={10}>
							<S.cell>
								<Button
									variant="outlined"
									sx={{
										backgroundColor: COLORS.Purple,
										borderRadius: 2,
										height: 40,
										width: 200,
										marginRight: 2,
										'&:hover': {
											color: COLORS.Purple,
										},
									}}
								>
									مشاهده لیست خدمات
								</Button>
							</S.cell>
						</S.row>
					</>
				</center>
			</Box>
		</>
	);
};

export default Index;
