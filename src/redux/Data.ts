import { types } from './action';

export type PageDataType = any;
type State = {
	pageData: PageDataType;
};

const initialState: PageDataType = {
	UserType: '',
};

export default function reducer(state: State = initialState, action: { type: string; payload: any }) {
	switch (action.type) {
		case types.SET_PAGE_DATA:
			return {
				...state,
				pageData: action.payload as PageDataType,
			};

		default:
			return state;
	}
}
