import { KeyValue } from "../../jam/model-library";

export function concatUniqueKeyValues<T = string>( ...arrays: KeyValue<T>[][] ): KeyValue<T>[]
{
	return arrays.reduce( ( finalArray, array ) =>
	{
		return finalArray
			.concat( array
				.filter( item => finalArray
					.findIndex( finalArrayItem => item.key == finalArrayItem.key ) < 0 ) );
	}, [] );
}