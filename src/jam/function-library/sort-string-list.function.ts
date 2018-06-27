export function sortStringList<T>(
	list: T[],
	key: keyof T,
	descending: boolean = false,
	caseSensitive: boolean = true
): T[]
{
	list = list || [];
	return list.sort( ( item1, item2 ) =>
	{
		let value1: string = item1[ key ] ? item1[ key ].toString() as string : '';
		let value2: string = item2[ key ] ? item2[ key ].toString() as string : '';

		/**
		 * Handle case sensitivity
		 */
		if ( !caseSensitive ) {
			value1 = value1.toUpperCase();
			value2 = value2.toUpperCase();
		}

		let result = ( value1 > value2 )
			? 1
			: ( value1 < value2 )
				? -1
				: 0;

		/**
		 * Handle sort order
		 */
		result = descending ? result * -1 : result;

		return result;
	} );
}
