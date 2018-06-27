export function modifyFileNameInPath ( path: string, modifyFn: ( fileName: string ) => string ): string
{
	const pathArray = path.split( '/' );
	const fileName = pathArray.slice( pathArray.length - 1, pathArray.length )[ 0 ] || '';
	const newFileName = modifyFn( fileName );
	const dirPathArray = pathArray.slice( 0, pathArray.length - 1 );
	const newPath = dirPathArray.concat( newFileName ).join( '/' );

	return newPath
}
