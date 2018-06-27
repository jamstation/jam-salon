import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { JamConfirmDialogData } from './jam-confirm-dialog-data.model';

@Component( {
	selector: 'jam-confirm-dialog',
	templateUrl: './jam-confirm-dialog.component.html',
	styleUrls: [ './jam-confirm-dialog.component.css' ]
} )
export class JamConfirmDialogComponent
{

	public form: FormGroup;

	constructor (
		@Inject( MAT_DIALOG_DATA ) public data: JamConfirmDialogData,
		private dialog: MatDialogRef<JamConfirmDialogComponent, boolean>
	) { }

	public _submit (): void
	{
		this.dialog.close( true );
	}

}
