import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AuthModuleState } from './jam-auth.state';
import { AuthAction } from './jam-auth.actions';
import { AuthFormValidators } from './auth-form-validators.directive';
import { Credential } from './credential.model';

@Component( {
	selector: 'jam-auth-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
} )
export class RegisterComponent
{

	public form: FormGroup;
	public uiWidth: Observable<string>;
	public uiHeight: Observable<string>;

	constructor ( private store: Store<AuthModuleState>, private formBuilder: FormBuilder )
	{
		this.form = this.formBuilder.group( {
			email: new FormControl( '', [ Validators.required ] ),
			password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] ),
			confirmPassword: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] )
		} );
		this.confirmPassword.setValidators( AuthFormValidators.confirmPasswordValidator( this.password ) );
		this.uiWidth = this.store.pipe( select( state => state.authState.uiWidth ), first() );
		this.uiHeight = this.store.pipe( select( state => state.authState.uiHeight ), first() );
	}

	private submit ()
	{
		if ( this.form.invalid ) return;
		const credential = { email: this.email.value, password: this.password.value };
		this.store.dispatch( new AuthAction.Register( credential ) );
	}

	private requestSignInPage ()
	{
		this.store.dispatch( new AuthAction.RequestSignInPage() );
	}

	public get email (): AbstractControl
	{
		return this.form.get( 'email' );
	}

	public get password (): AbstractControl
	{
		return this.form.get( 'password' );
	}

	public get confirmPassword (): AbstractControl
	{
		return this.form.get( 'confirmPassword' );
	}

}
