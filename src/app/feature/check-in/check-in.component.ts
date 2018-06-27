import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CheckIn, CheckInStatuses } from '../../shared/model';
import { CheckInModuleState, CheckInAction } from './check-in.store';

@Component( {
	selector: 'app-check-in',
	templateUrl: './check-in.component.html',
	styleUrls: [ './check-in.component.css' ]
} )
export class CheckInComponent
{

	public list: Observable<CheckIn[]>;
	public statuses: string[];

	constructor ( private store: Store<CheckInModuleState> )
	{
		/**
		 * Init
		 */
		this.statuses = Object.keys( CheckInStatuses ).map( key => CheckInStatuses[ key ] );

		/**
		 * Store Selects
		 */
		this.list = this.store.pipe( select( state => state.checkInState.list ) );

		/**
		 * Store Dispatches
		 */
		this.store.dispatch( new CheckInAction.Load() );
	}

	public create (): void
	{
		this.store.dispatch( new CheckInAction.Create() );
	}

	public edit ( checkIn: CheckIn ): void
	{
		this.store.dispatch( new CheckInAction.Edit( checkIn ) );
	}

	public changeStatus ( checkIn: CheckIn, status: CheckInStatuses ): void
	{
		this.store.dispatch( new CheckInAction.ChangeStatus( checkIn, status ) );
	}

}
