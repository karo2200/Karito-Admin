import Contributions from 'src/assets/Contributions';
import Invited from 'src/assets/Invited';
import Proposals from 'src/assets/Proposals';
import Scores from 'src/assets/Scores';

import * as S from './styles';
const Index = () => {
	return (
		<>
			<S.BoxReport>
				<S.row>
					<S.cellborder>
						<S.row>
							<S.cell sx={{ flexGrow: 0, flexShrink: 0, flexBasis: 40 }}>
								<Scores />
							</S.cell>
							<S.cell>
								<S.row>
									<S.cell>
										<S.font16 fontSize={{ xs: 10, sm: 10, md: 11, lg: 12, xl: 16 }}>D3 Scores</S.font16>
									</S.cell>
								</S.row>
								<S.row>
									<S.cell>
										<S.font12 fontSize={{ xs: 8, sm: 8, md: 10, lg: 10, xl: 12 }}>All credit </S.font12>
									</S.cell>
								</S.row>
							</S.cell>
						</S.row>
					</S.cellborder>
					<S.cellborder>
						<S.row>
							<S.cell sx={{ flexGrow: 0, flexShrink: 0, flexBasis: 40 }}>
								<Proposals />
							</S.cell>
							<S.cell>
								<S.row>
									<S.cell>
										<S.font16 fontSize={{ xs: 10, sm: 10, md: 11, lg: 12, xl: 16 }}>Proposals</S.font16>
									</S.cell>
								</S.row>
								<S.row>
									<S.cell>
										<S.font12 fontSize={{ xs: 8, sm: 8, md: 10, lg: 10, xl: 12 }}>0 projects </S.font12>
									</S.cell>
								</S.row>
							</S.cell>
						</S.row>
					</S.cellborder>
					<S.cellborder>
						<S.row>
							<S.cell sx={{ flexGrow: 0, flexShrink: 0, flexBasis: 40 }}>
								<Contributions />
							</S.cell>
							<S.cell>
								<S.row>
									<S.cell>
										<S.font16 fontSize={{ xs: 10, sm: 10, md: 11, lg: 12, xl: 16 }}>Contributions</S.font16>
									</S.cell>
								</S.row>
								<S.row>
									<S.cell>
										<S.font12 fontSize={{ xs: 8, sm: 8, md: 10, lg: 10, xl: 12 }}>0 Contributions</S.font12>
									</S.cell>
								</S.row>
							</S.cell>
						</S.row>
					</S.cellborder>
					<S.cellend>
						<S.row>
							<S.cell sx={{ flexGrow: 0, flexShrink: 0, flexBasis: 40 }}>
								<Invited />
							</S.cell>
							<S.cell>
								<S.row>
									<S.cell>
										<S.font16 fontSize={{ xs: 10, sm: 10, md: 11, lg: 12, xl: 16 }}>Invited</S.font16>
									</S.cell>
								</S.row>
								<S.row>
									<S.cell>
										<S.font12 fontSize={{ xs: 8, sm: 8, md: 10, lg: 10, xl: 12 }}>0 Verified Citizens </S.font12>
									</S.cell>
								</S.row>
							</S.cell>
						</S.row>
					</S.cellend>
				</S.row>
			</S.BoxReport>
		</>
	);
};

export default Index;
