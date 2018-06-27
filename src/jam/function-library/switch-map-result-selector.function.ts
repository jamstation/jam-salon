export const switchMapResultSelector = function <T, U>( outerValue: T, innerValue: U ): { outerValue: T, innerValue: U }
{
	return ( { outerValue, innerValue } );
}
