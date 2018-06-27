import { UploadMetadata } from "@firebase/storage-types";

export interface JamFirestoreUploadFile
{
	path: string,
	data: any,
	metadata?: UploadMetadata;
}
