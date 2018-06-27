import { Credential } from "./credential.model";
import { User } from "./user.model";
import { Table } from "../firestore";
import { JamError } from "../model-library";

export const enum AuthActionTypes
{
	initialize = '[Auth] initialize',
	initialized = '[Auth] initialized',
	initializeFailed = '[Auth] initializeFailed',
	authenticated = '[Auth] authenticated',
	deauthenticated = '[Auth] deauthenticated',
	loadedUser = '[Auth] loadedUser',
	requestRegisterPage = '[Auth] requestRegisterPage',
	register = '[Auth] register',
	registered = '[Auth] registered',
	registerFailed = '[Auth] registerFailed',
	requestSignInPage = '[Auth] requestSignInPage',
	signIn = '[Auth] signIn',
	signedIn = '[Auth] signedIn',
	signInFailed = '[Auth] signInFailed',
	signOut = '[Auth] signOut',
	signedOut = '[Auth] signedOut',
	signOutFailed = '[Auth] signOutFailed',
	deleteUser = '[Auth] deleteUser',
	deletedUser = '[Auth] deletedUser',
	deleteUserFailed = '[Auth] deleteUserFailed'
}

export namespace AuthAction
{
	export class Initialize { public readonly type = AuthActionTypes.initialize; constructor ( public userTableName: string, public registerPage?: string, public signInPage?: string, public width: string = '500px', public height: string = '400px' ) { } }
	export class Initialized { public readonly type = AuthActionTypes.initialized; constructor () { } }
	export class InitializeFailed { public readonly type = AuthActionTypes.initializeFailed; constructor () { } }
	export class Authenticated { public readonly type = AuthActionTypes.authenticated; constructor ( public user: User ) { } }
	export class Deauthenticated { public readonly type = AuthActionTypes.deauthenticated; constructor () { } }
	export class LoadedUser { public readonly type = AuthActionTypes.loadedUser; constructor ( public user: User ) { } }
	export class RequestRegisterPage { public readonly type = AuthActionTypes.requestRegisterPage; constructor ( public redirectUrl?: string ) { } }
	export class Register { public readonly type = AuthActionTypes.register; constructor ( public credential: Credential ) { } }
	export class Registered { public readonly type = AuthActionTypes.registered; constructor () { } }
	export class RegisterFailed { public readonly type = AuthActionTypes.registerFailed; constructor ( public error: JamError ) { } }
	export class RequestSignInPage { public readonly type = AuthActionTypes.requestSignInPage; constructor ( public redirectUrl?: string ) { } }
	export class SignIn { public readonly type = AuthActionTypes.signIn; constructor ( public credential: Credential ) { } }
	export class SignedIn { public readonly type = AuthActionTypes.signedIn; constructor () { } }
	export class SignInFailed { public readonly type = AuthActionTypes.signInFailed; constructor ( public error: JamError ) { } }
	export class SignOut { public readonly type = AuthActionTypes.signOut; constructor () { } }
	export class SignedOut { public readonly type = AuthActionTypes.signedOut; constructor () { } }
	export class SignOutFailed { public readonly type = AuthActionTypes.signOutFailed; constructor ( public error: JamError ) { } }
	export class DeleteUser { public readonly type = AuthActionTypes.deleteUser; constructor () { } }
	export class DeletedUser { public readonly type = AuthActionTypes.deletedUser; constructor () { } }
	export class DeleteUserFailed { public readonly type = AuthActionTypes.deleteUserFailed; constructor ( public error: JamError ) { } }

	export type All
		= Initialize
		| Initialized
		| InitializeFailed
		| Authenticated
		| Deauthenticated
		| LoadedUser
		| RequestRegisterPage
		| Register
		| Registered
		| RegisterFailed
		| RequestSignInPage
		| SignIn
		| SignedIn
		| SignInFailed
		| SignOut
		| SignedOut
		| SignOutFailed
		| DeleteUser
		| DeletedUser
		| DeleteUserFailed
		;
}
