import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper, MatSelectionList } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { map, first, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CheckIn, Service, Stylist, CheckInStatuses } from '../../shared/model';
import { CheckInModuleState, CheckInAction } from './check-in.store';
import { isToday, sum } from '../../../jam/function-library';

@Component( {
	selector: 'app-appointment-form',
	templateUrl: './appointment-form.component.html',
	styleUrls: [ './appointment-form.component.css' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AppointmentFormComponent implements AfterViewInit
{

	@ViewChild( 'stepper' ) stepper: MatStepper;
	@ViewChild( MatSelectionList ) serviceListViewChild: MatSelectionList;
	private readonly checkInStep: number;
	private readonly summaryStep: number;
	public stepperNextButtonText: string;
	public serviceListOpen: boolean;
	public form: FormGroup;
	public formItem: CheckIn;
	public creating: boolean;
	public checkInTimeList: Observable<Date[]>;
	public serviceList: Observable<Service[]>;
	public stylistList: Observable<Stylist[]>;
	public morningSlotList: Date[];
	public eveningSlotList: Date[];
	public selectedSlot: Date;
	public minuteSplitList: string[];
	public totalPrice: number;
	public totalDuration: Date;

	constructor ( private store: Store<CheckInModuleState>, private formBuilder: FormBuilder )
	{
		/**
		 * Init
		 */
		this.checkInStep = 2;
		this.summaryStep = 3;
		this.stepperNextButtonText = 'Next';

		this.minuteSplitList = [ '00', '15', '30', '45' ];

		const today = new Date();
		this.morningSlotList = [];
		for ( var hour = 7; hour <= 12; hour++ ) {
			[ 0 ].forEach( min => this.morningSlotList.push( new Date( today.getFullYear(), today.getMonth(), today.getDate(), hour, min ) ) );
		}

		this.eveningSlotList = [];
		for ( var hour = 1; hour <= 10; hour++ ) {
			[ 0 ].forEach( min => this.eveningSlotList.push( new Date( today.getFullYear(), today.getMonth(), today.getDate(), hour + 12, min ) ) );
		}

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
				this.formItem.time.setHours( 0 );
				this.formItem.time.setMinutes( 0 );
				this.formItem.time.setSeconds( 0 );
				this.formItem.time.setMilliseconds( 0 );
				this.selectDate( this.formItem.time );
			} );

		this.checkInTimeList = this.store.pipe(
			select( state => state.checkInState.list ),
			first(),
			map( list => list.map( item => item.time ) )
		);

		this.serviceList = this.store.pipe(
			select( state => state.checkInState.serviceList ),
			first() );

		this.stylistList = this.store.pipe(
			select( state => state.checkInState.stylistList ),
			first() );

	}

	public ngAfterViewInit (): void
	{
		this.stepper.selectionChange.subscribe( ( stepperEvent: StepperSelectionEvent ) =>
		{
			switch ( stepperEvent.selectedIndex ) {
				case this.checkInStep:
					this.stepperNextButtonText = 'Check In';
					break;
				case this.summaryStep:
					this.stepperNextButtonText = 'Close';
					break;
				default:
					this.stepperNextButtonText = 'Next';
					break;
			}
		} )

	}

	public nextStepper (): void
	{
		switch ( this.stepper.selectedIndex ) {
			case this.checkInStep:
				this.submit();
				break;
			case this.summaryStep:
				this.close();
				break;
			default:
				this.stepper.next();
				break;
		}
	}

	public submit (): void
	{
		console.log( 'trying to submit' );
		console.log( this.serviceListViewChild.selectedOptions.selected );
		// if ( !this.formItem.token ) return;

		const serviceList = this.serviceListViewChild.selectedOptions.selected.map( item => item.value );
		let token = this.formItem.time.toTimeString().slice( 0, 5 ).replace( /:/g, '' );
		token += '1'; // stylist todo

		if ( !isToday( this.formItem.time ) ) {
			token += this.formItem.time.toJSON().split( 'T' )[ 0 ].replace( /-/g, '' );;
		}

		this.formItem = {
			...this.formItem,
			token: token,
			status: CheckInStatuses.checkedIn,
			name: this.form.get( 'name' ).value,
			phone: this.form.get( 'phone' ).value,
			serviceList: serviceList
		};

		console.log( this.formItem );

		this.totalDuration = new Date();
		this.totalDuration.setHours( 0 );
		this.totalDuration.setMinutes( sum( ...this.formItem.serviceList.map( item => item.duration ) ) );
		this.totalPrice = sum( ...this.formItem.serviceList.map( item => item.price ) );
		// this.creating
		// 	? this.store.dispatch( new CheckInAction.Add( this.formItem ) )
		// 	: this.store.dispatch( new CheckInAction.Modify( this.formItem ) );

		this.stepper.selectedIndex = this.summaryStep;
	}

	public cancel (): void
	{
		this.store.dispatch( new CheckInAction.CancelEdit() );
	}

	public close (): void
	{
		this.store.dispatch( new CheckInAction.CancelEdit() );
	}

	public selectDate ( selectedDate: Date ): void
	{
		console.log( selectedDate );
		this.formItem.time = selectedDate;
		this.morningSlotList = this.morningSlotList.map( item => new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth(),
			selectedDate.getDate(),
			item.getHours(),
			item.getMinutes() ) );
		this.eveningSlotList = this.eveningSlotList.map( item => new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth(),
			selectedDate.getDate(),
			item.getHours(),
			item.getMinutes() ) );
	}

	public selectSlot ( slot: Date, minuteSplit: string ): void
	{
		this.formItem.time.setHours( slot.getHours() );
		this.formItem.time.setMinutes( Number( minuteSplit ) || 0 );
		this.formItem.time = new Date( this.formItem.time.getTime() );
		slot.setMinutes( Number( minuteSplit ) || 0 );
	}

}
