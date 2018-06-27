import { TableData } from './table-data.model';
import { UserRoles } from './user-roles.enum';
import { KeyValue } from './key-value.model';
import { FirestoreAccess } from './firestore-access.model';

export interface UserCompany extends TableData
{
	role: UserRoles;
	accesses?: KeyValue<FirestoreAccess>;
}
