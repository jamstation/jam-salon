import { Injectable } from "@angular/core";
import { Observable, of, from } from "rxjs";
import { first, map, switchMap } from "rxjs/operators";
import { Table } from "./table.model";
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from "angularfire2/firestore";
import { mapFirestoreSnapshotToValue, mapFirestoreSnapshotsToValues } from "../rxjs-operator-library";
import { TableData } from "../model-library";
import { WhereFilterOp, WriteBatch, DocumentReference } from "@firebase/firestore-types";
import { concatObservablesToArray, filterObject, filterOutObjectByValue, getCaller } from "../function-library";
import { Store, select } from "@ngrx/store";
import { DatabaseModuleState } from "./database.state";

@Injectable()
export class DatabaseService
{

    private suppressConsoleMessages: boolean = false;
    private tables: Table[];

    constructor ( public firestore: AngularFirestore, private store: Store<DatabaseModuleState> )
    {
        this.store.pipe( select( state => state.databaseState.tables ) )
            .subscribe( tables => this.tables = tables );
    }

    public isValidPath ( path: string ): boolean
    {
        return ( path && path.indexOf( '{' ) < 0 );
    }

    public getTablePathSnapshot ( tableName: string ): string
    {
        return tableName.startsWith( '/' )
            ? tableName.replace( /(\/\/+)/g, '/' )
            : ( this.tables.find( item => item.key === tableName ) || { path: null } ).path;
    }

    public getCollection<T extends TableData> ( tableName: string, queryFn?: QueryFn ): AngularFirestoreCollection<T>
    {
        const path = this.getTablePathSnapshot( tableName );

        console.log( '[Database]', '(Table: ' + path + ')', getCaller() );

        return this.isValidPath( path )
            ? this.firestore.collection<T>( path, queryFn )
            : null;
    }

    public exists<T extends TableData> ( tableName: string, key: string ): Observable<boolean>
    {
        if ( !key ) return of<boolean>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return of<boolean>( null );

        return collection.doc<T>( key ).snapshotChanges().pipe(
            first(),
            map( snapshot => snapshot.payload.exists ) );
    }

    public get<T extends TableData> ( tableName: string, key: string ): Observable<T>
    {
        if ( !key ) return of<T>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return of<T>( null );

        return collection.doc<T>( key ).snapshotChanges().pipe( mapFirestoreSnapshotToValue<T>() );
    }

    public find<T extends TableData> ( tableName: string, searchColumn: keyof T, searchKey: any ): Observable<T>
    {
        if ( !searchColumn || searchKey === undefined ) return of<T>( null );

        return this.filter<T>( tableName, searchColumn, '==', searchKey ).pipe( map( list => list[ 0 ] || null ) );
    }

    public lookup<T extends TableData> ( tableName: string, searchColumn: keyof T, searchKey: any ): Observable<T>
    {
        if ( searchKey === undefined ) return of<T>( null );

        return searchColumn
            ? this.find<T>( tableName, searchColumn, searchKey ).pipe( first() )
            : this.get<T>( tableName, searchKey ).pipe( first() );
    }

    public forceLookup<T extends TableData> ( tableName: string, item: T, searchColumn?: keyof T, searchKey: any = item.key ): Observable<T>
    {
        return this.lookup<T>( tableName, searchColumn, searchKey ).pipe(
            switchMap( lookedupItem => lookedupItem
                ? of( lookedupItem )
                : this.add( tableName, item ).pipe(
                    switchMap( key => this.lookup<T>( tableName, undefined, key ) ) ) ) );
    }

    public list<T extends TableData> ( tableName: string ): Observable<T[]>
    {
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return of<T[]>( null );

        return collection.snapshotChanges().pipe( mapFirestoreSnapshotsToValues() );
    }

    public query<T extends TableData> ( tableName: string, queryFn: QueryFn ): Observable<T[]>
    {
        const collection = this.getCollection<T>( tableName, queryFn );
        if ( !collection ) return of<T[]>( null );

        return collection.snapshotChanges().pipe( mapFirestoreSnapshotsToValues() );
    }

    public listFirst<T extends TableData> ( tableName: string, limit: number ): Observable<T[]>
    {
        return this.query( tableName, ref => ref.limit( limit ) );
    }

    public filter<T extends TableData> ( tableName: string, searchColumn: keyof T, operator: WhereFilterOp, searchKey: any ): Observable<T[]>
    {
        return this.query( tableName, ref => ref.where( searchColumn as string, operator, searchKey ) );
    }

    public findMany<T extends TableData> ( tableName: string, searchColumn: keyof T, searchKeys: any[] ): Observable<T[]>
    {
        const items = searchKeys.map( key => this.find<T>( tableName, searchColumn, key ).pipe( first() ) );
        return concatObservablesToArray( items );
    }

    public getMany<T extends TableData> ( tableName: string, keys: string[] ): Observable<T[]>
    {
        const item$s = keys.map( key => this.get<T>( tableName, key ) );
        return concatObservablesToArray( item$s );
    }

    public clone<S extends TableData, T extends TableData> ( sourceTableName: string, targetTableName: string, replace?: boolean ): Observable<boolean>
    {
        const sourceCollection = this.getCollection( sourceTableName );
        const targetCollection = this.getCollection( targetTableName );
        return this.list<T>( targetTableName ).pipe(
            map( list => list.length > 0 ),
            switchMap( targetExists => targetExists && !replace
                ? of( false )
                : this.list<S>( sourceTableName ).pipe(
                    map( sourceList => sourceList.reduce( ( result: WriteBatch, item ) =>
                        result.set( targetCollection.doc<T>( item.key ).ref, item ),
                        this.firestore.firestore.batch() ) ),
                    switchMap( ( batch: WriteBatch ) => from( batch.commit() ).pipe(
                        map( () => true ) ) ) ) ) );
    }

    /**
     * Remove view model columns and key column.
     * A column is a view model column if
     *  - it ends with $
     *  - it has a counterpart key column
     *  - it has a counterpart key list column
     * @param item item for which the view model columns are to be removed
     */
    private removeVmColumns<T> ( item: T, removeNulls: boolean = false ): Partial<T>
    {
        return filterObject( item, ( value, column, data ) =>
            ( column !== 'key' )
            && !( column.endsWith( '$' ) )
            && ( data[ column + 'Key' ] === undefined )
            && ( !column.endsWith( 'List' )
                || ( column.endsWith( 'List' )
                    && data[ column.slice( 0, column.length - 4 ) + 'KeyList' ] === undefined ) )
            && ( removeNulls ? value !== null : true )
        );
    }

    public add<T extends TableData> ( tableName: string, item: T ): Observable<string>
    {
        if ( !item ) return of<string>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return of<string>( null );

        const promise: Promise<DocumentReference | void> = item.key
            ? collection.doc<T>( item.key ).set( this.removeVmColumns( item ) as T )
            : collection.add( this.removeVmColumns( item ) as T );

        return from( promise ).pipe(
            map( docRef => docRef ? docRef.id : item.key ) );
    }

    public addMany<T extends TableData> ( tableName: string, items: T[] ): Observable<string[]>
    {
        return concatObservablesToArray( items.map( item => this.add<T>( tableName, item ) ) );
    }

    public modifyElseAddMany<T extends TableData> ( tableName: string, items: T[], searchColumn?: keyof T ): Observable<string[]>
    {
        return concatObservablesToArray( items.map( item =>
            this.modifyElseAdd( tableName, item, searchColumn, item[ searchColumn ] ) ) );
    }

    public modify<T extends TableData> ( tableName: string, item: T, searchColumn?: keyof T, searchKey: any = item.key ): Observable<string>
    {
        if ( !item ) return of<string>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return of<string>( null );

        return this.lookup<T>( tableName, searchColumn, searchKey ).pipe(
            switchMap( existingItem => !existingItem
                ? of<string>( null )
                : from( collection.doc( existingItem.key )
                    .set( this.removeVmColumns( item ) ) ).pipe(
                        map( () => existingItem.key ) ) ) );

    }

    public modifyElseAdd<T extends TableData> ( tableName: string, item: T, searchColumn?: keyof T, searchKey: any = item.key ): Observable<string>
    {
        return this.modify( tableName, item, searchKey, searchColumn ).pipe(
            switchMap( updatedItem => updatedItem
                ? of( updatedItem )
                : this.add( tableName, item ) ) );
    }

    private validateAndFetchExistingItem<T extends TableData> ( tableName: string, item: T, searchColumn?: keyof T, searchKey: any = item.key ): Observable<T>
    {
        /**
         * if no item provided return immediately
         */
        if ( !item ) return of<T>( null );

        /**
         * Remove view model columns
         */
        item = this.removeVmColumns( item ) as T;

        /**
         * Get existing item
         */
        return this.lookup( tableName, searchColumn, searchKey );
    }

    public modifyFields<T extends TableData> ( tableName: string, item: T, searchColumn?: keyof T, searchKey: any = item.key ): Observable<string>
    {
        if ( !item ) return of<string>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return of<string>( null );

        return this.lookup<T>( tableName, searchColumn, searchKey ).pipe(
            switchMap( existingItem => !existingItem
                ? of<string>( null )
                : from( collection.doc<T>( existingItem.key ).update( this.removeVmColumns( item, true ) ) ).pipe(
                    map( () => existingItem.key ) ) ) );
    }

    public modifyFieldsMany<T extends TableData> ( tableName: string, items: T[], searchColumn?: keyof T ): Observable<string[]>
    {
        if ( !items ) return of<string[]>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return of<string[]>( null );

        const existingItemsObservables = items.map( item =>
            this.validateAndFetchExistingItem( tableName, item, searchColumn, item[ searchColumn ] ) );

        return concatObservablesToArray( existingItemsObservables ).pipe(
            map( existingItems => existingItems
                .filter( eItem => !!eItem )
                .map( ( eItem, i ) => items[ i ] ) ),
            map( newList => ( {
                newList: newList,
                batch: newList.map( item => filterOutObjectByValue( item, [ null, undefined ] ) )
                    .reduce( ( batch: WriteBatch, item ) => batch.update( collection.doc( item.key ).ref, item )
                        , this.firestore.firestore.batch() )
            } ) ),
            switchMap( result => from( result.batch.commit() ).pipe(
                map( () => result.newList.map( item => item.key ) ) ) ) );
    }

    public remove<T extends TableData> ( tableName: string, key: string ): Observable<T>
    {
        if ( !key ) return of<T>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return of<T>( null );

        /**
         * Get existing item
         * Exit this function if existing item is not found
         */
        return this.lookup<T>( tableName, undefined, key ).pipe(
            switchMap( existingItem => !existingItem
                /* Delete failed since existing item not found. Return 'null' to indicate 'no item deleted' */
                ? of<T>( null )
                /* Delete succeeded. Return existingItem as itemDeleted */
                : from( collection.doc( existingItem.key ).delete() ).pipe(
                    map( () => existingItem ) ) ) );

    }

}
