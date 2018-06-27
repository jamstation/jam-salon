export function filterObject<T> ( obj: T, callbackFn: ( val: any, prop?: string, obj?: T ) => boolean ): Partial<T>
{
	return Object.keys( obj )
		.filter( prop => callbackFn( obj[ prop ], prop, obj ) )
		.reduce( ( result, prop ) => ( { ...result, [ prop ]: obj[ prop ] } ), {} );
}
