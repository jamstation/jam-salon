import { HomeState } from './home.state';
import { HomeActionTypes, HomeAction } from './home.actions';

const initialState: HomeState = {
	processing: false,
	creating: false,
	lastError: null,
	placeId: null
}

export function HomeReducer ( state = initialState, action: HomeAction.All ): HomeState
{
	switch ( action.type ) {

		case HomeActionTypes.load:
			return { ...state, processing: true }

		case HomeActionTypes.loadSuccess:
			return { ...state, processing: false }

		case HomeActionTypes.loadFailed:
			return { ...state, processing: false, lastError: action.error }

		case HomeActionTypes.search:
			return { ...state, placeId: action.placeId }

		default:
			return state;
	}
}
