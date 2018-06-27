import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import
{
	MatIconModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatAutocompleteModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JamSearchInputModule } from '../../../jam/maps';

import { ToolbarModule } from '../../shared/layout';
import { routes } from './home.routes';
import { HomeReducer } from './home.store';
import { HomeEffects } from './home.effects';
import { HomeComponent } from './home.component';
import { SearchBoxComponent } from './search-box.component';

@NgModule( {
	declarations: [ HomeComponent, SearchBoxComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatAutocompleteModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'homeState', HomeReducer ),
		EffectsModule.forFeature( [ HomeEffects ] ),
		JamSearchInputModule,
		ToolbarModule
	]
} )
export class HomeModule { }
