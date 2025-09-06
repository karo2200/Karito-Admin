import * as S from './styles';

const Index = () => {
	return (
		<S.cell>
			<S.row>
				<S.cell>
					<S.ContentTag>
						<S.font3 fontSize={{ lg: 10, xl: 16 }}>Woman</S.font3>
					</S.ContentTag>
				</S.cell>
				<S.cell>
					<S.ContentTag>
						<S.font3 fontSize={{ lg: 10, xl: 16 }}>Iran</S.font3>
					</S.ContentTag>
				</S.cell>
			</S.row>
			<S.row sx={{ marginTop: '5px' }}>
				<S.cell>
					<S.ContentTag>
						<S.font3 fontSize={{ lg: 10, xl: 16 }}>Human Right</S.font3>
					</S.ContentTag>
				</S.cell>
			</S.row>
		</S.cell>
	);
};

export default Index;
