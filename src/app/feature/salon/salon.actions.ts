import { Action } from '@ngrx/store';
import { JamError } from '../../../jam/model-library';
import { Salon } from 'src/app/shared/model/salon.model';
import { MapLocation } from 'src/jam/maps';

export const enum SalonActionTypes
{
	load = '[Salon] load',
	loadSuccess = '[Salon] loadSuccess',
	loadFailed = '[Salon] loadFailed',
	select = '[Salon] select',
	getLocation = '[Salon] getLocation',
	getLocationSuccess = '[Salon] getLocationSuccess',
	getLocationFailed = '[Salon] getLocationFailed'
}

export namespace SalonAction
{

	export class Load implements Action
	{
		public readonly type = SalonActionTypes.load;
		constructor () { }
	}

	export class LoadSuccess implements Action
	{
		public readonly type = SalonActionTypes.loadSuccess;
		constructor ( public list: Salon[] ) { }
	}

	export class LoadFailed implements Action
	{
		public readonly type = SalonActionTypes.loadFailed;
		constructor ( public error: JamError ) { }
	}

	export class Select implements Action
	{
		public readonly type = SalonActionTypes.select;
		constructor ( public item: Salon ) { }
	}

	export class GetLocation implements Action
	{
		public readonly type = SalonActionTypes.getLocation;
		constructor ( public placeId: string ) { }
	}

	export class GetLocationSuccess implements Action
	{
		public readonly type = SalonActionTypes.getLocationSuccess;
		constructor ( public location: MapLocation ) { }
	}

	export class GetLocationFailed implements Action
	{
		public readonly type = SalonActionTypes.getLocationFailed;
		constructor ( public error: JamError ) { }
	}

	export type All
		= Load
		| LoadSuccess
		| LoadFailed
		| Select
		| GetLocation
		| GetLocationSuccess
		| GetLocationFailed
		;
}
