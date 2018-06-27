export interface FirestoreAccess
{
	read?: boolean;
	write?: boolean;
	get?: boolean;
	list?: boolean;
	create?: boolean;
	update?: boolean;
	delete?: boolean;
}
