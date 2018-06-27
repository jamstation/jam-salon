import { MapCoordinates } from "./map-coordinates.model";

export interface MapLocation
{
	placeId: string;
	text: string;
	coordinates?: MapCoordinates;
	country?: string;
}
