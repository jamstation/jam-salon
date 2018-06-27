import { Observable, of } from "rxjs";
import { concat, skip, toArray } from "rxjs/operators";

export function concatObservablesToArray<T>( observables: Observable<T>[] ): Observable<T[]>
{
	return of( null ).pipe(
		concat( ...observables ),
		skip( 1 ),
		toArray()
	);
}
