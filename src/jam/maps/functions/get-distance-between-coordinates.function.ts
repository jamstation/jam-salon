import { MapCoordinates } from "../models";
import { degToRad } from "../../function-library";

export function getDistanceBetweenCoordinates ( from: MapCoordinates, to: MapCoordinates, inMeters: boolean = false ): number
{
	const R = 6378137; // Earth’s mean radius in meter
	const distanceBetweenLats = degToRad( to.lat - from.lat );
	const distanceBetweenLngs = degToRad( to.lng - from.lng );
	const result1 = Math.sin( distanceBetweenLats / 2 ) * Math.sin( distanceBetweenLats / 2 ) +
		Math.cos( degToRad( from.lat ) ) * Math.cos( degToRad( to.lat ) ) *
		Math.sin( distanceBetweenLngs / 2 ) * Math.sin( distanceBetweenLngs / 2 );
	const distanceInMeters = 2 * Math.atan2( Math.sqrt( result1 ), Math.sqrt( 1 - result1 ) ) * R;
	const distance = inMeters ? distanceInMeters : distanceInMeters / 1000;
	alert( distance );
	return distance;
}
