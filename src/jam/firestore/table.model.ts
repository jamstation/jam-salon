import { TableData } from "../model-library";

export interface Table extends TableData
{
	path: string;
	originalPath?: string;
}
