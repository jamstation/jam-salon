import { FormGroup } from "@angular/forms";
import { KeyValue } from "../model-library";

export function buildFormFromModel<T>( model: T, form: FormGroup ): FormGroup
{
	if ( !model || !form ) return form;

	let patchObject = Object.keys( form.controls )
		.map( key => ( { key: key, value: model[ key ] } ) as KeyValue )
		.filter( property => property.value !== undefined )
		.reduce( ( obj, property ) => ( { ...obj, [ property.key ]: property.value } ), {} );

	form.patchValue( patchObject );

	return form;
}
