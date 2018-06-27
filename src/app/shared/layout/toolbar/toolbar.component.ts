import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { User } from '../../../../jam/auth';
import { AppModuleState } from '../../../app.store';
import { Pages } from '../../model';
import { app } from 'src/environments/environment';
import { NavigatorAction } from '../../../../jam/navigator';

@Component( {
	selector: 'app-layout-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: [ './toolbar.component.css' ]
} )
export class ToolbarComponent implements OnInit
{

	public user: Observable<User>;
	public pages = Pages;
	public appTitle = app.title;

	constructor ( private store: Store<AppModuleState> ) { }

	public ngOnInit ()
	{
		this.user = this.store.pipe( select( state => state.authState.user ) );
	}

	public goto ( page: Pages ): void
	{
		const navItem = { text: '', link: page };
		this.store.dispatch( new NavigatorAction.Navigate( navItem.link ) );
	}

}
