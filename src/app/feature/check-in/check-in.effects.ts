import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { sortStringList, getToday } from "../../../jam/function-library";
import { DatabaseService } from "../../../jam/firestore";
import { CheckInActionTypes, CheckInAction } from "./check-in.actions";
import { CheckInModuleState } from "./check-in.state";
import { CheckInFormComponent } from "./check-in-form.component";
import { Tables, CheckIn, Service, Stylist, CheckInStatuses } from "../../shared/model";
import { CheckInSummaryDialogComponent } from "./check-in-summary-dialog.component";
import { SalonModuleState } from "../salon";

@Injectable()
export class CheckInEffects
{

	constructor (
		private actions: Actions,
		private store: Store<SalonModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	) { }

	@Effect() public load = this.actions.pipe(
		ofType<CheckInAction.Load>( CheckInActionTypes.load ),
		switchMap( action => this.db.filter<CheckIn>( Tables.CheckIn, 'time', '>=', getToday() ).pipe(
			switchMap( list => this.db.list<Stylist>( Tables.Stylist ).pipe(
				switchMap( stylistList => this.db.list<Service>( Tables.Service ).pipe(
					map( serviceList => ( { list, stylistList, serviceList } ) )
					// map( serviceList => ( {
					// 	list: list.map( item => ( {
					// 		...item,
					// 		stylist: stylistList.find( refItem => refItem.key === item.stylistKey ) || null,
					// 		serviceList: item.serviceKeyList.map( key => serviceList.find( refItem => refItem.key === key ) || null )
					// 	} ) ) as CheckIn[],
					// 	stylistList: stylistList.map( item => ( {
					// 		...item,
					// 		serviceList: item.serviceKeyList.map( key => serviceList.find( refItem => refItem.key === key ) || null )
					// 	} ) ) as Stylist[],
					// 	serviceList: serviceList
					// } ) )
				) ) ) ) ) ),
		map( ( { list, stylistList, serviceList } ) => ( {
			list: sortStringList( list, 'token' ),
			stylistList: sortStringList( stylistList, 'name' ),
			serviceList: sortStringList( serviceList, 'name' )
		} ) ),
		map( ( { list, stylistList, serviceList } ) => new CheckInAction.LoadSuccess( list, stylistList, serviceList ) ) );

	@Effect() public add = this.actions.pipe(
		ofType<CheckInAction.Add>( CheckInActionTypes.add ),
		switchMap( action => this.db.add<CheckIn>( Tables.CheckIn, action.item ) ),
		map( item => item
			? new CheckInAction.AddSuccess( item )
			: new CheckInAction.AddFailed() ) );

	@Effect() public addSuccess = this.actions.pipe(
		ofType<CheckInAction.AddSuccess>( CheckInActionTypes.addSuccess ),
		map( action => new CheckInAction.OpenSummaryDialog() ) );

	@Effect() public modify = this.actions.pipe(
		ofType<CheckInAction.Modify>( CheckInActionTypes.modify ),
		switchMap( action => this.db.modify<CheckIn>( Tables.CheckIn, action.item ) ),
		map( item => item
			? new CheckInAction.ModifySuccess( item )
			: new CheckInAction.ModifyFailed() ) );

	@Effect() public remove = this.actions.pipe(
		ofType<CheckInAction.Remove>( CheckInActionTypes.remove ),
		switchMap( action => this.db.remove<CheckIn>( Tables.CheckIn, action.item.key ) ),
		map( item => item
			? new CheckInAction.RemoveSuccess( item )
			: new CheckInAction.RemoveFailed() ) );

	@Effect( { dispatch: false } ) public openDialog = this.actions.pipe(
		ofType<CheckInAction.Edit>( CheckInActionTypes.create, CheckInActionTypes.edit ),
		map( action => this.dialogManager.open( CheckInFormComponent, {
			id: 'CheckInFormComponent',
			width: '600px'
		} ) ) );

	@Effect( { dispatch: false } ) public closeDialog = this.actions.pipe(
		ofType<CheckInAction.CancelEdit>( CheckInActionTypes.cancelEdit ),
		map( action => this.dialogManager.getDialogById( 'CheckInFormComponent' ).close() ) );

	@Effect( { dispatch: false } ) public openSummaryDialog = this.actions.pipe(
		ofType<CheckInAction.OpenSummaryDialog>( CheckInActionTypes.openSummaryDialog ),
		map( action => this.dialogManager.open( CheckInSummaryDialogComponent, {
			id: 'SummaryFormComponent',
			width: '600px'
		} ) ) );

	@Effect( { dispatch: false } ) public closeSummaryDialog = this.actions.pipe(
		ofType<CheckInAction.CloseSummaryDialog>( CheckInActionTypes.closeSummaryDialog ),
		map( action => this.dialogManager.getDialogById( 'SummaryFormComponent' ).close() ) );

	// @Effect() public changeStatus = this.actions.pipe(
	// 	ofType<CheckInAction.ChangeStatus>( CheckInActionTypes.changeStatus ),
	// 	map( action => ( { key: action.checkIn.key, status: action.status } ) ),
	// 	withLatestFrom( this.store.pipe( select( state => state.checkInState.list.find( item => item.status === CheckInStatuses.inProgress ) ) ) ),
	// 	switchMap( ( [ item, currentItem ] ) => item.status === CheckInStatuses.inProgress && currentItem && item.key != currentItem.key
	// 		? this.db.modifyFields( 'CheckIn', ( { key: currentItem.key, status: CheckInStatuses.completed } ) ).pipe( map( key => item ) )
	// 		: of( item ) ),
	// 	withLatestFrom( this.store.pipe( select( state => state.checkInState.list ) ) ),
	// 	map( ( [ item, list ] ) => ( { item, nextItem: list.find( lItem => lItem.status === CheckInStatuses.checkedIn && lItem.key !== item.key ) } ) ),
	// 	switchMap( ( { item, nextItem } ) => item.status === CheckInStatuses.completed && nextItem && item.key != nextItem.key
	// 		? this.db.modifyFields( 'CheckIn', ( { key: nextItem.key, status: CheckInStatuses.inProgress } ) ).pipe( map( key => item ) )
	// 		: of( item ) ),
	// 	switchMap( item => this.db.modifyFields( 'CheckIn', item ) ),
	// 	map( key => key
	// 		? new CheckInAction.ChangeStatusSuccess( key )
	// 		: new CheckInAction.ChangeStatusFailed() ) );

}
