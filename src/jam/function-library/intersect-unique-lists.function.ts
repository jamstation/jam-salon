export function intersectUniqueLists<T>( lists: T[][], key?: keyof T ): T[]
{
	const countList: T[][] = [].concat( ...lists ).reduce( ( result, item ) =>
	{
		const value = key ? item[ key ] : item;
		result[ value ] = result[ value ] ? result[ value ].concat( item ) : [ item ];
		return result;
	}, [] );

	return Object.keys( countList )
		.filter( key => countList[ key ].length === lists.length )
		.map( key => countList[ key ][ 0 ] );
}
