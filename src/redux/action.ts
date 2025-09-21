import { PageDataType } from './Data';

export const types = {
	SET_PAGE_DATA: 'SET_PAGE_DATA',
};

export function setPageData(pageData: PageDataType) {
	return {
		type: types.SET_PAGE_DATA,
		payload: pageData,
	};
}
