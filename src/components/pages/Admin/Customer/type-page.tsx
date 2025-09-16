export type RowTable = {
	id: number;
	[key: string]: any;
};
export interface IPageProps {
	setData?(setState: (data: any) => any): void;
	onSearchItem?: (name: string, CityId: string) => void;
	OnhandleEditClick?: (value: any) => void;
	OnhandleDocument?: (value: any) => void;
	OnsetRowsPerPage?: (row: number, page: number) => void;
	OnhandleVideo?: (value: any) => void;
	OnhandleShow?: (value: any) => void;
	DataRow?: [];
	TotalCount?: number;
	rows?: [];
}
