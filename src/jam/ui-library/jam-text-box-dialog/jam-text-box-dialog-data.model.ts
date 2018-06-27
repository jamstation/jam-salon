import { KeyValue } from "../../model-library";
import { ValidatorFn } from "@angular/forms";

export interface JamTextBoxDialogData extends KeyValue<string>
{
	label?: string;
	placeholder?: string;
	validators?: ValidatorFn[];
}
