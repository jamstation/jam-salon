import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import
{
	MatIconModule,
	MatButtonModule,
	MatToolbarModule
} from '@angular/material';
import { ToolbarComponent } from './toolbar.component';

@NgModule( {
	declarations: [ ToolbarComponent ],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatToolbarModule
	],
	exports: [ ToolbarComponent ]
} )
export class ToolbarModule { }
