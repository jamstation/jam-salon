import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { FirestoreError } from "@firebase/firestore-types";
import { of } from "rxjs";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { MapsAPILoader } from "@agm/core";
import { DatabaseService } from "src/jam/firestore";
import { getLocationFromPlaceId } from "src/jam/maps";
import { Salon, Tables } from "src/app/shared/model";
import { SalonActionTypes, SalonAction } from "./salon.actions";

@Injectable()
export class SalonEffects
{

	constructor (
		private actions: Actions,
		private db: DatabaseService,
		private mapsAPILoader: MapsAPILoader
	) { }

	@Effect() public load = this.actions.pipe(
		ofType<SalonAction.Load>( SalonActionTypes.load ),
		switchMap( action => this.db.list<Salon>( Tables.Salon ).pipe(
			map( list => new SalonAction.LoadSuccess( list ) ),
			catchError( ( error: FirestoreError ) => of( new SalonAction.LoadFailed( error ) ) )
		) ) );

	@Effect() public getLocation = this.actions.pipe(
		ofType<SalonAction.GetLocation>( SalonActionTypes.getLocation ),
		switchMap( action => getLocationFromPlaceId( this.mapsAPILoader, action.placeId ) ),
		map( location => new SalonAction.GetLocationSuccess( location ) ) );

}
