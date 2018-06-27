import { Injectable } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Observable } from "rxjs";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthModuleState } from './jam-auth.state';
import { AuthAction } from "./jam-auth.actions";
import { first, tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate
{

	constructor ( private store: Store<AuthModuleState> ) { }

	canActivate ( activatedRouteSnapshot: ActivatedRouteSnapshot,
		routerStateSnapshot: RouterStateSnapshot ): Observable<boolean>
	{

		/**
		 * Get authentication
		 * If not authenticated, route to sign-in page
		 */
		return this.store.pipe(
			select( state => state.authState.authenticated ),
			first(),
			tap( authenticated =>
			{
				console.log( '[AuthGuard]', 'Let me in?', authenticated );
				if ( !authenticated ) {
					this.store.dispatch( new AuthAction.RequestSignInPage( routerStateSnapshot.url ) );
				}
			} ) );

	}

}
