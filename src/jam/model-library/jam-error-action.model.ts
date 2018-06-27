import { Action } from "@ngrx/store";
import { JamError } from "./jam-error.model";

export interface JamErrorAction extends Action
{
	error: JamError;
}
