export function filterOutObjectByValue<T>( obj: T, values: any[] ): Partial<T>
{
	return Object.keys( obj )
		.filter( ( prop: keyof T ) => !values.includes( obj[ prop ] ) )
		.reduce( ( result, prop ) => ( { ...result, [ prop ]: obj[ prop ] } ), {} );
}
