import { TableData, KeyValue } from "../model-library";
import { Table } from "./table.model";

export function resolvePath<T extends TableData>( table: Table, resolvedCollections: KeyValue[] ): Table
{
	if ( !resolvedCollections || !resolvedCollections.length ) return table;
	return {
		...table,
		path: resolvedCollections.reduce( ( result, collection ) => result.replace( '{' + collection.key + '}', collection.value ), table.originalPath )
	}
}
