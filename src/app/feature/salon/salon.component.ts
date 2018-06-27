import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { share, map, filter, tap } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import { ScreenSizes, MatGridData } from '../../../jam/model-library';
import { MapLocation } from 'src/jam/maps';
import { Salon } from '../../shared/model';
import { CheckInAction } from '../check-in';
import { SalonModuleState } from './salon.store';
import { SalonAction } from './salon.actions';
import { getDistanceBetweenCoordinates } from '../../../jam/maps/functions/get-distance-between-coordinates.function';

@Component( {
	selector: 'app-salon',
	templateUrl: './salon.component.html',
	styleUrls: [ './salon.component.css' ]
} )
export class SalonComponent implements OnInit, OnDestroy
{

	public list: Observable<Salon[]>;
	public selectedItem: Observable<Salon>;
	public userLocation: Observable<MapLocation>;
	public paramsSubscription: Subscription;

	constructor ( private store: Store<SalonModuleState>, private activatedRoute: ActivatedRoute, private mapsAPILoader: MapsAPILoader ) { }

	public ngOnInit (): void
	{
		/**
		 * Init
		 */
		const params = this.activatedRoute.params.pipe(
			map( params => params[ 'location' ] ),
			filter( placeId => !!placeId ),
		);

		/**
		 * Store Dispatches
		 */
		this.store.dispatch( new SalonAction.Load() );
		this.paramsSubscription = params.subscribe( placeId => this.store.dispatch( new SalonAction.GetLocation( placeId ) ) );

		/**
		 * Store Selects
		 */
		this.list = this.store.pipe( select( state => state.salonParentState.salonState.list ) );
		this.selectedItem = this.store.pipe( select( state => state.salonParentState.salonState.selectedItem ), share() );
		this.userLocation = this.store.pipe( select( state => state.salonParentState.salonState.userLocation ) );

		this.userLocation.pipe(
			filter( l => !!l && !!l.coordinates )
		)
			.subscribe( l => alert( getDistanceBetweenCoordinates( l.coordinates, { lat: 8.817318, lng: 78.129295 } ) ) )
	}

	public ngOnDestroy (): void
	{
		this.paramsSubscription.unsubscribe();
	}

	public select ( salon: Salon ): void
	{
		this.store.dispatch( new SalonAction.Select( salon ) );
	}

	public create (): void
	{
		this.store.dispatch( new CheckInAction.Create() );
	}

	// private setUserLocation (): void
	// {
	// 	if ( !navigator.geolocation ) return;
	// 	navigator.geolocation.getCurrentPosition( position =>
	// 	{
	// 		this.userLocation = {
	// 			text: '',
	// 			placeId: null,
	// 			coordinates: {
	// 				lat: position.coords.latitude,
	// 				lng: position.coords.longitude
	// 			}
	// 		}
	// 		console.log( 'setting user location to ', this.userLocation.coordinates );
	// 	} );
	// }

}
