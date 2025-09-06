export interface IPageProps {
	rowsPerPage?: number;
	page?: number;
	Len?: number;
	OnchangePage?: (value: any) => void;
	OnsetRowsPerPage?: (value: any) => void;
}
