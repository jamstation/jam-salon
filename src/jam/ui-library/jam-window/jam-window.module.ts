import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import
{
	MatIconModule
} from '@angular/material';
import { JamWindowComponent } from './jam-window.component';

@NgModule( {
	declarations: [
		JamWindowComponent
	],
	imports: [
		CommonModule,
		MatIconModule
	],
	exports: [
		JamWindowComponent
	]
} )
export class JamWindowModule { }
