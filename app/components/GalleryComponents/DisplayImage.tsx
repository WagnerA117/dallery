import { GalleryType } from "@/app/firebase/types ";
import { DocumentUrlObject } from "@/app/firebase/types ";
import {
  Button,
  Flex,
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
  deleteImage: (id: string) => void;
};

const DisplayImage: React.FC<PropTypes> = ({ images, deleteImage }) => {
  const [viewImage, setViewImage] = useState<DocumentUrlObject>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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

      {images?.map((image: DocumentUrlObject) => {
        return (
          <>
            <Image
              src={image.downloadUrl}
              alt={image.name}
              key={image.id}
              width="25%"
              height="25%"
              onClick={() => {
                setViewImage(image as any);
                onOpen();
              }}
            />

            <Button
              bg=""
              size="sm"
              w="25%"
              onClick={() => deleteImage(image?.id)}
            >
              {" "}
              Remove
            </Button>
          </>
        );
      })}
    </>
  );
};

export default DisplayImage;
