import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { JamErrorAction } from '../../jam/model-library';
import { AuthActionTypes } from "../../jam/auth";
import { NotificationAction } from "../../jam/notification";
import { getErrorMessage } from "./error-messages";

@Injectable()
export class CoreEffects
{
	constructor ( private actions: Actions ) { }

	@Effect()
	showErrorNotification = this.actions.pipe(
		ofType<JamErrorAction>( AuthActionTypes.signInFailed, AuthActionTypes.registerFailed ),
		map( action => getErrorMessage( action.error.code ) ),
		map( errorMessage => new NotificationAction.Open( errorMessage ) ) );
}
