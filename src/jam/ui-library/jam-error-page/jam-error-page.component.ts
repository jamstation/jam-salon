import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JamErrorPage } from './jam-error-page.model';

@Component( {
	selector: 'jam-error-page',
	templateUrl: './jam-error-page.component.html',
	styleUrls: [ './jam-error-page.component.css' ]
} )
export class JamErrorPageComponent implements OnInit
{

	@Input() errorKey: string;
	@Input() redirectUrl: string;
	private errors: JamErrorPage[];
	public error: JamErrorPage;

	constructor ( public router: Router )
	{
		this.errors = [
			{ key: 'bad-request', title: 'Bad Request', code: "400", icon: "error_outline", message: 'Our server is unable to understand your request.' },
			{ key: 'unauthorized', title: 'Access Denied', code: "401", icon: "pan_tool", message: 'You do not have access to this url.' },
			{ key: 'page-not-found', title: 'Page not found', code: "404", icon: "not_interested", message: 'The requested page is not found.' }
		];
	}

	ngOnInit()
	{
		this.error = this.errors.find( error => error.key == this.errorKey )
			|| this.errors.find( error => error.key == 'bad-request' );
	}

	public goHome ()
	{
		this.router.navigateByUrl( this.redirectUrl )
	}

}
