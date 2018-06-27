import { DatabaseState } from './database.state';
import { DatabaseActionTypes, DatabaseAction } from './database.actions';
import { TableData, JamError } from "../../jam/model-library";
import { Table } from './table.model';
import { resolvePath } from './resolve-path.function';

const initialState: DatabaseState = {
	initialized: false,
	processing: false,
	error: null,
	path: null,
	metadataPath: null,
	tableMetadataPath: null,
	tables: [],
	resolvedCollections: []
}

export function DatabaseReducer ( state = initialState, action: DatabaseAction.All )
{
	switch ( action.type ) {

		case DatabaseActionTypes.initialize:
			return {
				...state,
				metadataPath: action.metadataPath,
				initialized: false,
				processing: true
			};

		case DatabaseActionTypes.initialized:
			return {
				...state,
				path: action.database.path,
				metadataPath: action.database.metadataPath,
				tableMetadataPath: action.database.tableMetadataPath,
				tables: action.database.tables,
				initialized: true,
				processing: false
			};

		case DatabaseActionTypes.initializeFailed:
			return {
				...state,
				initialized: false,
				processing: false
			};

		case DatabaseActionTypes.enterCollection:
			if ( state.resolvedCollections.find( collection => collection.key === action.collectionName && collection.value === action.documentKey ) ) {
				return state;
			} else {
				const newResolvedCollection = state.resolvedCollections.concat( { key: action.collectionName, value: action.documentKey } );
				return {
					...state,
					resolvedCollections: newResolvedCollection,
					tables: state.tables.map( table => resolvePath( table, newResolvedCollection ) )
				}
			}

		case DatabaseActionTypes.exitCollection:
			if ( state.resolvedCollections.find( collection => collection.key !== action.collectionName ) ) {
				return state;
			} else {
				const newResolvedCollection = state.resolvedCollections.filter( collection => collection.key !== action.collectionName );
				return {
					...state,
					resolvedCollections: newResolvedCollection,
					tables: state.tables.map( table => resolvePath( table, newResolvedCollection ) )
				}
			}

		default:
			return state;
	}
}
