import { db } from "../firebase/clientApp";
import { collection, addDoc } from "firebase/firestore";

type AddGalleryType = (galleryName: string, galleryDescription: string) => any;

const addFirebaseGallery: AddGalleryType = async (galleryName, description) => {
  try {
    const newGallery = await addDoc(collection(db, "galleries"), {
      name: galleryName,
      description: description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return newGallery;
  } catch (error) {
    console.log(error);
  }
};

export default addFirebaseGallery;
