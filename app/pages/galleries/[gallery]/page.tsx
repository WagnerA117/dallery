//@ts-nocheck
"use client";

import DisplayImage from "@/app/components/GalleryComponents/DisplayImage ";
import LoadingSpinner from "@/app/components/higherOrderComponent/LoadingSpinner ";
import ProtectedRoute from "@/app/components/higherOrderComponent/withAuth ";
import { auth, db } from "@/app/firebase/clientApp ";
import { FileType, GalleryType, ImageType } from "@/app/firebase/types ";
import getFirebaseGallery from "@/app/functions/FirebaseFunctions/getFirebaseGallery ";
import getFirebaseImages from "@/app/functions/FirebaseFunctions/getFirebaseImages ";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
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
import ts from "typescript";
import { v4 } from "uuid";

import { storage } from "../../../firebase/clientApp";

//@ts-nocheck

//@ts-nocheck

//@ts-nocheck

//toDo in this folder
//1. Update the types and fix the errors
//2. Set a better naming convention for the images in the gallery

interface Image {
  id: string;
  file: File;
}
type FileListArray = Array<FileList | null>;

const Gallery: React.FC = () => {
  const searchParams = useSearchParams();
  const galleryId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState<GalleryType | []>();
  const [images, setImages] = useState<ImageType[]>();
  const [files, setFiles] = useState<FileType[]>([]);
  const [showCancelSave, setCancelSave] = useState(false);

  const [rejected, setRejected] = useState([]);

  //  const { gallery, loading, error } = useGallery(galleryId!);
  const userId = auth.currentUser?.uid;
  const getGallery = async () => {
    const gallery = await getFirebaseGallery(userId as string, galleryId!);

    setGallery(gallery);
    setLoading(false);
  };

  const getImages = async () => {
    const images = await getFirebaseImages(userId as string, galleryId!);
    //@ts-ignore
    setImages(images);
  };

  useEffect(() => {
    getGallery();
    getImages();
    setLoading(false);
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: FileList, rejectedFiles: FileListArray) => {
      if (acceptedFiles) {
        setCancelSave(true);
        setFiles((previousFiles) => [
          ...previousFiles,
          //@ts-ignore
          ...acceptedFiles.map((file: FileType) =>
            //@ts-ignore
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }

      if (rejectedFiles?.length > 0) {
        //@ts-ignore
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
      //@ts-ignore
      await uploadBytes(imageRef, file, storageMetaData);

      const downloadUrl = await getDownloadURL(imageRef);

      const docRef = doc(db, "userImages", userId!);

      const imageObject = {
        id: imageId,
        name: file.name,
        galleryId,
        downloadUrl,
        createdAt: new Date(),
        isFavourite: false,
      };

      await updateDoc(docRef, {
        images: arrayUnion(imageObject),
      });

      //
      await getImages();
    });
    setFiles([]);
    setCancelSave(false);
  };

  if (loading === true) {
    return <LoadingSpinner />;
  }
  //improvement: use firebase arrayRemove to update this!

  const deleteImage = async (imageId: string) => {
    const docRef = doc(db, "userImages", userId!);
    const storageRef = ref(storage, `galleries/${galleryId}/images/${imageId}`);

    if (imageId) {
      const updatedDocumentArray = images?.filter(
        (items) => items.id !== imageId
      );

      await updateDoc(docRef, { images: updatedDocumentArray });
      await deleteObject(storageRef);
      getImages();
    } else {
      console.log("No image id");
    }
  };

  return (
    <>
      {/* This is the dropszone and onselect */}
      {/* @ts-ignore */}
      <Box margin="2%">
        <Heading width="100%" textAlign="center">
          {" "}
          {gallery?.galleryName}{" "}
        </Heading>
        <Flex
          border="6px"
          minHeight="120px"
          bg="orange.400"
          justifyContent="center"
          alignItems="center"
        >
          <Box {...getRootProps({})}>
            <input {...getInputProps({})} />
            {isDragActive ? (
              <Text> Drop Em</Text>
            ) : (
              <Button>Drag files or Select Upload</Button>
            )}
          </Box>
        </Flex>

        <Flex justifyContent="center" alignItems="center">
          {showCancelSave ? (
            <Flex>
              <Button
                onClick={() => {
                  setFiles([]);
                  setCancelSave(false);
                }}
                bg="orange.500"
              >
                {" "}
                Cancel Upload
              </Button>
              <Button onClick={saveSelected}> Save Images</Button>
            </Flex>
          ) : null}
        </Flex>

        {/* This section allows the user to preview
 	and check if they're selected the correct 
	photos before they upload */}

        <Flex justify="center" alignItems="center" margin="2%">
          <List>
            {files?.map((item) => (
              <ListItem>
                <Image src={item?.preview} />
                <Button onClick={() => removeFile(item?.name)}> Remove</Button>
              </ListItem>
            ))}
          </List>
        </Flex>

        <DisplayImage images={images} deleteImage={deleteImage} />
      </Box>
    </>
  );
};

export default ProtectedRoute(Gallery);
