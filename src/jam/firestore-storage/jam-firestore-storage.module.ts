import { NgModule, ModuleWithProviders } from '@angular/core';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { JamFirestoreStorage } from './jam-firestore-storage.service';

@NgModule( {
    imports: [ AngularFireStorageModule ],
    providers: [ JamFirestoreStorage ]
} )
export class JamFirestoreStorageModule
{
    static forRoot (): ModuleWithProviders
    {
        return {
            ngModule: JamFirestoreStorageModule,
            providers: [ JamFirestoreStorage ],
        };
    }
}
