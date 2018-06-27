import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { JamErrorPageComponent } from './jam-error-page.component';

@NgModule( {
	declarations: [
		JamErrorPageComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		MatButtonModule,
		MatIconModule
	],
	exports: [
		JamErrorPageComponent
	]
} )
export class JamErrorPageModule { }
