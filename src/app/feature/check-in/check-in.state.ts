import { AppModuleState } from "../../app.store";
import { CheckIn, Service, Stylist } from "../../shared/model";

export interface CheckInModuleState extends AppModuleState
{
	checkInState: CheckInState
}

export interface CheckInState
{
	list: CheckIn[];
	serviceList: Service[];
	stylistList: Stylist[];
	queueLength: number;
	waitTime: number;

	processing: boolean;
	loading: boolean;
	creating: boolean;
	editing: boolean;
	formItem: CheckIn;
}
