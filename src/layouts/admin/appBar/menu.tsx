import React from 'react';

import AlarmIcon from '@/assets/alarm';
import BehaviorIcon from '@/assets/behavior';
import CalenIcon from '@/assets/calen';
import CamIcon from '@/assets/cam';
import CarIcon from '@/assets/car';
import EyeIcon from '@/assets/eye';
import TravelIcon from '@/assets/travel';
import UserIcon from '@/assets/user';

import * as S from './styles';

const Menu = () => {
	return (
		<S.Ul>
			<S.Li>
				<UserIcon />
			</S.Li>
			<S.Li>
				<CarIcon />
			</S.Li>
			<S.Li>
				<CalenIcon />
			</S.Li>
			<S.Li>
				<BehaviorIcon />
			</S.Li>
			<S.Li>
				<CamIcon />
			</S.Li>
			<S.Li>
				<TravelIcon />
			</S.Li>
			<S.Li>
				<AlarmIcon />
			</S.Li>
			<S.Li>
				<EyeIcon />
			</S.Li>
		</S.Ul>
	);
};

export default Menu;
