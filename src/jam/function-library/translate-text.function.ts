import { KeyValue } from "../../jam/model-library";

export function translateText ( originalText: string, dictionary: KeyValue[], patterns: RegExp[], ): string
{
	console.log( originalText, dictionary );
	return dictionary.reduce( ( translatedText, word ) =>
	{
		return patterns.reduce( ( tempText, pattern ) =>
		{
			const itemPatternString = pattern.source.replace( 'key', word.key );
			const itemPattern = new RegExp( itemPatternString, 'g' );
			return tempText.replace( itemPattern, word.value );
		}, translatedText );
	}, originalText );

}