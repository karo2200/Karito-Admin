export type RowTable = {
	id: number;
	[key: string]: any;
};
export interface IPageProps {
	setData?(setState: (data: any) => any): void;
	onSearchItem?: (name?: string, CityId?: string, mobil?: string) => void;
	OnhandleEditClick?: (value: any) => void;
	OnhandleDocument?: (value: any) => void;
	OnhandleListDocument?: (value: any) => void;
	OnhandleVideo?: (value: any) => void;
	OnhandleShow?: (value: any) => void;
	OnhandleOTP?: (value: any) => void;
	DataRow?: [];
	OnsetRowsPerPage?: (row: number, page: number) => void;
	TotalCount?: number;
	rows?: [];
}
