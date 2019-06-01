import {UploadStatus} from 'ngx-uploader';

export interface UploaderOptions {
    concurrency: number; // number of files uploaded at the same time
    allowedContentTypes?: string[]; // content types allowed (default *)
    maxUploads?: number; // max number of files the user can upload
}

export interface UploadProgress {
    status: UploadStatus; // current status of upload for specific file (Queue | Uploading | Done | Canceled)
    data?: {
        percentage: number; // percentage of upload already completed
        speed: number; // current upload speed per second in bytes
        speedHuman: string; // current upload speed per second in human readable form,
        eta: number; // estimated time remaining in seconds
        etaHuman: string; // estimated time remaining in human readable format
    };
}

export interface UploadFile {
    id: string; // unique id of uploaded file instance
    fileIndex: number; // fileIndex in internal ngx-uploader array of files
    lastModifiedDate: Date; // last modify date of the file (Date object)
    name: string; // original name of the file
    size: number; // size of the file in bytes
    type: string; // mime type of the file
    form: FormData; // FormData object (you can append extra data per file, to this object)
    progress: UploadProgress;
    response?: any; // response when upload is done (parsed JSON or string)
    responseStatus?: number; // response status code when upload is done
    responseHeaders?: { [key: string]: string }; // response headers when upload is done
}

// output events emitted by ngx-uploader
export interface UploadOutput {
    type: 'addedToQueue' | 'allAddedToQueue' | 'uploading' | 'done' | 'removed' | 'start' | 'cancelled' | 'dragOver' | 'dragOut' | 'drop';
    file?: UploadFile;
    nativeFile?: File; // native javascript File object, can be used to process uploaded files in other libraries
}

// input events that user can emit to ngx-uploader
export interface UploadInput {
    type: 'uploadAll' | 'uploadFile' | 'cancel' | 'cancelAll' | 'remove' | 'removeAll';
    url?: '${}'; // URL to upload file to
    method?: string; // method (POST | PUT)
    id?: string; // unique id of uploaded file
    fieldName?: string; // field name (default 'file')
    fileIndex?: number; // fileIndex in internal ngx-uploader array of files
    file?: UploadFile; // uploading file
    data?: { [key: string]: string | Blob }; // custom data sent with the file
    headers?: { [key: string]: string }; // custom headers
    includeWebKitFormBoundary?: boolean; // If false, only the file is send trough xhr.send (WebKitFormBoundary is omit)
    concurrency?: number; // concurrency of how many files can be uploaded in parallel (default is 0 which means unlimited)
    withCredentials?: boolean; // apply withCredentials option
}
