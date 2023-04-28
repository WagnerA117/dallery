export type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export type DocumentUrlObject = {
  downloadUrl: string;
  id: string;
};

export type GalleryType = {
  id: string;
  name: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  documentUrls: DocumentUrlObject[];
};

export type ImageType = {
  id: string;
  name: string;
};
