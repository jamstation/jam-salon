import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, switchMap, withLatestFrom, filter, tap, first, catchError } from 'rxjs/operators';
import { Action, Store, select } from '@ngrx/store';
import { Effect, Actions, ofType } from "@ngrx/effects";
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthModuleState } from './jam-auth.state';
import { AuthActionTypes, AuthAction } from "./jam-auth.actions";
import { NavigatorAction } from "../navigator";
import { User } from "./user.model";
import { DatabaseService, DatabaseAction } from "../firestore";
import { FirebaseError } from "@firebase/util";

@Injectable()
export class AuthEffects
{
	@Effect() initialize: Observable<Action>;
	@Effect() authenticated: Observable<Action>;
	@Effect() loadUser: Observable<Action>;
	@Effect() requestRegisterPage: Observable<Action>;
	@Effect() requestSignInPage: Observable<Action>;
	@Effect() register: Observable<Action>;
	@Effect() registered: Observable<Action>;
	@Effect() signIn: Observable<Action>;
	@Effect() signedIn: Observable<Action>;
	@Effect() signOut: Observable<Action>;
	@Effect() signedOut: Observable<Action>;
	@Effect() deleteUser: Observable<Action>;

	constructor (
		private actions: Actions,
		private store: Store<AuthModuleState>,
		private angularFireAuth: AngularFireAuth,
		private db: DatabaseService
	)
	{

		this.initialize = this.actions.pipe(
			ofType<AuthAction.Initialize>( AuthActionTypes.initialize ),
			switchMap( action => this.angularFireAuth.authState ),
			map( firebaseUser => firebaseUser ? ( {
				key: firebaseUser.uid,
				email: firebaseUser.email,
				displayName: firebaseUser.displayName,
				photoURL: firebaseUser.photoURL,
				phoneNumber: firebaseUser.phoneNumber
			} ) : null ),
			map( ( user: User ) => user
				? new AuthAction.Authenticated( user )
				: new AuthAction.Deauthenticated() ) );

		this.authenticated = this.actions.pipe(
			ofType<AuthAction.Authenticated>( AuthActionTypes.authenticated ),
			switchMap( action => this.store.pipe(
				select( state => state.databaseState.initialized ),
				filter( initialized => initialized ),
				first(),
				map( initialized => action ) ) ),
			withLatestFrom( this.store.pipe( select( state => state.authState.userTableName ) ) ),
			switchMap( ( [ action, userTableName ] ) => action.user ? db.forceLookup<User>( userTableName, action.user ) : of<User>( null ) ),
			map( user => new AuthAction.LoadedUser( user ) )
		);

		this.loadUser = this.actions.pipe(
			ofType<AuthAction.LoadedUser>( AuthActionTypes.loadedUser ),
			map( action => new DatabaseAction.EnterCollection( 'User', action.user.key ) )
		);

		this.requestRegisterPage = this.actions.pipe(
			ofType<AuthAction.RequestRegisterPage>( AuthActionTypes.requestRegisterPage ),
			withLatestFrom( this.store.pipe( select( state => state.authState.registerPage ) ) ),
			map( ( [ action, registerPage ] ) => registerPage ),
			filter( registerPage => !!registerPage ),
			map( registerPage => new NavigatorAction.Navigate( registerPage ) ) );

		this.requestSignInPage = this.actions.pipe(
			ofType<AuthAction.RequestSignInPage>( AuthActionTypes.requestSignInPage ),
			withLatestFrom( this.store.pipe( select( state => state.authState.signInPage ) ) ),
			map( ( [ action, signInPage ] ) => signInPage ),
			filter( signInPage => !!signInPage ),
			map( signInPage => new NavigatorAction.Navigate( signInPage ) ) );

		this.register = this.actions.pipe(
			ofType<AuthAction.Register>( AuthActionTypes.register ),
			switchMap( action => this.angularFireAuth.auth.createUserWithEmailAndPassword( action.credential.email, action.credential.password ) ),
			catchError( ( error: FirebaseError ) => of( { ...error, isError: true } ) ),
			map( data => data && data.isError
				? new AuthAction.RegisterFailed( data )
				: new AuthAction.Registered() ) );

		this.registered = this.actions.pipe(
			ofType<AuthAction.Registered>( AuthActionTypes.registered ),
			withLatestFrom( this.store.pipe( select( state => state.authState.redirectUrl ) ) ),
			map( ( [ action, redirectUrl ] ) => new NavigatorAction.RouteResolved( redirectUrl ) ) );

		this.signIn = this.actions.pipe(
			ofType<AuthAction.SignIn>( AuthActionTypes.signIn ),
			switchMap( action => this.angularFireAuth.auth.signInWithEmailAndPassword( action.credential.email, action.credential.password ) ),
			catchError( ( error: FirebaseError ) => of( { ...error, isError: true } ) ),
			map( data => data && data.isError
				? new AuthAction.SignInFailed( data )
				: new AuthAction.SignedIn() ) );

		this.signedIn = this.actions.pipe(
			ofType<AuthAction.SignedIn>( AuthActionTypes.signedIn ),
			withLatestFrom( this.store.pipe( select( state => state.authState.redirectUrl ) ) ),
			map( ( [ action, redirectUrl ] ) => new NavigatorAction.RouteResolved( redirectUrl ) ) );

		this.signOut = this.actions.pipe(
			ofType<AuthAction.SignOut>( AuthActionTypes.signOut ),
			switchMap( action => this.angularFireAuth.auth.signOut() ),
			catchError( ( error: FirebaseError ) => of( { ...error, isError: true } ) ),
			map( data => data && data.isError
				? new AuthAction.SignOutFailed( data )
				: new AuthAction.SignedOut() ) );

		this.signedOut = this.actions.pipe(
			ofType<AuthAction.SignedOut>( AuthActionTypes.signedOut ),
			map( action => new NavigatorAction.RouteResolved( '/' ) ) );

		this.deleteUser = this.actions.pipe(
			ofType<AuthAction.DeleteUser>( AuthActionTypes.deleteUser ),
			switchMap( action => this.angularFireAuth.auth.currentUser.delete() ),
			map( ( error: FirebaseError ) => !error.code
				? new AuthAction.DeletedUser()
				: new AuthAction.DeleteUserFailed( error ) ) );

	}
}
