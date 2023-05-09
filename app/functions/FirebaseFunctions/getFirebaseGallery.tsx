import { auth, db } from "@/app/firebase/clientApp ";
import { GalleryType } from "@/app/firebase/types ";
import { collection, doc, getDoc } from "firebase/firestore";

//change this to use the gallery id instead of the user id
const getFirebaseGallery = async (
  userId: string,
  galleryId: string
): Promise<GalleryType | undefined> => {
  const docRef = doc(db, "galleries", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const document = docSnap.data();
    const gallery = document?.userGalleries?.find(
      (gallery: GalleryType) => gallery.id === galleryId
    );
    return gallery;
  } else {
    console.log("No such document!");
  }
};

export default getFirebaseGallery;
