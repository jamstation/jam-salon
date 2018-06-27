import { Observable } from "rxjs";
import { UploadableFile } from "../../jam/model-library";
import { JamFirestoreUploadTask } from "./jam-firestore-upload-task.model";

export interface JamFirestoreBatchUploadTask<T>
{
	items?: JamFirestoreUploadTask[];
	getItem ( index: number ): JamFirestoreUploadTask;
	progress (): Observable<number>;
	togglePauseOne ( index: number ): boolean;
	cancelOne ( index: number ): boolean;
	pause (): boolean;
	cancel (): boolean;
	resume (): boolean;
	isActive?: Observable<boolean>;
	completed?: Observable<boolean>;
	fileCount?: number;
	files?: UploadableFile<T>[];
	completedFile?: Observable<UploadableFile<T>>;
}
