import { Action } from '@ngrx/store';
import { KeyValue } from '../../jam/model-library';

export const enum NavigatorActionTypes
{
	initialize = '[Navigator] initialize',
	initialized = '[Navigator] initialized',
	navigate = '[Navigator] navigate',
	routeResolved = '[Navigator] route resolved',
	routeResolveFailed = '[Navigator] route resolve failed',
	navigateBack = '[Navigator] navigate back',
	navigated = '[Navigator] navigated',
	navigateFailed = '[Navigator] navigate failed',
	navigateRejected = '[Navigator] navigate rejected'
}

export namespace NavigatorAction
{

	export class Initialize implements Action
	{
		public readonly type = NavigatorActionTypes.initialize;
		constructor ( public pages: { [ key: number ]: string } ) { }
	}

	export class Initialized implements Action
	{
		public readonly type = NavigatorActionTypes.initialized;
		constructor () { }
	}

	export class Navigate implements Action
	{
		public readonly type = NavigatorActionTypes.navigate;
		constructor ( public page: string, public params?: KeyValue[] ) { }
	}

	export class RouteResolved implements Action
	{
		public readonly type = NavigatorActionTypes.routeResolved;
		constructor ( public page: string, public params?: KeyValue[] ) { }
	}

	export class RouteResolveFailed implements Action
	{
		public readonly type = NavigatorActionTypes.routeResolveFailed;
		constructor () { }
	}

	export class NavigateBack implements Action
	{
		public readonly type = NavigatorActionTypes.navigateBack;
		constructor () { }
	}

	export class Navigated implements Action
	{
		public readonly type = NavigatorActionTypes.navigated;
		constructor ( public page: string, public params: KeyValue[] ) { }
	}

	export class NavigateFailed implements Action
	{
		public readonly type = NavigatorActionTypes.navigateFailed;
		constructor ( public reason: string, public error: string ) { }
	}

	export class NavigateRejected implements Action
	{
		public readonly type = NavigatorActionTypes.navigateRejected;
		constructor ( public reason: string ) { }
	}

	export type All
		= Initialize
		| Initialized
		| Navigate
		| RouteResolved
		| RouteResolveFailed
		| NavigateBack
		| Navigated
		| NavigateFailed
		| NavigateRejected
		;

}
