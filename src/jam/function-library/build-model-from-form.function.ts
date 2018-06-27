import { FormGroup } from "@angular/forms";

export function buildModelFromForm<T>( model: T, form: FormGroup ): T
{
	Object.keys( model ).forEach( property =>
		model[ property ] = form.controls[ property ]
			? form.controls[ property ].value
			: model[ property ] )
	return model;
}
