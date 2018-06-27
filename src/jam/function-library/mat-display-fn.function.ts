export function matDisplayFn<T>( key: keyof T ): ( item: T ) => T[ keyof T ]
{
	return ( item ) => item[ key ];
}
