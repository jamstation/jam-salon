import { JamError } from "src/jam/model-library";
import { MapLocation } from "src/jam/maps";
import { Salon } from "src/app/shared/model/salon.model";

export interface SalonState
{
	processing: boolean;
	creating: boolean;
	lastError: JamError;

	list: Salon[];
	selectedItem: Salon;
	userLocation: MapLocation
}
