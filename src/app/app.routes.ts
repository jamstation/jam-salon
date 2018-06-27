import { Routes } from '@angular/router';
import { DatabaseGuard } from '../jam/firestore';

export const routes: Routes = [

	{ path: '', loadChildren: './feature/home/home.module#HomeModule', canLoad: [ DatabaseGuard ] },

	{ path: '**', redirectTo: '', pathMatch: 'full' }

];
