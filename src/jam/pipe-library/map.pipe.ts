import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'map', pure: true } )
export class MapPipe implements PipeTransform
{

	public transform ( value: any[] = [], field: string ): any[]
	{
		return value.map( item => item[ field ] );
	}

}

@NgModule( {
	declarations: [ MapPipe ],
	exports: [ MapPipe ]
} )
export class MapPipeModule { }
