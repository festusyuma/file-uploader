export interface FileUpload {
  id?: number;
  server: ServerType;
}

export enum ServerType {
  CLOUDINARY = 'cloudinary',
  S3 = 's3',
  GCLOUD = 'gcloud',
}
