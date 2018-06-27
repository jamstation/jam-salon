import { Store, select } from "@ngrx/store";

export function Select<T>( store: Store<T>, moduleState: string, state: string )
{

	return function ( target )
	{
		return store.pipe( select( state => state[ moduleState ][ state ] ) );
	};

}
