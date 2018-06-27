import { ActionReducerMap } from "@ngrx/store";

import { DatabaseState, DatabaseReducer, DatabaseEffects } from "./../jam/firestore";
import { NavigatorState, NavigatorReducer, NavigatorEffects } from "./../jam/navigator";
import { NotificationState, NotificationReducer, NotificationEffects } from "./../jam/notification";
import { AuthState, AuthReducer, AuthEffects } from "./../jam/auth";
import { JamLayoutState, JamLayoutReducer, JamLayoutEffects } from "../jam/layout";
import { CoreEffects } from "./core/core.effects";

/**
 * All States
 */
export interface AppModuleState
{
	databaseState: DatabaseState;
	navigatorState: NavigatorState;
	notificationState: NotificationState;
	authState: AuthState;
	jamLayoutState: JamLayoutState
}

/**
 * All Reducers
 */
export const AppReducer: ActionReducerMap<AppModuleState> = {
	databaseState: DatabaseReducer,
	navigatorState: NavigatorReducer,
	notificationState: NotificationReducer,
	authState: AuthReducer,
	jamLayoutState: JamLayoutReducer
};

/**
 * All Effects
 */
export const AppEffects = [
	DatabaseEffects,
	NavigatorEffects,
	NotificationEffects,
	AuthEffects,
	JamLayoutEffects,
	CoreEffects
];
