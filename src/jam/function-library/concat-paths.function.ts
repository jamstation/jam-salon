export function concatPaths ( ...paths: Array<string> ): string
{
	return paths.join( '/' ).replace( /(\/\/+)/g, '/' ) + '/';
}
