"use client";
import React, { useEffect, useState, useRef } from "react";

import {
  Box,
  Button,
  Modal,
  Grid,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
  Input,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import GalleryItem from "./GalleryItem";
import { collection, getDocs } from "firebase/firestore";
import addFirebaseGallery from "../../functions/addFirebaseGallery";

import { db } from "@/app/firebase/clientApp ";
import CreateGalleryModal from "./CreateGalleryModal";
import GalleryGrid from "./GalleryGrid";

interface Gallery {
  id: number;
  name?: string;
}

const CreateGallery: React.FC = () => {
  const toast = useToast();

  const [toggleGalleryModal, setToggleGalleryModal] = useState(false);
  const [galleryName, setGalleryName] = useState("");
  const [galleryDescription, setGalleryDescription] = useState("");

  const [galleries, setGalleries] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const handleOpenModal = () => {
    return setToggleGalleryModal(true);
  };

  const handleCloseModal = () => {
    setToggleGalleryModal(false);

    setToggleGalleryModal(false);
  };

  function EmptyInfoToast() {
    return toast({
      title: "Add a Title Description",
      description:
        "Make sure to include a name and description for your gallery!",
      status: "warning",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }

  const SuccessToast = () => {
    return toast({
      title: "Success!",
      description: "Your gallery has been created!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const getFirebaseGalleries = async () => {
    const collectionRef = collection(db, "galleries");
    const querySnapshot = await getDocs(collectionRef);

    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setGalleries(documents);
  };

  useEffect(() => {
    getFirebaseGalleries();
    setIsLoading(false);
  }, []);

  function createNewGallery() {
    if (!galleryName) {
      return EmptyInfoToast();
    }
    //Firebase call to add the gallery to the collection
    addFirebaseGallery(galleryName, galleryDescription);
    setGalleryName("");
    setGalleryDescription("");
    setToggleGalleryModal(false);
    getFirebaseGalleries();
    SuccessToast();
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {/*<CreateGalleryModal  />*/}
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

      {/*<GalleryGrid />*/}

      <Box display="flex" justifyContent="center" margin="2%">
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={6}
          border="10px"
          borderColor="starNight.light"
        >
          {galleries.map((item) => (
            <>
              <GalleryItem
                key={item.id}
                {...item}
                updateFirebaseGalleries={getFirebaseGalleries}
              />
            </>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default CreateGallery;
