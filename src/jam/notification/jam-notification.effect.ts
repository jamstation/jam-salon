import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material";
import { Action, Store } from "@ngrx/store";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { NotificationModuleState } from './jam-notification.state';
import { NotificationAction, NotificationActionTypes } from './jam-notification.action';

@Injectable()
export class NotificationEffects
{
	@Effect() public open$: Observable<Action>;

	constructor (
		private actions$: Actions,
		private store: Store<NotificationModuleState>,
		private matSnackBar: MatSnackBar
	)
	{

		this.open$ = this.actions$.pipe(
			ofType<NotificationAction.Open>( NotificationActionTypes.open ),
			withLatestFrom(
				this.store.select( state => state.notificationState.defaultMessage ),
				this.store.select( state => state.notificationState.horizontalPosition ),
				this.store.select( state => state.notificationState.verticalPosition ),
				this.store.select( state => state.notificationState.viewContainerRef )
			),
			map( ( [ action, defaultMessage, horizontalPosition, verticalPosition, viewContainerRef ] ) => this.matSnackBar.open(
				action.message || ( action.config && action.config.content ) || defaultMessage.content,
				( action.config && action.config.action ) || defaultMessage.action,
				{
					duration: ( action.config && action.config.duration ) || defaultMessage.duration,
					horizontalPosition: horizontalPosition,
					verticalPosition: verticalPosition,
					viewContainerRef: viewContainerRef
				} ) ),
			switchMap( snackBar => snackBar.afterDismissed() ),
			map( closed => new NotificationAction.Closed() ) );
	}

}
