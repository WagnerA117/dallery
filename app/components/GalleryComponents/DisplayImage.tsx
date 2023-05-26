import { GalleryType, ImageType } from "@/app/firebase/types ";
import { DocumentUrlObject } from "@/app/firebase/types ";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import { on } from "events";
import React, { useRef, useState } from "react";

type PropTypes = {
  gallery?: GalleryType;
  images?: ImageType[];
  deleteImage: (id: string | undefined) => void;
};

const DisplayImage: React.FC<PropTypes> = ({ images, deleteImage }) => {
  const [viewImage, setViewImage] = useState<DocumentUrlObject | undefined>();
  const [removeImage, setRemoveImage] = useState<
    DocumentUrlObject | undefined
  >();

  const cancelRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  return (
    <>
      {/* This is to opens up the image*/}

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

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  setRemoveImage(undefined);
                  onDeleteClose();
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteImage(removeImage!.id);
                  onDeleteClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
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
                onClick={() => {
                  onDeleteOpen();
                  setRemoveImage(image as any);
                }}
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
