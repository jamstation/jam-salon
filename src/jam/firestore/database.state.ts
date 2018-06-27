import { JamError, KeyValue } from "../../jam/model-library";
import { Table } from "./table.model";

export interface DatabaseModuleState
{
	databaseState: DatabaseState;
}

export interface DatabaseState
{
	initialized: boolean;
	processing: boolean;
	error: JamError;
	path: string;
	metadataPath: string;
	tableMetadataPath: string;
	tables: Table[];
	resolvedCollections: KeyValue[]
}
