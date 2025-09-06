import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import EChartsReact from 'echarts-for-react';
import React, { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip);

function DoughnutChart({ ListData }) {
	const chartOptions = useMemo(
		() => ({
			title: {
				text: '',
				subtext: '',
				left: 'center',
			},
			tooltip: {
				trigger: 'item',
			},
			// legend: {
			// 	orient: 'vertical',
			// 	left: 'right',
			// },
			series: [
				{
					name: '',
					type: 'pie',
					radius: [50, 110],
					data: ListData || [
						{ value: 1048, name: 'Search Engine' },
						{ value: 735, name: 'Direct' },
						{ value: 580, name: 'Email' },
						{ value: 484, name: 'Union Ads' },
						{ value: 300, name: 'Video Ads' },
					],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						},
					},
				},
			],
		}),
		[ListData]
	);

	return (
		<>
			<EChartsReact option={chartOptions} />
		</>
	);
}

export default DoughnutChart;
