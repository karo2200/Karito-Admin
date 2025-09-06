import { Card } from '@mui/material';
import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';

import SelectField from '@/components/atoms/Form/SelectInput';
import DoughChart from '@/components/organisms/Chart/DoughChart';
import EnumType from '@/hooks/enum';

ChartJS.register(ArcElement, Tooltip);

function DoughnutChart({ ListData, TypeData }) {
	const [Drop, setDrop] = useState([]);
	const [ValueDrop, setvalue] = useState('');
	const [Data, setData] = useState([]);
	useEffect(() => {
		if (ListData) {
			const js = [
				{ option: ListData?.Crime_PLACE?.title, value: 'Crime_PLACE' },
				{ option: ListData?.Crime_PLATE?.title, value: 'Crime_PLATE' },
				{ option: ListData?.Traffic_PLACE?.title, value: 'Traffic_PLACE' },
				{ option: ListData?.Traffic_PLATE?.title, value: 'Traffic_PLATE' },
			];
			setvalue('Crime_PLACE');
			setDrop(js);
			DataFill(
				TypeData === EnumType.Day
					? ListData?.Crime_PLACE?.day?.province
					: TypeData === EnumType.Week
					? ListData?.Crime_PLACE?.week?.province
					: ListData?.Crime_PLACE?.month?.province,
				TypeData === EnumType.Day
					? ListData?.Crime_PLACE?.day?.values
					: TypeData === EnumType.Week
					? ListData?.Crime_PLACE?.week?.values
					: ListData?.Crime_PLACE?.month?.values
			);
		}
	}, [ListData, TypeData]);

	const DataFill = (Data, value) => {
		const js1 = [];

		Data?.map((item, index) => {
			js1.push({ value: value[index], name: item });
		});
		setData(js1);
	};
	const onChange = (value) => {
		setvalue(value);
		if (value === 'Crime_PLACE')
			DataFill(
				TypeData === EnumType.Day
					? ListData?.Crime_PLACE?.day?.province
					: TypeData === EnumType.Week
					? ListData?.Crime_PLACE?.week?.province
					: ListData?.Crime_PLACE?.month?.province,
				TypeData === EnumType.Day
					? ListData?.Crime_PLACE?.day?.values
					: TypeData === EnumType.Week
					? ListData?.Crime_PLACE?.week?.values
					: ListData?.Crime_PLACE?.month?.values
			);
		else if (value === 'Crime_PLATE')
			DataFill(
				TypeData === EnumType.Day
					? ListData?.Crime_PLATE?.day?.province
					: TypeData === EnumType.Week
					? ListData?.Crime_PLATE?.week?.province
					: ListData?.Crime_PLATE?.month?.province,
				TypeData === EnumType.Day
					? ListData?.Crime_PLATE?.day?.values
					: TypeData === EnumType.Week
					? ListData?.Crime_PLATE?.week?.values
					: ListData?.Crime_PLATE?.month?.values
			);
		else if (value === 'Traffic_PLACE')
			DataFill(
				TypeData === EnumType.Day
					? ListData?.Traffic_PLACE?.day?.province
					: TypeData === EnumType.Week
					? ListData?.Traffic_PLACE?.week?.province
					: ListData?.Traffic_PLACE?.month?.province,
				TypeData === EnumType.Day
					? ListData?.Traffic_PLACE?.day?.values
					: TypeData === EnumType.Week
					? ListData?.Traffic_PLACE?.week?.values
					: ListData?.Traffic_PLACE?.month?.values
			);
		else if (value === 'Traffic_PLATE')
			DataFill(
				TypeData === EnumType.Day
					? ListData?.Traffic_PLATE?.day?.province
					: TypeData === EnumType.Week
					? ListData?.Traffic_PLATE?.week?.province
					: ListData?.Traffic_PLATE?.month?.province,
				TypeData === EnumType.Day
					? ListData?.Traffic_PLATE?.day?.values
					: TypeData === EnumType.Week
					? ListData?.Traffic_PLATE?.week?.values
					: ListData?.Traffic_PLATE?.month?.values
			);
	};
	return (
		<>
			{
				<Card sx={{ padding: '10px', textAlign: 'right' }}>
					<SelectField
						sx={{
							width: 166,
							height: 33,
							backgroundColor: '#F3F5F9',
							color: '#825EF6',
							textAlign: 'right',
						}}
						name="PIE"
						options={Drop}
						autoWidth={false}
						multiple={false}
						native={false}
						value={ValueDrop}
						onChange={(e) => {
							onChange(e.target.value);
						}}
					/>
					<DoughChart ListData={Data} />
				</Card>
			}
		</>
	);
}

export default DoughnutChart;
