import { ScreenSizes } from "./screen-sizes.enum";

export interface MatGridData
{
	screenSize?: ScreenSizes;
	rows?: number;
	cols?: number;
	rowHeight?: string;
}
