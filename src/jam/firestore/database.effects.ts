import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { map, switchMap, first, tap, withLatestFrom } from 'rxjs/operators';
import { AngularFirestore } from "angularfire2/firestore";
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DatabaseModuleState } from './database.state';
import { DatabaseActionTypes, DatabaseAction } from './database.actions';
import { Table } from "./table.model";
import { Database } from "./database.model";
import { mapFirestoreSnapshotsToValues } from "../rxjs-operator-library";
import { DatabaseService } from "./database.service";
import { concatPaths } from "../function-library";

@Injectable()
export class DatabaseEffects
{
	@Effect() public initialize$: Observable<Action>;

	constructor (
		private actions$: Actions,
		private firestore: AngularFirestore,
		private db: DatabaseService
	)
	{

		this.initialize$ = this.actions$.pipe(
			ofType<DatabaseAction.Initialize>( DatabaseActionTypes.initialize ),
			tap( action => firestore.firestore.app.firestore().settings( { timestampsInSnapshots: true } ) ),
			switchMap( action => action.database
				? of( action.database )
				: this.firestore.doc<Database>( action.metadataPath ).valueChanges().pipe(
					first(),
					switchMap( database => this.db.list<Table>( concatPaths( '/', database.tableMetadataPath ) ).pipe(
						first(),
						map( tables => tables.map( table => ( {
							key: table.key,
							path: table.path.startsWith( '/' )
								? table.path
								: concatPaths( database.path, table.path )
						} ) ) ),
						map( tables => tables.map( table => ( { ...table, originalPath: table.path } ) ) ),
						map( tables => ( {
							path: database.path,
							metadataPath: action.metadataPath,
							tableMetadataPath: database.tableMetadataPath,
							tables: tables
						} ) ) ) ) ) ),
			map( ( database: Database ) => database
				? new DatabaseAction.Initialized( database )
				: new DatabaseAction.InitializeFailed() ) );

	}
}
