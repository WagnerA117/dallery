export type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export type GalleryType = {
  id: string;
  name: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  images: [];
};
