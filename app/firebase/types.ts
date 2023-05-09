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
  createdAt: Timestamp;
  description: string;
  galleryName: string;
  id: string;
  isFavourite: boolean;
  updatedAt: Timestamp;
  userId: string;
};

export type ImageType = {
  createdAt: Timestamp;
  downloadUrl: string;
  galleryId: string;
  id: string;
  isFavourite: boolean;
  name: string;
};
