import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { HomeModuleState } from './home.state';
import { MapLocation } from 'src/jam/maps';
import { HomeAction } from './home.store';

@Component( {
	selector: 'app-search-box',
	templateUrl: './search-box.component.html',
	styleUrls: [ './search-box.component.css' ]
} )
export class SearchBoxComponent
{

	public suggestionList: MapLocation[];
	public selectedPlaceId: Subject<string> = new Subject();
	public displayWithFn = ( suggestion: MapLocation ) => suggestion.text;

	constructor ( private store: Store<HomeModuleState> ) { }

	public selectSuggestion ( event: MatAutocompleteSelectedEvent )
	{
		const location = event.option.value as MapLocation;
		this.store.dispatch( new HomeAction.Search( location.placeId ) );
	}

}
