import { CheckInState } from './check-in.state';
import { CheckInActionTypes, CheckInAction } from './check-in.actions';
import { CheckInStatuses } from '../../shared/model';
import { sum } from '../../../jam/function-library';

const initialState: CheckInState = {
	list: [],
	serviceList: [],
	stylistList: [],
	queueLength: 0,
	waitTime: 0,
	processing: false,
	loading: false,
	creating: false,
	editing: false,
	formItem: null
}

export function CheckInReducer ( state = initialState, action: CheckInAction.All ): CheckInState
{
	switch ( action.type ) {

		case CheckInActionTypes.load:
			return {
				...state,
				processing: true,
				loading: true
			};

		case CheckInActionTypes.loadSuccess:
			return {
				...state,
				processing: false,
				loading: false,
				list: action.list,
				stylistList: action.stylistList,
				serviceList: action.serviceList
			};

		case CheckInActionTypes.create:
			return {
				...state,
				creating: true,
				formItem: {
					key: null,
					token: null,
					time: new Date(),
					status: CheckInStatuses.notCheckedIn,
					name: null,
					phone: null,
					serviceList: [],
					stylist: state.stylistList[ 0 ]
				}
			};

		case CheckInActionTypes.edit:
			return {
				...state,
				editing: true,
				formItem: JSON.parse( JSON.stringify( action.item ) )
			};

		case CheckInActionTypes.cancelEdit:
			return {
				...state,
				editing: false
			};

		case CheckInActionTypes.add:
			return {
				...state,
				formItem: action.item
			};

		case CheckInActionTypes.addSuccess:
			const currentQueue = state.list
				.filter( item => item.status === CheckInStatuses.checkedIn || CheckInStatuses.inProgress )
				.filter( item => !state.formItem || item.key !== state.formItem.key );
			return {
				...state,
				creating: false,
				queueLength: currentQueue.length,
				waitTime: sum( ...currentQueue.map( item => sum( ...item.serviceList.map( sItem => sItem.duration ) ) ) )
			};

		case CheckInActionTypes.modifySuccess:
			return {
				...state,
				editing: false
			};

		default:
			return state;
	}
}
