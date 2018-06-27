import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import
{
	MatIconModule,
	MatButtonModule,
	MatGridListModule,
	MatDialogModule,
	MatCardModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import { routes } from './salon.routes';
import { SalonModuleReducer, SalonModuleEffects } from './salon.store';
import { SalonService } from './salon.service';
import { SalonComponent } from './salon.component';
// import { CheckInModule } from '../check-in';

@NgModule( {
	declarations: [ SalonComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatGridListModule,
		MatDialogModule,
		MatCardModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'salonParentState', SalonModuleReducer ),
		EffectsModule.forFeature( SalonModuleEffects ),
		AgmCoreModule,
		// CheckInModule
	],
	providers: [ SalonService ]
} )
export class SalonModule { }
