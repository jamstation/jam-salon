import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AuthModuleState } from './jam-auth.state';
import { AuthAction } from './jam-auth.actions';
import { Credential } from './credential.model';

@Component( {
	selector: 'jam-auth-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: [ './sign-in.component.css' ]
} )
export class SignInComponent
{

	public form: FormGroup;
	public uiWidth: Observable<string>;
	public uiHeight: Observable<string>;

	constructor ( private store: Store<AuthModuleState>, private formBuilder: FormBuilder )
	{
		this.form = this.formBuilder.group( {
			email: new FormControl( '', [ Validators.required ] ),
			password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] )
		} );
		this.uiWidth = this.store.pipe( select( state => state.authState.uiWidth ), first() );
		this.uiHeight = this.store.pipe( select( state => state.authState.uiHeight ), first() );
	}

	private submit ()
	{
		if ( this.form.invalid ) return;
		const credential = { email: this.email.value, password: this.password.value };
		this.store.dispatch( new AuthAction.SignIn( credential ) );
	}

	private requestRegisterPage ()
	{
		this.store.dispatch( new AuthAction.RequestRegisterPage() );
	}

	public get email (): any
	{
		return this.form.get( 'email' );
	}
	public get password (): any
	{
		return this.form.get( 'password' );
	}

}
