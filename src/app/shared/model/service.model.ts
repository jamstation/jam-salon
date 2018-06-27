import { TableData } from "../../../jam/model-library";

export interface Service extends TableData
{
	name: string;
	price?: number;
	duration?: number;
}
