import { ComponentType } from '@angular/cdk/portal';
import { TemplateRef } from "@angular/core";
import { MatDialogRef } from "@angular/material";

export interface FeatureModule
{
	name: string;
	mainDialog: MatDialogRef<ComponentType<any> | TemplateRef<any>>;
}
