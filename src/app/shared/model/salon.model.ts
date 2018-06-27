import { TableData } from "src/jam/model-library";
import { MapLocation } from "src/jam/maps";

export interface Salon extends TableData
{
	id: string;
	name: string;
	location: MapLocation;
	queueLength$: number;
	waitTime$: number;
	open$: boolean;
}
