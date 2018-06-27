import { Action } from '@ngrx/store';
import { JamError } from 'src/jam/model-library';
import { MapLocation } from 'src/jam/maps';

export const enum HomeActionTypes
{
	load = '[Home] load',
	loadSuccess = '[Home] loadSuccess',
	loadFailed = '[Home] loadFailed',
	search = '[Home] search'
}

export namespace HomeAction
{

	export class Load implements Action
	{
		public readonly type = HomeActionTypes.load;
		constructor () { }
	}

	export class LoadSuccess implements Action
	{
		public readonly type = HomeActionTypes.loadSuccess;
		constructor ( public item: string ) { }
	}

	export class LoadFailed implements Action
	{
		public readonly type = HomeActionTypes.loadFailed;
		constructor ( public error: JamError ) { }
	}

	export class Search implements Action
	{
		public readonly type = HomeActionTypes.search;
		constructor ( public placeId: string ) { }
	}

	export type All
		= Load
		| LoadSuccess
		| LoadFailed
		| Search
		;
}
