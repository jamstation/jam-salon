export interface JamError
{
	name: string;
	code: string;
	message: string;
	stack?: string;
	reason?: string;
	solution?: string;
	isError?: boolean;
}
