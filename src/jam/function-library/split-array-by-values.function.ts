export function splitArrayByValues<T>( array: T[] = [], key: keyof T ): T[][]
{
	let existingGroup: T[];

	array = array || [];

	return array.reduce( ( result: T[][], item ) =>
	{
		existingGroup = result[ item[ key as string ] ] || [];
		result[ item[ key as string ] ] = [ ...existingGroup, item ];
		return result;
	}, [] );
}
