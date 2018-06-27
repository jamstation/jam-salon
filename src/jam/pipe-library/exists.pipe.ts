import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'exists', pure: true } )
export class ExistsPipe implements PipeTransform
{

	public transform ( value: any, list: any[] ): boolean
	{
		return list.includes( value );
	}

}

@NgModule( {
	declarations: [ ExistsPipe ],
	exports: [ ExistsPipe ]
} )
export class ExistsPipeModule { }
