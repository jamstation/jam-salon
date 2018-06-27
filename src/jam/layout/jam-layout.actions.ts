import { Action } from '@ngrx/store';
import { ScreenSizes } from '../../jam/model-library';

export const enum JamLayoutActionTypes
{
	initialize = '[JamLayout] initialize',
	screenSizeChanged = '[JamLayout] screenSizeChanged',
}

export namespace JamLayoutAction
{
	export class Initialize implements Action
	{
		public readonly type = JamLayoutActionTypes.initialize;
		constructor () { }
	}

	export class ScreenSizeChanged implements Action
	{
		public readonly type = JamLayoutActionTypes.screenSizeChanged;
		constructor ( public screenSize: ScreenSizes ) { }
	}

	export type All
		= Initialize
		| ScreenSizeChanged
		;
}
