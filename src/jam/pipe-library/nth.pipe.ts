import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'nth', pure: true } )
export class NthPipe implements PipeTransform
{

	public transform ( value: number ): string
	{
		if ( value === null || value === undefined ) return;

		switch ( value % 10 ) {
			case 1: return value.toString() + 'st';
			case 2: return value.toString() + 'nd';
			case 3: return value.toString() + 'rd';
			default: return value.toString() + 'th';
		}
	}

}

@NgModule( {
	declarations: [ NthPipe ],
	exports: [ NthPipe ]
} )
export class NthPipeModule { }
