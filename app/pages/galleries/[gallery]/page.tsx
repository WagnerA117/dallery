"use client";

import LoadingSpinner from "@/app/components/higherOrderComponent/LoadingSpinner ";
import { db } from "@/app/firebase/clientApp ";
import { GalleryType, ImageType } from "@/app/firebase/types ";
import getFirebaseGallery from "@/app/functions/FirebaseFunctions/getFirebaseGallery ";
import { Box, Button, Flex, Image, Input } from "@chakra-ui/react";
import { arrayUnion, doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

import { storage } from "../../../firebase/clientApp";

interface Image {
  id: string;
  file: File;
}
type FileListArray = Array<FileList | null>;

const Gallery: React.FC = () => {
  const searchParams = useSearchParams();

  const galleryId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState<GalleryType>();
  const [selectedFiles, setSelectedFiles] = useState<[] | null>([]);
  const [dataUrls, setDataUrls] = useState<[] | null>([]);
  const [uploadFiles, setUploadFiles] = useState<[] | null>([]);

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

  //This handles uploading the files to manage before saving to firebase.

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //Now to try get this image with name properties.

    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

      newFiles.map((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            setSelectedFiles((prevFiles) => [...prevFiles, e.target.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const saveSelected = async () => {
    //save selected files to firebase

    const storageRef = ref(storage, "galleries/" + galleryId + "/images");

    if (selectedFiles) {
      selectedFiles.map(async (file) => {
        if (file) {
          const imageRef = ref(storageRef, file?.name);
          await uploadBytes(imageRef, file);
          const downloadUrl = await getDownloadURL(imageRef);
          const imageObject = {
            id: v4(),
            name: file.name,
            downloadUrl,
            createdAt: new Date(),
          };

          const docRef = doc(db, "galleries", galleryId);

          await updateDoc(docRef, {
            documentUrls: arrayUnion(imageObject),
          });
          //  setUploadFiles((prevUploadFiles) => [
          //    ...prevUploadFiles,
          //    imageObject,
          //  ]);
        }

        setSelectedFiles([]);
        setDataUrls([]);
      });
    }
  };

  console.log(selectedFiles, " this is the selected files");
  console.log(dataUrls, " this is the data urls");
  console.log(uploadFiles, " this is the upload files");

  return (
    <>
      <Flex justify="center" align="center" width="100%">
        <Flex>
          {selectedFiles ? (
            <Button
              onClick={() => {
                setSelectedFiles([]);
                setDataUrls([]);
              }}
              bg="orange.500"
            >
              {" "}
              Cancel
            </Button>
          ) : null}
          <Button
            bg="starNight.medium"
            onClick={() => {
              selectedFileRef.current?.click();
            }}
          >
            Select Images
          </Button>

          <Button onClick={saveSelected}> Save Images</Button>
        </Flex>
      </Flex>

      <Input
        ref={selectedFileRef}
        type="file"
        hidden
        accept="image/x-png,image/gif,image/jpeg"
        multiple
        onChange={handleFileChange}
      ></Input>

      {selectedFiles?.map((file) => {
        return (
          <Box>
            <Image src={file[1]} key={Math.random()} />
          </Box>
        );
      })}
    </>
  );
};

export default Gallery;
