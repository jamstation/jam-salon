import { ActionReducerMap } from '@ngrx/store';
import { AppModuleState, AppReducer } from 'src/app/app.store';
import { CheckInState } from '../check-in/check-in.state';
import { CheckInReducer } from '../check-in/check-in.reducer';
import { CheckInEffects } from '../check-in/check-in.effects';
import { SalonState } from './salon.state';
import { SalonReducer } from './salon.reducer';
import { SalonEffects } from './salon.effects';

/**
 * All States
 */
export interface SalonParentState
{
	salonState: SalonState;
	checkInState: CheckInState;
}

export interface SalonModuleState extends AppModuleState
{
	salonParentState: SalonParentState;
}

/**
 * All Reducers
 */
export const SalonModuleReducer: ActionReducerMap<SalonParentState> = {
	salonState: SalonReducer,
	checkInState: CheckInReducer
};

/**
 * All Effects
 */
export const SalonModuleEffects = [
	SalonEffects,
	CheckInEffects
];

export * from './salon.state';
export * from './salon.actions';
export * from './salon.reducer';
