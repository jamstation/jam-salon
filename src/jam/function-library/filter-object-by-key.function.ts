export function filterObjectByKey<T>( obj: T, key: keyof T ): Partial<T>
{
	return Object.keys( obj )
		.filter( ( prop: keyof T ) => prop == key )
		.reduce( ( result, prop ) => ( { ...result, [ prop ]: obj[ prop ] } ), {} );
}
