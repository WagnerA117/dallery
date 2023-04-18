"use client";

import LoadingSpinner from "@/app/components/higherOrderComponent/LoadingSpinner ";
import useGallery from "@/app/customHooks/useGallery ";
import getFirebaseGallery from "@/app/functions/FirebaseFunctions/getFirebaseGallery ";
import { Box } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Gallery: React.FC = () => {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);

  const [gallery, setGallery] = useState<any>({});

  const galleryId = searchParams.get("id");

  //  const { gallery, loading, error } = useGallery(galleryId!);
  if (!galleryId) {
    return <Box> no gallery id </Box>;
  }

  useEffect(() => {
    const getGallery = async () => {
      const gallery = await getFirebaseGallery(galleryId);

      setGallery(gallery);
      setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    getGallery();
  }, []);

  if (loading === true) {
    return <LoadingSpinner />;
  }

  if (loading === false) {
    console.log(gallery);
  }

  return (
    <>
      <Box>
        <h1> the name is {gallery?.name}</h1>
      </Box>
    </>
  );
};

export default Gallery;

//useEffect(() => {
//  const getGallery = async () => {
//    const gallery = await getFirebaseGallery(galleryId);

//    setGallery(gallery);
//  };

//  // eslint-disable-next-line react-hooks/exhaustive-deps
//  getGallery();
//}, []);