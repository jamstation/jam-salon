import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Action, DocumentSnapshot } from "angularfire2/firestore";
import { TableData } from "../model-library";

export const mapFirestoreSnapshotToValue = <T extends TableData> () => ( source: Observable<Action<DocumentSnapshot<T>>> ) =>
{
	return source.pipe(
		map( action => action.payload.exists ? Object.assign( { key: action.payload.id }, action.payload.data() ) as T : null ) );
}
