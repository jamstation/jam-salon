export function intersectLists<T>( lists: T[][], key?: keyof T ): T[]
{
	const smallestList = lists.reduce( ( result, list ) => ( list.length < result.length ) ? list : result, [] );

	return key
		? smallestList.reduce( ( result, item ) =>
		{
			const value: T = key ? item[ key as string ] : item;
			const foundInAllLists = lists.every( refList => !!refList.find( refItem =>
			{
				const refValue: T = key ? refItem[ key as string ] : refItem;
				return value == refValue;
			} ) );
			return foundInAllLists ? result.concat( item ) : result;
		}, [] )
		: smallestList.reduce( ( result, item ) => lists.every( refList => refList.includes( item ) )
			? result.concat( item )
			: result, [] );
}
