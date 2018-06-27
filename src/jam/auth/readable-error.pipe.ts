import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'jamAuthReadableError'
})
export class ReadableErrorPipe implements PipeTransform
{

	private errorMessages: Array<Array<string>>;

	constructor()
	{
		this.errorMessages = new Array<Array<string>>();
		this.errorMessages['email'] = new Array<string>();
		this.errorMessages['email']['required'] = 'Email cannot be empty';
		this.errorMessages['email']['email'] = 'Invalid email address';
		this.errorMessages['password'] = new Array<string>();
		this.errorMessages['password']['required'] = 'Password cannot be empty';
		this.errorMessages['password']['minlength'] = 'Password must be atleast *requiredLength* characters';
		this.errorMessages['password']['no-match'] = 'Both passwords must match';
	}

	transform( errors: any, field: string ): any
	{
		if( ! this.errorMessages[field] ) return '';

		// Get first matching error
		var errorType = Object.keys(this.errorMessages[field]).find( errorMessageKey => {
			return !! Object.keys( errors ).find( errorKey => errorMessageKey == errorKey );
		});
		var errorMessage: string = this.errorMessages[field][errorType];

		if( ! errorMessage ) return 'Oops! Something went wrong'

		// Replace variables here
		errorMessage = errorMessage.replace( '*requiredLength*', errors[errorType]['requiredLength'] );

		return errorMessage;
	}

}
