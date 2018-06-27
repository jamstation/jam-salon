import { JamError } from "src/jam/model-library";
import { MapLocation } from "src/jam/maps/models";
import { AppModuleState } from "../../app.store";

export interface HomeModuleState extends AppModuleState
{
	homeState: HomeState
}

export interface HomeState
{
	processing: boolean;
	creating: boolean;
	lastError: JamError;
	placeId: string;
}
