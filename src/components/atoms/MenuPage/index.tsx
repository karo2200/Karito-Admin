import * as S from './styles';
const Index = () => {
	return (
		<>
			<S.BoxReport>
				<S.row>
					<S.cell>
						<S.font fontSize={{ xs: 10, sm: 10, md: 14, lg: 14, xl: 19 }}>All</S.font>
					</S.cell>
					<S.cell>
						<S.font fontSize={{ xs: 10, sm: 10, md: 14, lg: 14, xl: 19 }}>About Iran</S.font>
					</S.cell>
					<S.cell>
						<S.font fontSize={{ xs: 10, sm: 10, md: 14, lg: 14, xl: 19 }}>Collectives</S.font>
					</S.cell>
					<S.cell>
						<S.font fontSize={{ xs: 10, sm: 10, md: 14, lg: 14, xl: 19 }}>Media</S.font>
					</S.cell>
					<S.cell>
						<S.font fontSize={{ xs: 10, sm: 10, md: 14, lg: 14, xl: 19 }}>Task forces </S.font>
					</S.cell>
				</S.row>
			</S.BoxReport>
		</>
	);
};

export default Index;
