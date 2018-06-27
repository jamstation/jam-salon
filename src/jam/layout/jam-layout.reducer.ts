import { JamLayoutState } from './jam-layout.state';
import { JamLayoutActionTypes, JamLayoutAction } from './jam-layout.actions';
import { ScreenSizes } from '../../jam/model-library';

const initialState: JamLayoutState = {
	screenSize: ScreenSizes.extraLarge
}

export function JamLayoutReducer ( state = initialState, action: JamLayoutAction.All ): JamLayoutState
{
	switch ( action.type ) {

		case JamLayoutActionTypes.screenSizeChanged:
			return {
				...state,
				screenSize: action.screenSize
			};

		default:
			return state;
	}
}
