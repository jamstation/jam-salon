import { KeyValue } from '../../jam/model-library';

export interface NavigatorModuleState
{
	navigatorState: NavigatorState
}

export interface NavigatorState
{
	initialized: boolean;
	loading: boolean;
	navigating: boolean;
	pristine: boolean;
	pages: { [ key: number ]: string };
	params: KeyValue[];
	previousPage: string;
	currentPage: string;
	requestedPage: string;
	resolvedRequestedPage: string;
	navigatedToPage: string;
	reason: string;
	error: string;
}