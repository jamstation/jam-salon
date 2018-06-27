import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatInputModule } from '@angular/material';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { JamFirestoreModule } from '../firestore';
import { JamNavigatorModule } from '../navigator';
import { ReadableErrorPipe } from './readable-error.pipe';
import { AuthGuard } from './auth.guard';
import { UserGuard } from './user.guard';
import { SignInComponent } from './sign-in.component';
import { RegisterComponent } from './register.component';
import { AuthFormValidators } from './auth-form-validators.directive';

@NgModule( {
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        AngularFireAuthModule,
        JamFirestoreModule,
        JamNavigatorModule
    ],
    declarations: [ ReadableErrorPipe, SignInComponent, RegisterComponent, AuthFormValidators ],
    providers: [ AuthGuard, UserGuard ],
    exports: [ SignInComponent, RegisterComponent ]
} )
export class JamAuthModule
{
    static forRoot (): ModuleWithProviders
    {
        return {
            ngModule: JamAuthModule,
            providers: [ AuthGuard, UserGuard ]
        };
    }
}
