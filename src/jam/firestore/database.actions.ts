import { Action } from '@ngrx/store';
import { KeyValue } from "../../jam/model-library";
import { Database } from './database.model';

export const enum DatabaseActionTypes
{
	initialize = '[Database] initialize',
	initialized = '[Database] initialized',
	initializeFailed = '[Database] initialize failed',
	enterCollection = '[Database] enter collection',
	exitCollection = '[Database] exit collection'
}

export namespace DatabaseAction
{

	export class Initialize implements Action
	{
		public readonly type = DatabaseActionTypes.initialize;
		constructor ( public metadataPath: string, public enterCollectionValues?: KeyValue[], public database?: Database ) { }
	}

	export class Initialized implements Action
	{
		public readonly type = DatabaseActionTypes.initialized;
		constructor ( public database: Database ) { }
	}

	export class InitializeFailed implements Action
	{
		public readonly type = DatabaseActionTypes.initializeFailed;
		constructor () { }
	}

	export class EnterCollection implements Action
	{
		public readonly type = DatabaseActionTypes.enterCollection;
		constructor ( public collectionName: string, public documentKey: string ) { }
	}

	export class ExitCollection implements Action
	{
		public readonly type = DatabaseActionTypes.exitCollection;
		constructor ( public collectionName: string ) { }
	}

	export type All
		= Initialize
		| Initialized
		| InitializeFailed
		| EnterCollection
		| ExitCollection
		;

}
