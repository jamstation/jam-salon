import { Observable, of } from "rxjs";
import { concat, skip } from "rxjs/operators";

export function concatObservables<T>( observables: Observable<T>[] ): Observable<T>
{
	return of( null ).pipe(
		concat( ...observables ),
		skip( 1 )
	);
}
