import { Observable } from "rxjs";
import { concat, toArray } from "rxjs/operators";

const concatToArray = ( items: Observable<any>[] ) => <T>( source: Observable<T> ) =>
{
	return source.pipe(
		concat( ...items as Observable<T>[] ),
		toArray()
	);
}
