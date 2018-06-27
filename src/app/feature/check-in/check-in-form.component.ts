import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelectionList } from '@angular/material';
import { Observable } from 'rxjs';
import { map, first, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CheckIn, Service, CheckInStatuses } from '../../shared/model';
import { CheckInModuleState, CheckInAction } from './check-in.store';
import { sum } from '../../../jam/function-library';

@Component( {
	selector: 'app-check-in-form',
	templateUrl: './check-in-form.component.html',
	styleUrls: [ './check-in-form.component.css' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class CheckInFormComponent
{

	@ViewChild( MatSelectionList ) serviceListViewChild: MatSelectionList;
	public form: FormGroup;
	public formItem: CheckIn;
	public creating: boolean;
	public checkInTimeList: Observable<Date[]>;
	public serviceList: Observable<Service[]>;
	public totalPrice: number;
	public totalDuration: Date;

	constructor ( private store: Store<CheckInModuleState>, private formBuilder: FormBuilder )
	{
		/**
		 * Store Selects
		 */
		this.store.pipe(
			select( state => state.checkInState.formItem ),
			first(),
			withLatestFrom( this.store.pipe( select( state => state.checkInState.creating ) ) ) )
			.subscribe( ( [ formItem, creating ] ) =>
			{
				this.creating = creating;
				this.formItem = formItem;
				this.form = this.formBuilder.group( {
					name: [ this.formItem.name, Validators.required ],
					phone: [ this.formItem.phone ]
				} );
			} );

		this.checkInTimeList = this.store.pipe(
			select( state => state.checkInState.list ),
			first(),
			map( list => list.map( item => item.time ) )
		);

		this.serviceList = this.store.pipe(
			select( state => state.checkInState.serviceList ),
			first() );

	}

	public submit (): void
	{
		console.log( 'submitting' );

		this.formItem = {
			...this.formItem,
			token: this.formItem.time.toTimeString().replace( /:/g, '' ).slice( 0, 6 ),
			status: CheckInStatuses.checkedIn,
			name: this.form.get( 'name' ).value,
			phone: this.form.get( 'phone' ).value,
			serviceList: this.serviceListViewChild.selectedOptions.selected.map( item => item.value )
		};

		console.log( this.formItem );

		this.totalDuration = new Date();
		this.totalDuration.setHours( 0 );
		this.totalDuration.setMinutes( sum( ...this.formItem.serviceList.map( item => item.duration ) ) );
		this.totalPrice = sum( ...this.formItem.serviceList.map( item => item.price ) );
		this.creating
			? this.store.dispatch( new CheckInAction.Add( this.formItem ) )
			: this.store.dispatch( new CheckInAction.Modify( this.formItem ) );

	}

	public cancel (): void
	{
		this.store.dispatch( new CheckInAction.CancelEdit() );
	}

}
