import { TableData } from "./table-data.model";

export interface Picture extends TableData
{
	name: string,
	normal: string,
	thumbnail: string,
	big: string,
	maxResolution: string
}
