export function sum ( ...numbers: number[] ): number
{
	return numbers.reduce( ( result, n ) => result + n, 0 );
}
