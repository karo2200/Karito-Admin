export type RowTable = {
	id: number;
	[key: string]: any;
};
export interface IPageProps {
	setData?(setState: (data: any) => any): void;
	onDrop?: (value: any) => void;
	OnhandelEmpty?: (value: any) => void;
	onRefreshItem?: () => void;
	Empty?: boolean;
	Url?: string;
}
