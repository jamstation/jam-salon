import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { KeyValue } from '../../model-library';
import { JamTextBoxDialogData } from './jam-text-box-dialog-data.model';

@Component( {
	selector: 'jam-text-box-dialog',
	templateUrl: './jam-text-box-dialog.component.html',
	styleUrls: [ './jam-text-box-dialog.component.css' ]
} )
export class JamTextBoxDialogComponent implements OnInit
{

	public form: FormGroup;

	constructor (
		@Inject( MAT_DIALOG_DATA ) public data: JamTextBoxDialogData,
		private dialog: MatDialogRef<JamTextBoxDialogComponent, KeyValue>
	) { }

	ngOnInit (): void
	{
		this.form = new FormGroup( {
			value: new FormControl( this.data.value, this.data.validators || [] )
		} );
	}

	public _submit (): void
	{
		const value = this.form.get( 'value' ).value;
		const result: KeyValue = ( value == this.data.value )
			? undefined
			: {
				key: this.data.key,
				value: value
			};

		this.dialog.close( result );
	}

}
