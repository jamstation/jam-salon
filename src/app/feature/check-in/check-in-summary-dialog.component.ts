import { Component, ChangeDetectionStrategy } from '@angular/core';
import { first, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CheckIn } from '../../shared/model';
import { CheckInModuleState, CheckInAction } from './check-in.store';
import { sum } from '../../../jam/function-library';

@Component( {
	selector: 'app-check-in-summary-dialog',
	templateUrl: './check-in-summary-dialog.component.html',
	styleUrls: [ './check-in-summary-dialog.component.css' ],
	changeDetection: ChangeDetectionStrategy.Default
} )
export class CheckInSummaryDialogComponent
{

	public formItem: CheckIn;
	public totalPrice: number;
	public totalDuration: Date;
	public queueLength: number;
	public waitTime: Date;

	constructor ( private store: Store<CheckInModuleState> )
	{
		/**
		 * Store Selects
		 */
		this.store.pipe(
			select( state => state.checkInState.formItem ),
			withLatestFrom( this.store.pipe( select( state => state.checkInState.queueLength ) ),
				this.store.pipe( select( state => state.checkInState.waitTime ) ) ),
			first() )
			.subscribe( ( [ formItem, queueLength, waitTime ] ) =>
			{
				this.formItem = formItem;

				this.queueLength = queueLength;

				this.waitTime = new Date();
				this.waitTime.setHours( 0 );
				this.waitTime.setMinutes( waitTime );

				this.totalDuration = new Date();
				this.totalDuration.setHours( 0 );
				this.totalDuration.setMinutes( sum( ...this.formItem.serviceList.map( item => item.duration ) ) );

				this.totalPrice = sum( ...this.formItem.serviceList.map( item => item.price ) );
			} );

	}

	public close (): void
	{
		this.store.dispatch( new CheckInAction.CloseSummaryDialog() );
	}

}
