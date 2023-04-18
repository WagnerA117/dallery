import { doc, getDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase/clientApp ";

const getFirebaseGallery = async (galleryId: string) => {
  const docRef = doc(db, "galleries", galleryId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export default getFirebaseGallery;
