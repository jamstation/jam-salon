import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AgmCoreModule } from '@agm/core';

import { JamFirestoreModule } from '../jam/firestore';
import { JamNavigatorModule } from '../jam/navigator';
import { JamNotificationModule } from '../jam/notification';
import { JamAuthModule } from '../jam/auth';
import { JamLayoutModule } from '../jam/layout';
import { environment, database, storeDevtoolsConfig, googleMapsConfig } from '../environments/environment';

import { routes } from './app.routes';
import { AppReducer, AppEffects } from './app.store';
import { AppComponent } from './app.component';

@NgModule( {
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot( routes ),
		StoreModule.forRoot( AppReducer ),
		EffectsModule.forRoot( AppEffects ),
		environment.production ? [] : StoreDevtoolsModule.instrument( storeDevtoolsConfig ),
		AgmCoreModule.forRoot( { apiKey: googleMapsConfig.apiKey, libraries: [ 'places' ] } ),
		JamFirestoreModule.forRoot( database.firebaseAppConfig ),
		JamAuthModule.forRoot(),
		JamNavigatorModule,
		JamNotificationModule,
		JamLayoutModule
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
