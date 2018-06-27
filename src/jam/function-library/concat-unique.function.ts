export function concatUnique<T>( ...items: ReadonlyArray<T>[] ): T[]
{
	items = items.map( item => item || [] );
	const concatenatedList: T[] = Array.prototype.concat( ...items );
	const uniqueConcatenatedList = Array.from( new Set<T>( concatenatedList ) );
	return uniqueConcatenatedList;
}