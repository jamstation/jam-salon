import { TableData } from "./table-data.model";

export interface Company extends TableData
{
	name: string;
	subscription: string;
}
