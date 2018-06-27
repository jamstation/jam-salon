import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'time', pure: true } )
export class TimePipe implements PipeTransform
{

	public transform ( value: Date, format: string ): string
	{
		console.log( value );
		if ( !value ) return;

		switch ( format ) {
			case 'short':
				let hours = value.getHours().toString();
				hours = hours === '0' ? '' : hours + ' hr ';
				let minutes = value.getMinutes().toString() + ' min';
				return hours + minutes;

			default:
				return '';
		}
	}

}

@NgModule( {
	declarations: [ TimePipe ],
	exports: [ TimePipe ]
} )
export class TimePipeModule { }
