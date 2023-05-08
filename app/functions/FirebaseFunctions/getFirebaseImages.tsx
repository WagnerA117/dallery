import { auth, db } from "@/app/firebase/clientApp ";
import { GalleryType } from "@/app/firebase/types ";
import { collection, doc, getDoc } from "firebase/firestore";

//change this to use the gallery id instead of the user id
const getFirebaseImages = async (
  userId: string,
  galleryId: string
): Promise<GalleryType | undefined> => {
  const docRef = doc(db, "userImages", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const document = docSnap.data();
    const userImages = document?.images?.filter(
      (image) => image.galleryId === galleryId
    );
    return userImages;
  } else {
    console.log("No such document!");
  }
};

export default getFirebaseImages;
