import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/clientApp";

const deleteGallery = async (id: string) => {
  const docRef = doc(db, "galleries", id);

  await deleteDoc(docRef);
};

export default deleteGallery;
