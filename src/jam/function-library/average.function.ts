import { sum } from "./sum.function";

export function average ( ...numbers: number[] ): number
{
	return sum( ...numbers ) / numbers.length;
}
