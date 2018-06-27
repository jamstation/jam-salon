import { TableData } from "../../jam/model-library";
import { Table } from "./table.model";

export interface Database extends TableData
{
	path: string;
	metadataPath: string;
	tableMetadataPath: string;
	tables: Table[];
}
