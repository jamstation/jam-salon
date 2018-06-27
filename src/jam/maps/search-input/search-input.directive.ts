import { Directive, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { MapLocation } from '../models';

type AutocompleteService = google.maps.places.AutocompleteService;
type QueryAutocompletePrediction = google.maps.places.QueryAutocompletePrediction;
type PlacesServiceStatus = google.maps.places.PlacesServiceStatus;

@Directive( {
	selector: 'input[jamMapsSearchInput]'
} )
export class JamMapsSearchInputDirective implements OnInit
{

	@Output() public suggestionChange: EventEmitter<MapLocation[]> = new EventEmitter();
	@Output() public selectionChange: EventEmitter<MapLocation> = new EventEmitter();

	private autocompleteService: AutocompleteService;

	constructor ( private elementRef: ElementRef, private mapsAPILoader: MapsAPILoader ) { }

	public ngOnInit (): void
	{
		this.elementRef.nativeElement.type = "text";
		this.elementRef.nativeElement.autocorrect = "off";
		this.elementRef.nativeElement.autocapitalize = "off";
		this.elementRef.nativeElement.spellcheck = "off";

		this.mapsAPILoader.load().then( () =>
		{
			this.autocompleteService = new google.maps.places.AutocompleteService();
		} );
	}

	@HostListener( 'input', [ '$event.target.value' ] )
	public _inputChange ( inputText: string ): void
	{
		this.autocompleteService.getQueryPredictions( { input: inputText }, ( results, status ) =>
			this._suggestionChange( results, status ) );
	}

	public _suggestionChange ( results: QueryAutocompletePrediction[], status: PlacesServiceStatus ): void
	{
		if ( status !== google.maps.places.PlacesServiceStatus.OK ) return;

		const suggestions = results.map( item => ( { placeId: item.place_id, text: item.description } ) );

		this.suggestionChange.emit( suggestions );
	}

}
