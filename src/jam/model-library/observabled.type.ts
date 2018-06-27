import { Observable } from "rxjs";

export type Observabled<T> = {
	[ P in keyof T ]: Observable<T[ P ]>;
};
