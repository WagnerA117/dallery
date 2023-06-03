"use client";

import useCustomToast from "@/app/customHooks/useCustomToast ";
import { auth, db } from "@/app/firebase/clientApp ";
import { GalleryType } from "@/app/firebase/types ";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";

import addFirebaseGallery from "../../functions/FirebaseFunctions/addFirebaseGallery";
import Link from "../Link/Link";
import GalleryItem from "./GalleryItem";

const CreateGallery: React.FC = () => {
  const showToast = useCustomToast();

  const [toggleGalleryModal, setToggleGalleryModal] = useState(false);
  const [galleryName, setGalleryName] = useState("");
  const [galleryDescription, setGalleryDescription] = useState("");

  const [galleries, setGalleries] = useState<GalleryType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const userId = auth.currentUser?.uid;

  const handleOpenModal = () => {
    return setToggleGalleryModal(true);
  };

  const handleCloseModal = () => {
    return setToggleGalleryModal(false);
  };

  const getFirebaseGalleries = async () => {
    const docRef = doc(db, "galleries", userId!);
    const docSnap = await getDoc(docRef);

    const document = docSnap.data();

    setGalleries(document?.userGalleries);
  };

  useEffect(() => {
    setIsLoading(true);
    getFirebaseGalleries();
    setIsLoading(false);
  }, []);

  const createNewGallery = async () => {
    if (!galleryName) {
    }

    //TODO: Better handling of potential errors over here
    setIsLoading(true);
    //Firebase call to add the gallery to the collection
    await addFirebaseGallery(galleryName, galleryDescription);

    //Manage the stateful variables in the file

    await getFirebaseGalleries().catch((err) => {
      showToast(
        "Error",
        "There was an error creating your gallery, please try again",
        "error"
      );
    });
    setGalleryName("");
    setGalleryDescription("");
    setToggleGalleryModal(false);

    setIsLoading(false);
  };

  const deleteGallery = async (galleryId: string) => {
    const docRef = doc(db, "galleries", userId!);

    const updatedDocumentArray = galleries.filter(
      (items) => items.id !== galleryId
    );

    await updateDoc(docRef, { userGalleries: updatedDocumentArray });

    await getFirebaseGalleries();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Box width="100%" display="flex" justifyContent="center">
        <Button
          bg="starNight.medium"
          _hover={{ backgroundColor: "starNight.light" }}
          onClick={handleOpenModal}
        >
          <AddIcon /> Create Gallery
        </Button>

        <Box>
          <Modal isOpen={toggleGalleryModal} onClose={handleOpenModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Details</ModalHeader>
              <ModalBody>
                <VStack spacing={4}>
                  <Input
                    required
                    value={galleryName}
                    onChange={(e) => setGalleryName(e.target.value)}
                    placeholder="Gallery Name"
                    size="lg"
                    margin="1rem"
                  />
                  <Input
                    required
                    value={galleryDescription}
                    onChange={(e) => setGalleryDescription(e.target.value)}
                    placeholder="Description"
                    size="lg"
                    margin="1rem"
                  />
                </VStack>
              </ModalBody>
              <ModalFooter display="flex" justifyContent="space-between">
                <Button onClick={createNewGallery} bg="starNight.medium">
                  Create Gallery
                </Button>
                <Button onClick={handleCloseModal}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>

      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={6}
        border="10px"
        borderColor="starNight.light"
        padding="1rem"
      >
        {galleries?.map((gallery) => (
          <Box key={gallery.id}>
            <Link
              href={{
                pathname: `./pages/galleries/${gallery.id}`,
                query: { id: gallery.id },
              }}
            >
              <GalleryItem gallery={gallery} />
            </Link>

            <Button
              onClick={async () => {
                deleteGallery(gallery.id);
                await getFirebaseGalleries();
              }}
              width="100%"
            >
              Remove
            </Button>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default CreateGallery;
