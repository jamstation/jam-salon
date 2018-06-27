import { NavigatorState } from './jam-navigator.state';
import { NavigatorActionTypes, NavigatorAction } from './jam-navigator.actions';
import { KeyValue } from '../../jam/model-library';

const initialState: NavigatorState = {
	initialized: false,
	loading: false,
	navigating: false,
	pristine: true,
	pages: null,
	params: [],
	previousPage: null,
	currentPage: null,
	requestedPage: null,
	resolvedRequestedPage: null,
	navigatedToPage: null,
	reason: null,
	error: null
}

export function NavigatorReducer ( state = initialState, action: NavigatorAction.All )
{
	switch ( action.type ) {

		case NavigatorActionTypes.initialize:
			return {
				...state,
				pages: action.pages,
				initialized: false,
				loading: true
			};

		case NavigatorActionTypes.initialized:
			return {
				...state,
				initialized: true,
				loading: false
			};

		case NavigatorActionTypes.navigate:
			return {
				...state,
				requestedPage: action.page,
				navigatedToPage: null,
				loading: true,
				navigating: true
			};

		case NavigatorActionTypes.routeResolved:
			return {
				...state,
				resolvedRequestedPage: action.page,
				params: action.params,
				prisitine: false
			};

		case NavigatorActionTypes.routeResolveFailed:
			return {
				...state,
				resolvedRequestedPage: null
			};

		case NavigatorActionTypes.navigateBack:
			return {
				...state,
				loading: true,
				navigating: true,
				requestedPage: state.previousPage,
				navigatedToPage: null
			};

		case NavigatorActionTypes.navigated:
			return {
				...state,
				loading: false,
				navigating: false,
				requestedPage: null,
				resolvedRequestedPage: null,
				navigatedToPage: action.page,
				previousPage: state.currentPage,
				currentPage: action.page,
				params: action.params,
				reason: null,
				error: null
			};

		case NavigatorActionTypes.navigateFailed:
			return {
				...state,
				loading: false,
				navigating: false,
				requestedPage: null,
				resolvedRequestedPage: null,
				navigatedToPage: null,
				reason: action.reason,
				error: action.error
			};

		case NavigatorActionTypes.navigateRejected:
			return {
				...state,
				loading: false,
				navigating: false,
				requestedPage: null,
				resolvedRequestedPage: null,
				navigatedToPage: null,
				reason: action.reason
			};

		default:
			return state;
	}
}
