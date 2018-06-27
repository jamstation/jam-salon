import { Injectable } from "@angular/core";
import { ObservableMedia } from "@angular/flex-layout";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { JamLayoutActionTypes, JamLayoutAction } from "./jam-layout.actions";
import { ScreenSizes } from "../../jam/model-library";

@Injectable()
export class JamLayoutEffects
{
	@Effect() public initialize: Observable<Action>;

	constructor (
		private actions: Actions,
		private observableMedia: ObservableMedia
	)
	{

		this.initialize = this.actions.pipe(
			ofType<JamLayoutAction.Initialize>( JamLayoutActionTypes.initialize ),
			switchMap( action => this.observableMedia.asObservable() ),
			map( mediaChange => mediaChange.mqAlias as ScreenSizes ),
			map( screenSize => new JamLayoutAction.ScreenSizeChanged( screenSize ) )
		);

	}
}
