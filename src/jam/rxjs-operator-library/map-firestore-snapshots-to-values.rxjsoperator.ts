import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DocumentChangeAction } from "angularfire2/firestore";
import { TableData } from "../model-library";

export const mapFirestoreSnapshotsToValues = <T extends TableData> () => ( source: Observable<DocumentChangeAction<T>[]> ) =>
{
	return source.pipe(
		map( actions => actions
			.map( action => Object.assign( { key: action.payload.doc.id }, action.payload.doc.data() as T ) ) ) );
}
