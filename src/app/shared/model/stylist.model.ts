import { TableData } from "../../../jam/model-library";
import { Service } from './service.model';

export interface Stylist extends TableData
{
	name: string;
	serviceKeyList?: string[];
	serviceList?: Service[];
}
