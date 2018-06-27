import { TableData } from "./table-data.model";

export interface LayoutItem extends TableData
{
	value?: string;
	newValue$?: string;
	category?: string;
	name?: string;
	label?: string;
	formControl?: string;
	index?: number;
	groupIndex?: number;
	groupLabel?: string;
	groupDescription?: string;
	groupIcon?: string;
	active?: boolean;
	placeholder?: string;
	options?: string[];
}
