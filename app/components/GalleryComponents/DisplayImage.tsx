import { GalleryType, ImageType } from "@/app/firebase/types ";
import { DocumentUrlObject } from "@/app/firebase/types ";
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

type PropTypes = {
  gallery: GalleryType;
  images: ImageType[];
  deleteImage: (id: string) => void;
};

const DisplayImage: React.FC<PropTypes> = ({ images, deleteImage }) => {
  const [viewImage, setViewImage] = useState<DocumentUrlObject>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteImageModal = useDisclosure();

  return (
    <>
      {/* This is to open up the image and view it more fully */}

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <Flex
            justifyContent="center"
            alignItems="center"
            direction="column"
            height="100vh"
          >
            <Image
              src={viewImage?.downloadUrl}
              alt={viewImage?.name}
              height="100vh"
              width="auto%"
            />
            <Button bg="orange.300" onClick={onClose}>
              Close
            </Button>
          </Flex>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      {/* This modal will delete the image  */}
      <Modal
        isOpen={deleteImageModal.isOpen}
        onClose={deleteImageModal.onClose}
      >
        <>
          <ModalOverlay />

          <ModalContent>
            {console.log("deleteImageModal", deleteImageModal)}
            <Button bg="red.300" onClick={deleteImage(id)}>
              Delete
            </Button>
            <Button bg="orange.300" onClick={deleteImageModal.onClose}>
              Cancel
            </Button>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </>
      </Modal>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {images?.map((image: DocumentUrlObject) => {
          return (
            <Flex align="center" direction="column" padding="2%">
              <Image
                src={image.downloadUrl}
                alt={image.name}
                minWidth="100%"
                minHeight="100%"
                key={image.id}
                onClick={() => {
                  setViewImage(image as any);
                  onOpen();
                }}
              />

              <Button
                bg=""
                size="md"
                margin="0.5rem"
                w="25%"
                onClick={() => deleteImageModal.onOpen()}
              >
                {" "}
                Remove
              </Button>
            </Flex>
          );
        })}
      </Grid>
    </>
  );
};

export default DisplayImage;
