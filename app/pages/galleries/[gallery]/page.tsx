"use client";

import LoadingSpinner from "@/app/components/higherOrderComponent/LoadingSpinner ";
import { db } from "@/app/firebase/clientApp ";
import { GalleryType } from "@/app/firebase/types ";
import getFirebaseGallery from "@/app/functions/FirebaseFunctions/getFirebaseGallery ";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { arrayUnion, doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 } from "uuid";

import { storage } from "../../../firebase/clientApp";

//toDo in this folder
//1. Update the types and fix the errors
//2. Set a better naming convention for the images in the gallery

interface Image {
  id: string;
  file: File;
}
type FileListArray = Array<FileList | null>;

type FileType = {
  path: string;
  preview: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
};

const Gallery: React.FC = () => {
  const searchParams = useSearchParams();
  const galleryId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState<GalleryType>();
  const [files, setFiles] = useState<FileType[] | []>([]);
  const [showCancelButton, setShowCancelButton] = useState(false);

  const [rejected, setRejected] = useState([]);

  //  const { gallery, loading, error } = useGallery(galleryId!);
  const getGallery = async () => {
    const gallery = await getFirebaseGallery(galleryId as string);

    setGallery(gallery);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getGallery();
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: FileList, rejectedFiles: FileListArray) => {
      console.log(acceptedFiles);
      if (acceptedFiles) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file: FileType) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
        setShowCancelButton(true);
      }

      if (rejectedFiles?.length > 0) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    // Revoke the data URL's to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files) => files?.filter((file) => file?.name !== name));
  };

  //This handles uploading the files to manage before saving to firebase.

  const saveSelected = async () => {
    //save selected files to firebase

    files.map(async (file) => {
      const imageId = v4();

      const storageMetaData = {
        id: imageId,
        name: file.name,
      };

      //Stores the image on the firebase storage
      const storageRef = ref(storage, "galleries/" + galleryId + "/images/");
      const imageRef = ref(storageRef, imageId);
      await uploadBytes(imageRef, file, storageMetaData);

      const downloadUrl = await getDownloadURL(imageRef);
      const docRef = doc(db, "galleries", galleryId);
      const imageObject = {
        id: imageId,
        name: file.name,
        downloadUrl,
        createdAt: new Date(),
        isFavourite: false,
      };

      await updateDoc(docRef, {
        documentUrls: arrayUnion(imageObject),
      });

      setFiles([]);
    });

    getGallery();
  };

  if (loading === true) {
    return <LoadingSpinner />;
  }

  const deleteImage = async (imageId: string) => {
    const docRef = doc(db, "galleries", galleryId);
    const storageRef = ref(storage, `galleries/${galleryId}/images/${imageId}`);

    const updatedDocumentArray = gallery?.documentUrls?.filter(
      (items) => items.id !== imageId
    );

    await updateDoc(docRef, { documentUrls: updatedDocumentArray });
    await deleteObject(storageRef);
    getGallery();
  };

  console.log(files);
  console.log(gallery, " thisis the gallery");

  return (
    <>
      {/* This is the dropszone and onselect */}
      <Flex
        border="6px"
        minHeight="120px"
        bg="starNight.medium"
        justifyContent="center"
        alignItems="center"
        margin="2%"
      >
        <Box {...getRootProps({})}>
          <input {...getInputProps({})} />
          {isDragActive ? (
            <Text> Drop Em</Text>
          ) : (
            <Button bg="starNight.hover" color="starNight.dark">
              Drag files or Select Upload
            </Button>
          )}
        </Box>
      </Flex>

      <Flex justifyContent="center" alignItems="center">
        {files && showCancelButton ? (
          <>
            <Button
              onClick={() => {
                setFiles([]);
                setShowCancelButton(false);
              }}
              bg="orange.500"
            >
              {" "}
              Cancel Upload
            </Button>
            <Button onClick={saveSelected} backgroundColor="starNight.light">
              {" "}
              Save Images
            </Button>
          </>
        ) : null}
      </Flex>

      {/* This section allows the user to preview
 	and check if they're selected the correct 
	photos before they upload */}

      <Flex justify="center" alignItems="center">
        <List>
          {files?.map((item) => (
            <ListItem>
              <Image src={item?.preview} />
              <Button onClick={() => removeFile(item?.name)}> Remove</Button>
            </ListItem>
          ))}
        </List>
      </Flex>

      <Box>
        <SimpleGrid>
          {gallery?.documentUrls?.map((item) => {
            return (
              <>
                <Image
                  src={item.downloadUrl}
                  key={item.id}
                  onClick={() => deleteImage(item.id)}
                ></Image>

                <Button onClick={() => deleteImage(item.id)}>Delete</Button>
              </>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Gallery;
