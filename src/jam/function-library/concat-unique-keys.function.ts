export function concatUniqueKeys<T> ( keyName: keyof T, ...arrays: T[][] ): T[]
{
	let finalArray = [];
	arrays.forEach( array => array.forEach( item =>
	{
		if ( !finalArray.find( refItem => refItem[ keyName ] === item[ keyName ] ) ) {
			finalArray.push( item );
		}
	} ) );
	return finalArray;
}
