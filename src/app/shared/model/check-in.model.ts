import { TableData } from "../../../jam/model-library";
import { Service } from './service.model';
import { Stylist } from './stylist.model';
import { CheckInStatuses } from "./check-in-statuses.enum";

export interface CheckIn extends TableData
{
	token: string;
	time: Date;
	status: CheckInStatuses;
	name?: string;
	phone?: string;
	serviceList?: Service[];
	stylist?: Stylist;
}
