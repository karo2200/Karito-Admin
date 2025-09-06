export interface ISearchInputPageProps {
	onChange(value: string): void;
	disabled?: boolean;
	ref?: any;
	style?: React.CSSProperties;
	clearsearch?: () => void;
	isActiveback?: boolean;
	isActive?: boolean;
	isAdmin?: boolean;
	inputRef?: any;
}
