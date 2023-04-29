"use client";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../firebase/clientApp";
import { GalleryType } from "../firebase/types";

const useGallery = (galleryId: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gallery, setGallery] = useState<GalleryType>();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const docRef = doc(db, "galleries", galleryId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap.data());
          setGallery(docSnap!.data() as GalleryType);
        } else {
          throw new Error("No such document!");
        }
      } catch (err) {
        console.log(" there was an error!");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return { error, loading, gallery };
};

export default useGallery;
