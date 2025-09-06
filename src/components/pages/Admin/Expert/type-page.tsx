export type RowTable = {
	id: number;
	[key: string]: any;
};
export interface IPageProps {
	setData?(setState: (data: any) => any): void;
	onSearchItem?: (name: string, CityId: string) => void;
	OnhandleEditClick?: (value: any) => void;
	OnhandleDocument?: (value: any) => void;
	OnhandleListDocument?: (value: any) => void;
	OnhandleVideo?: (value: any) => void;
	DataRow?: [];
}
