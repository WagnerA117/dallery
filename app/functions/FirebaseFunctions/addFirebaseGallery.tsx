import { create } from "domain";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 } from "uuid";

import { auth } from "../../firebase/clientApp";
import { db } from "../../firebase/clientApp";

type CreateNewGalleryType = (
  galleryName: string,
  galleryDescription: string
) => any;

const addFirebaseGallery: CreateNewGalleryType = async (
  galleryName,
  description
) => {
  try {
    const userId = auth.currentUser?.uid;

    //@ts-ignore
    const docRef = doc(db, "galleries", userId);

    const checkGalleryExists = await getDoc(docRef);

    if (checkGalleryExists.exists()) {
      //logic for gallery goes here
      console.log("gallery exists");
      //@ts-ignore
      const docRef = doc(db, "galleries", userId);

      const newGallery = {
        id: v4(),
        userId,
        galleryName,
        description,
        createdAt: new Date(),
        isFavourite: false,
      };
      await updateDoc(docRef, {
        userGalleries: arrayUnion(newGallery),
      });

      return newGallery;
    } else {
      const createGalleryDoc = await setDoc(docRef, {
        createdAt: new Date(),
        description,
        galleryName,
        id: v4(),
        userId,
        userGalleries: [],
      });

      return createGalleryDoc;
    }

    //await setDoc(doc(db, "galleries", userId), {
    //  name: galleryName,
    //  description: description,
    //  ownerId: auth.currentUser?.uid,
    //  createdAt: new Date(),
    //  updatedAt: new Date(),
    //});

    //const newGallery = await setDoc(doc(db, "galleries", userId), {
    //  name: galleryName,
    //  description: description,
    //  ownerId: auth.currentUser?.uid,
    //  createdAt: new Date(),
    //  updatedAt: new Date(),
    //  downloadUrls: [],
    //});
  } catch (error) {
    console.log(error);
  }
};

export default addFirebaseGallery;
