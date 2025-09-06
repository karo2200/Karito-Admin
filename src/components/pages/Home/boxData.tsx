import * as S from '../styles';
import DataNumber from './dataFech/number';
const Index = ({ ListData, TypeData }) => {
	return (
		<>
			<S.row>
				<S.cell>
					<S.BoxDataNumber backgroundColor="#ffb905">
						<DataNumber TypeData={TypeData} ListData={ListData?.Trip} />
					</S.BoxDataNumber>
				</S.cell>
				<S.cell>
					<S.BoxDataNumber backgroundColor="#012f61">
						<DataNumber TypeData={TypeData} ListData={ListData?.Seen} />
					</S.BoxDataNumber>
				</S.cell>

				<S.cell>
					<S.BoxDataNumber backgroundColor="#ff7a9b">
						<DataNumber TypeData={TypeData} ListData={ListData?.Distance} />
					</S.BoxDataNumber>
				</S.cell>
				<S.cell>
					<S.BoxDataNumber backgroundColor="#bdcef5">
						<DataNumber TypeData={TypeData} ListData={ListData?.AvgSpeed} />
					</S.BoxDataNumber>
				</S.cell>
			</S.row>
		</>
	);
};

export default Index;
