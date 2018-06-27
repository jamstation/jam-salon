import { AuthState } from "./jam-auth.state";
import { AuthAction, AuthActionTypes } from "./jam-auth.actions";

const initialState: AuthState = {
	authenticated: false,
	userTableName: null,
	user: null,
	registerPage: null,
	signInPage: null,
	redirectUrl: '/',
	uiWidth: null,
	uiHeight: null,
	lastError: null,
	initialized: false,
	loading: false,
	registering: false,
	signingIn: false,
	signingOut: false,
	deletingUser: false
}

export function AuthReducer ( state = initialState, action: AuthAction.All ): AuthState
{
	switch ( action.type ) {
		case AuthActionTypes.initialize:
			return {
				...state,
				initialized: false,
				loading: true,
				userTableName: action.userTableName,
				registerPage: action.registerPage,
				signInPage: action.signInPage,
				uiWidth: action.width,
				uiHeight: action.height
			};
		case AuthActionTypes.initialized: return { ...state, initialized: true, loading: false };
		case AuthActionTypes.initializeFailed: return { ...state, initialized: false, loading: false };
		case AuthActionTypes.authenticated: return { ...state, authenticated: true };
		case AuthActionTypes.deauthenticated: return { ...state, authenticated: false, user: null };
		case AuthActionTypes.loadedUser: return { ...state, user: action.user };
		case AuthActionTypes.requestRegisterPage: return { ...state, redirectUrl: action.redirectUrl || state.redirectUrl };
		case AuthActionTypes.register: return { ...state, registering: true, loading: true };
		case AuthActionTypes.registered: return { ...state, registering: false, loading: false };
		case AuthActionTypes.registerFailed: return { ...state, registering: false, loading: false, lastError: action.error };
		case AuthActionTypes.requestSignInPage: return { ...state, redirectUrl: action.redirectUrl || state.redirectUrl };
		case AuthActionTypes.signIn: return { ...state, signingIn: true, loading: true };
		case AuthActionTypes.signedIn: return { ...state, signingIn: false, loading: false };
		case AuthActionTypes.signInFailed: return { ...state, signingIn: false, loading: false, lastError: action.error };
		case AuthActionTypes.signOut: return { ...state, signingOut: true, loading: true };
		case AuthActionTypes.signedOut: return { ...state, signingOut: false, loading: false };
		case AuthActionTypes.signOutFailed: return { ...state, signingOut: false, loading: false, lastError: action.error };
		case AuthActionTypes.deleteUser: return { ...state, deletingUser: true, loading: true };
		case AuthActionTypes.deletedUser: return { ...state, deletingUser: false, loading: false };
		case AuthActionTypes.deleteUserFailed: return { ...state, deletingUser: false, loading: false, lastError: action.error };
		default: return state;
	}
}
