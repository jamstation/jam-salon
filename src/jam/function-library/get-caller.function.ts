export function getCaller ()
{
	return ( new Error().stack.split( 'at ' )[ 3 ].split( ' (' )[ 0 ] ).split( '.' ).pop();
}
