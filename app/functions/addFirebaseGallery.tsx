import { addDoc, collection } from "firebase/firestore";

import { db } from "../firebase/clientApp";

type CreateNewGalleryType = (
  galleryName: string,
  galleryDescription: string
) => any;

const addFirebaseGallery: CreateNewGalleryType = async (
  galleryName,
  description
) => {
  try {
    const newGallery = await addDoc(collection(db, "galleries"), {
      name: galleryName,
      description: description,
      createdAt: new Date(),
      updatedAt: new Date(),
      downloadUrls: [],
    });

    return newGallery;
  } catch (error) {
    console.log(error);
  }
};

export default addFirebaseGallery;
