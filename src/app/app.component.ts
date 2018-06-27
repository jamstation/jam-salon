import { Component } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { filter, first, map, withLatestFrom } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import { AuthAction, User } from '../jam/auth';
import { DatabaseAction, Table } from '../jam/firestore';
import { NavigatorAction } from '../jam/navigator';
import { NotificationAction } from '../jam/notification';
import { JamLayoutAction } from '../jam/layout';
import { database, app, notificationConfig } from '../environments/environment';
import { Tables } from './shared/model/tables.enum';
import { Pages } from './shared/model/pages.enum';
import { AppModuleState } from './app.store';

@Component( {
	selector: 'app-root',
	template: '<router-outlet></router-outlet>'
} )
export class AppComponent
{
	constructor ( private store: Store<AppModuleState>, private mapsAPILoader: MapsAPILoader )
	{
		/**
		 * Initialize External Modules
		 */
		this.mapsAPILoader.load();

		/**
		 * Initialize Eager Modules
		 */
		this.store.dispatch( new NavigatorAction.Initialize( Pages ) );

		this.store.dispatch( new DatabaseAction.Initialize( database.config.metadataPath ) );

		this.store.dispatch( new NotificationAction.Initialize(
			notificationConfig.defaultMessage,
			notificationConfig.horizontalPosition as MatSnackBarHorizontalPosition,
			notificationConfig.verticalPosition as MatSnackBarVerticalPosition
		) );

		this.store.dispatch( new JamLayoutAction.Initialize() );

		this.store.dispatch( new AuthAction.Initialize(
			Tables.User,
			Pages.register,
			Pages.signIn
		) );
	}
}
