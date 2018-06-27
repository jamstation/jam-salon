import { TableData } from "./table-data.model";

export interface Metadata extends TableData
{
	category?: string;
	name: string;
	value?: string;
	label?: string;
}
