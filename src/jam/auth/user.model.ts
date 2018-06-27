import { TableData } from "../../jam/model-library";

export interface User extends TableData
{
    email: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
}
