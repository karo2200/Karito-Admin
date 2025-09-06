import { Card } from '@mui/material';
import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import EChartsReact from 'echarts-for-react';
import React from 'react';

ChartJS.register(ArcElement, Tooltip);

function DoughnutChart({ xAxisData, Series }) {
	const option = {
		title: {
			text: '',
		},
		tooltip: {
			trigger: 'axis',
		},
		// legend: {
		// 	data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
		// },
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true,
		},
		toolbox: {
			feature: {
				saveAsImage: {},
			},
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: xAxisData,
		},
		yAxis: {
			type: 'value',
		},
		series: Series,
	};

	return <Card sx={{ width: '95%', padding: '5px' }}>{<EChartsReact option={option} />}</Card>;
}

export default DoughnutChart;
