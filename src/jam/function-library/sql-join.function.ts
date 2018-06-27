export function sqlJoin<T extends U, U>( leftList: T[], rightList: U[], joinKey: keyof U ): T[]
{
	return leftList.map( leftItem =>
	{
		const matchingRightItem = rightList.find( rightItem => rightItem[ joinKey ] == leftItem[ joinKey ] ) || {};
		return Object.assign( {}, leftItem, matchingRightItem );
	} );
}
