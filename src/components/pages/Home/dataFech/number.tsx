import { Typography } from '@mui/material';

import * as S from '@/components/pages/styles';
import EnumType from '@/hooks/enum';

const Index = ({ ListData, TypeData }) => {
	return (
		<>
			<S.row sx={{ padding: '10px 20px 0 0' }}>
				<S.cell>
					<Typography
						color="#fff"
						fontSize={{ xs: 13, sm: 13, md: 13, lg: 17, xl: 20 }}
						textAlign="right"
						sx={{ marginTop: '10px' }}
					>
						{ListData?.title}
					</Typography>
				</S.cell>
				<S.cell sx={{ flexBasis: '20px', flexGrow: 0, marginLeft: '5px' }}>
					<S.Radio></S.Radio>
				</S.cell>
			</S.row>
			<S.row sx={{ padding: '0 20px 0 0' }}>
				<S.cell>
					<Typography
						color="#fff"
						fontSize={{ xs: 9, sm: 9, md: 9, lg: 12, xl: 15 }}
						textAlign="right"
						sx={{ marginTop: '10px' }}
					>
						{TypeData === EnumType.Day
							? ListData?.day[0]
							: TypeData === EnumType.Week
							? ListData?.week[0]
							: ListData?.month[0]}
					</Typography>
				</S.cell>
				<S.cell>
					<Typography
						color="#fff"
						fontSize={{ xs: 9, sm: 9, md: 9, lg: 12, xl: 15 }}
						textAlign="right"
						sx={{ marginTop: '10px' }}
					>
						{ListData?.sub_title[0]}
					</Typography>
				</S.cell>
			</S.row>
			<S.row sx={{ padding: '0 20px 0 0' }}>
				<S.cell>
					<Typography
						color="#fff"
						fontSize={{ xs: 9, sm: 9, md: 9, lg: 12, xl: 15 }}
						textAlign="right"
						sx={{ marginTop: '10px' }}
					>
						{TypeData === EnumType.Day
							? ListData?.day[1]
							: TypeData === EnumType.Week
							? ListData?.week[1]
							: ListData?.month[1]}
					</Typography>
				</S.cell>
				<S.cell>
					<Typography
						color="#fff"
						fontSize={{ xs: 9, sm: 9, md: 9, lg: 12, xl: 15 }}
						textAlign="right"
						sx={{ marginTop: '10px' }}
					>
						{ListData?.sub_title[1]}
					</Typography>
				</S.cell>
			</S.row>
		</>
	);
};

export default Index;
