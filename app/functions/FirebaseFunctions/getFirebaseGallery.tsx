import { db } from "@/app/firebase/clientApp ";
import { GalleryType } from "@/app/firebase/types ";
import { collection, doc, getDoc } from "firebase/firestore";

const getFirebaseGallery = async (
  galleryId: string
): Promise<GalleryType | undefined> => {
  const docRef = doc(db, "galleries", galleryId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as GalleryType;
  } else {
    console.log("No such document!");
  }
};

export default getFirebaseGallery;
