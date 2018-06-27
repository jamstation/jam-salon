import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { NavigatorAction } from "src/jam/navigator";
import { Pages } from "src/app/shared/model";
import { HomeAction, HomeActionTypes } from "./home.store";

@Injectable()
export class HomeEffects
{

	constructor (
		private actions: Actions
	) { }

	@Effect() private search = this.actions.pipe(
		ofType<HomeAction.Search>( HomeActionTypes.search ),
		map( action => new NavigatorAction.Navigate( Pages.search, [ { key: 'location', value: action.placeId } ] ) ) );

}
