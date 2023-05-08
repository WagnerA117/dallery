export type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export type DocumentUrlObject = {
  downloadUrl: string;
  name: string;
  id: string;
};

export type FileType = {
  path: string;
  preview: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
};

export type GalleryType = {
  id: string;
  galleryName: string;
  userId: string;
  isFavourite: boolean;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  documentUrls: DocumentUrlObject[];
};

export type ImageType = {
  id: string;
  name: string;
};
