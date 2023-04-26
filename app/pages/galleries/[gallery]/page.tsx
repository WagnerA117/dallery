"use client";

import LoadingSpinner from "@/app/components/higherOrderComponent/LoadingSpinner ";
import { db } from "@/app/firebase/clientApp ";
import { GalleryType, ImageType } from "@/app/firebase/types ";
import getFirebaseGallery from "@/app/functions/FirebaseFunctions/getFirebaseGallery ";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import { arrayUnion, doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 } from "uuid";

import { storage } from "../../../firebase/clientApp";

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
  const [rejected, setRejected] = useState([]);

  //  const selectedFileRef = useRef<HTMLInputElement>(null);

  //  const { gallery, loading, error } = useGallery(galleryId!);

  useEffect(() => {
    const getGallery = async () => {
      const gallery = await getFirebaseGallery(galleryId);

      setGallery(gallery);

      setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    getGallery();
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: FileType, rejectedFiles: FileType) => {
      console.log(acceptedFiles);
      if (acceptedFiles) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }

      if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    []
  );

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files) => files?.filter((file) => file?.name !== name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (loading === true) {
    return <LoadingSpinner />;
  }

  //This handles uploading the files to manage before saving to firebase.

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

  return (
    <>
      <Flex justify="center" align="center" width="100%">
        <Flex>
          {/*<Button
            bg="starNight.medium"
            onClick={() => {
              selectedFileRef.current?.click();
            }}
          >
            Select Images
          </Button>*/}

          <Button onClick={saveSelected}> Save Images</Button>
        </Flex>
      </Flex>

      <Flex border="8px" minHeight="100px">
        <Box {...getRootProps()} minHeight="">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <Box>Drag 'n' drop some files here, or click to select files</Box>
          )}
        </Box>
      </Flex>

      <Flex justify="center" alignItems="center">
        {files ? (
          <Button
            onClick={() => {
              setFiles([]);
            }}
            bg="orange.500"
          >
            {" "}
            Cancel
          </Button>
        ) : null}

        <List>
          {files?.map((item) => (
            <ListItem>
              <Image src={item?.preview} />
              <Button onClick={() => removeFile(item?.name)}> Remove</Button>
            </ListItem>
          ))}
        </List>
      </Flex>
    </>
  );
};

export default Gallery;
