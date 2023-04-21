"use client";

import LoadingSpinner from "@/app/components/higherOrderComponent/LoadingSpinner ";
import { GalleryType, ImageType } from "@/app/firebase/types ";
import getFirebaseGallery from "@/app/functions/FirebaseFunctions/getFirebaseGallery ";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface Image {
  id: string;
  file: File;
}

const Gallery: React.FC = () => {
  const searchParams = useSearchParams();

  const galleryId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState<GalleryType>();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<String>(null);

  const selectedFileRef = useRef<HTMLInputElement>(null);

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
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
  };

  console.log(selectedFile);

  return (
    <>
      <Flex justify="center" align="center" width="100%">
        <Flex>
          <Button
            onClick={() => {
              selectedFileRef.current?.click();
            }}
          >
            Upload an Image
          </Button>
        </Flex>
      </Flex>

      <Input
        ref={selectedFileRef}
        type="file"
        hidden
        onChange={onSelectImage}
      ></Input>

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
