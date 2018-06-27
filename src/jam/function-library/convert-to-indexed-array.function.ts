export function convertToIndexedArray<T = any>( array: T[], keyColumn: keyof T ): T[]
{
	array.forEach( item => array[ item[ keyColumn as string ] ] = item );
	return array;
}
