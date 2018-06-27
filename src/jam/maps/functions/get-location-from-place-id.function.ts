import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { MapLocation } from '../models';

export function getLocationFromPlaceId ( mapsAPILoader: MapsAPILoader, placeId: string ): Observable<MapLocation>
{

	return from( mapsAPILoader.load() ).pipe(
		map( () => new google.maps.Geocoder() ),
		map( geocoder => new Promise<google.maps.GeocoderResult[]>( ( resolve, reject ) =>
			geocoder.geocode( { placeId: placeId }, ( results, status ) => resolve( results ) ) ) ),
		switchMap( geocoderPromise => geocoderPromise ),
		map( results => results[ 0 ] ),
		map( address => ( {
			placeId: address.place_id,
			text: address.formatted_address,
			coordinates: {
				lat: address.geometry.location.lat(),
				lng: address.geometry.location.lng()
			}
		} ) ) );

}
