import { SalonState } from './salon.state';
import { SalonActionTypes, SalonAction } from './salon.actions';

const initialState: SalonState = {
	processing: false,
	creating: false,
	lastError: null,
	list: [],
	selectedItem: null,
	userLocation: null
}

export function SalonReducer ( state = initialState, action: SalonAction.All ): SalonState
{
	switch ( action.type ) {

		case SalonActionTypes.load:
			return { ...state, processing: true };

		case SalonActionTypes.loadSuccess:
			return { ...state, processing: false, list: action.list };

		case SalonActionTypes.loadFailed:
			return { ...state, processing: false, lastError: action.error };

		case SalonActionTypes.select:
			return { ...state, selectedItem: action.item };

		case SalonActionTypes.getLocation:
			return { ...state, processing: true };

		case SalonActionTypes.getLocationSuccess:
			return { ...state, processing: false, userLocation: action.location };

		default:
			return state;
	}
}
