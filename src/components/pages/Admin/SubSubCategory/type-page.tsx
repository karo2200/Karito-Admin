export type RowTable = {
	id: number;
	[key: string]: any;
};
export interface IPageProps {
	setData?(setState: (data: any) => any): void;
	onSearchItem?: (value: any) => void;
	OnhandleEditClick?: (value: any) => void;
	onRefreshItem?: () => void;
	DataRow?: [];
}
