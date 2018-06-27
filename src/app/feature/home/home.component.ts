import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeModuleState } from './home.store';
import { HomeAction } from './home.actions';

@Component( {
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
} )
export class HomeComponent implements OnInit
{

	constructor ( private store: Store<HomeModuleState> ) { }

	public ngOnInit (): void
	{
	}

	public search ( geoLocationId: string ): void
	{
		this.store.dispatch( new HomeAction.Search( geoLocationId ) );
	}


}
