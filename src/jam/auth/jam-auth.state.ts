import { User } from "./user.model";
import { Table, DatabaseModuleState } from "../firestore";
import { JamError } from "../model-library";

export interface AuthModuleState extends DatabaseModuleState
{
	authState: AuthState;
}

export interface AuthState
{
	authenticated: boolean;
	user: User,
	userTableName: string;
	registerPage: string;
	signInPage: string;
	redirectUrl: string;
	uiWidth: string;
	uiHeight: string;
	lastError: JamError;

	loading: boolean;
	initialized: boolean;
	registering: boolean;
	signingIn: boolean;
	signingOut: boolean;
	deletingUser: boolean;
}
