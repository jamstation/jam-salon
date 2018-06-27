import { Observable } from "rxjs";
import { AnyObject } from "./any-object.model";
import { UploadStatuses } from "./upload-statuses.enum";
import { JamFirestoreUploadTask } from "../firestore-storage/jam-firestore-upload-task.model";

export interface UploadInfo
{
	localCopy?: File;
	cloudPath?: string;
	cloudUrl?: string;
	metadata?: AnyObject<string>;
	status?: Observable<UploadStatuses>;
	active?: Observable<boolean>;
	progress?: Observable<number>;
	task?: JamFirestoreUploadTask;
}
