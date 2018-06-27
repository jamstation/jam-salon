import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { JamConfirmDialogComponent } from './jam-confirm-dialog.component';

@NgModule( {
	imports: [ MatDialogModule, MatButtonModule ],
	declarations: [ JamConfirmDialogComponent ],
	exports: [ JamConfirmDialogComponent ]
} )
export class JamConfirmDialogModule { }
