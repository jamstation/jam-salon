import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { Action, Store, select } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { KeyValue } from "../../jam/model-library";
import { NavigatorState, NavigatorModuleState } from './jam-navigator.state';
import { NavigatorActionTypes, NavigatorAction } from './jam-navigator.actions';
import { flattenTree, concatUniqueKeys } from '../function-library';

@Injectable()
export class NavigatorEffects
{
	@Effect() public initialize$: Observable<Action>;
	@Effect() public navigate$: Observable<Action>;
	@Effect() public routeResolved$: Observable<Action>;
	@Effect() public navigateBack$: Observable<Action>;

	constructor ( private actions$: Actions,
		private store: Store<NavigatorModuleState>,
		private router: Router )
	{

		this.initialize$ = this.actions$.pipe(
			ofType<NavigatorAction.Initialize>( NavigatorActionTypes.initialize ),
			switchMap( action => this.router.events.pipe(
				filter( event => event instanceof NavigationEnd ),
				map( ( event: NavigationEnd ) => event.urlAfterRedirects ) ) ),
			map( newUrl =>
			{
				const rootRoute = this.router.routerState.root.firstChild;
				const params = this.getParams( rootRoute );
				return new NavigatorAction.Navigated( newUrl, params );
			} ) );

		this.navigate$ = this.actions$.pipe(
			ofType<NavigatorAction.Navigate>( NavigatorActionTypes.navigate ),
			withLatestFrom( this.store.pipe( select( state => state.navigatorState ) ) ),
			map( ( [ action, state ] ) =>
			{
				const pageNotFound = Object.keys( state.pages ).findIndex( key => state.pages[ key ] === action.page ) < 0;
				if ( pageNotFound ) return new NavigatorAction.RouteResolveFailed();
				const allParams = concatUniqueKeys( 'key', action.params || [], state.params || [] );
				const url = action.page
					.split( '/' )
					.map( urlPathItem => ( allParams.find( param => ( ':' + param.key ) == urlPathItem ) || { key: 'dummy', value: urlPathItem } ).value )
					.join( '/' );
				console.log( 'navigate-url:', url, allParams );
				return new NavigatorAction.RouteResolved( url, allParams );
			} ) );

		this.routeResolved$ = this.actions$.pipe(
			ofType<NavigatorAction.RouteResolved>( NavigatorActionTypes.routeResolved ),
			switchMap( action => this.router.navigateByUrl( action.page ) ),
			filter( navigated => navigated === null ),
			map( navigated => new NavigatorAction.NavigateRejected( 'duplicate request' ) ) );

		this.navigateBack$ = this.actions$.pipe(
			ofType( NavigatorActionTypes.navigateBack ),
			withLatestFrom( this.store.pipe( select( state => state.navigatorState.previousPage ) ) ),
			switchMap( ( [ action, previousPage ] ) => this.router.navigateByUrl( previousPage ) ),
			filter( navigated => navigated === null ),
			map( navigated => new NavigatorAction.NavigateRejected( 'duplicate request' ) ) );

	}

	private getParams ( route: ActivatedRoute ): KeyValue[]
	{
		if ( !route ) return [];
		const params = flattenTree( [ route ], 'params', 'children' )
			.map( props => Object.keys( props )
				.filter( propName => propName == '_value' )
				.map( _value => props[ _value ] )
				.map( param => Object.keys( param )
					.map( key => ( { key: key, value: param[ key ] } ) ) ) );

		let pa = new Array();
		params.forEach( param => param
			.forEach( p => pa.push( ...p ) ) );
		return concatUniqueKeys( 'key', pa );
	}

}
