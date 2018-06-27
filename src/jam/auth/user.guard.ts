import { Injectable } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Observable } from "rxjs";
import { first, filter, map, tap } from "rxjs/operators";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from "@angular/router";
import { AuthModuleState } from './jam-auth.state';
import { AuthAction } from "./jam-auth.actions";

@Injectable()
export class UserGuard implements CanActivate, CanLoad
{

	constructor ( private store: Store<AuthModuleState> ) { }

	canActivate ( activatedRouteSnapshot: ActivatedRouteSnapshot,
		routerStateSnapshot: RouterStateSnapshot ): Observable<boolean>
	{

		/**
		 * Wait till user is loaded
		 */
		return this.store.pipe(
			select( state => state.authState.user ),
			filter( user => !!user ),
			map( user => !!user ),
			first(),
			tap( userLoaded => console.log( '[UserGuard]', 'User loaded?', userLoaded ) )
		);

	}

	canLoad ( route: Route ): Observable<boolean>
	{
		/**
		 * Wait till user is loaded
		 */
		return this.store.pipe(
			select( state => state.authState.user ),
			filter( user => !!user ),
			map( user => !!user ),
			first(),
			tap( userLoaded => console.log( '[UserGuard]', 'User loaded?', userLoaded ) )
		);
	}

}
