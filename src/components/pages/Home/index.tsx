import React, { useEffect } from 'react';

import CardBox from '../Services/CardBox';
//import { useQueryAxios } from 'src/components/pages/Query';
//import Map from '@/components/organisms/Map';
//import EnumType from '@/hooks/enum';
import * as S from '../styles';
import CardServices from './CardServices';
import CardExpert from './Expert';
const HomePage = () => {
	//const { GetfirstPageCommute } = useQueryAxios();
	//const [ListData, setListData] = useState();
	//const [Series, setseries] = useState([]);
	//const [isActive, setisActive] = useState(EnumType.Day);
	//const FeachData = async () => {
	//const data = await GetfirstPageCommute();
	//setListData(data);
	//};
	useEffect(() => {
		//	FeachData();
	}, []);
	//	useEffect(() => {
	//	const js = [];
	//	js.push(
	//		{ name: 'N', type: 'line', stack: 'Total', data: ListData?.trip?.N },
	//		{ name: 'Nout', type: 'line', stack: 'Total', data: ListData?.trip?.Nout }
	//	);
	//setseries(js);
	//}, [ListData]);

	return (
		<>
			<S.row>
				<S.cell>
					<CardServices />
				</S.cell>
			</S.row>
			<S.row>
				<S.cell>
					<CardExpert />
				</S.cell>
			</S.row>
			<S.row>
				<S.cell>
					<CardBox />
				</S.cell>
			</S.row>
		</>
	);
};

export default HomePage;
