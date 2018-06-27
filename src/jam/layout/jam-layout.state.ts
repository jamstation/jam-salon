import { ScreenSizes } from '../../jam/model-library';

export interface LayoutModuleState
{
	layoutState: JamLayoutState;
}

export interface JamLayoutState
{
	screenSize: ScreenSizes;
}
