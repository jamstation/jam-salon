export function minusList<T>( listA: T[], listB: T[], key?: keyof T ): T[]
{
	return key
		? listA.filter( itemA => !listB.find( itemB => itemB[ key ] == itemA[ key ] ) )
		: listA.filter( itemA => !listB.includes( itemA ) );
}
