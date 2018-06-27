import { Observable, of } from "rxjs";
import { merge, skip } from "rxjs/operators";

export function mergeObservables<T>( observables: Observable<T>[] ): Observable<T>
{
	return of( null ).pipe(
		merge( ...observables ),
		skip( 1 )
	);
}
