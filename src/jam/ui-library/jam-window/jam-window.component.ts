import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { NavItem } from '../../model-library';

@Component( {
	selector: 'jam-window',
	templateUrl: './jam-window.component.html',
	styleUrls: [ './jam-window.component.css' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class JamWindowComponent
{

	@Input() public title: string;
	@Input() public titleIcon: string;
	@Input() public borderRadius: string;

}
