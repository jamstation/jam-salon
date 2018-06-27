import { NgModule } from '@angular/core';
import { JamMapsSearchInputDirective } from './search-input.directive';

@NgModule( {
	declarations: [ JamMapsSearchInputDirective ],
	exports: [ JamMapsSearchInputDirective ]
} )
export class JamSearchInputModule { }
