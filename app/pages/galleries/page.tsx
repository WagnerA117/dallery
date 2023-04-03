"use client";
import {
  Button,
  Box,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/app/firebase/AuthProvider ";
import { useRouter } from "next/navigation";

//userGallery
//publicGallery for logged in

interface Gallery {
  id: number;
}

const GalleriesPage: React.FC = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [gridItems, setGridItems] = useState<Gallery[]>([]);

  const [toggleGalleryModal, setToggleGalleryModal] = useState(false);
  const [galleryName, setGalleryName] = useState("");
  const [galleryDescription, setGalleryDescription] = useState("");

  function addGridItem() {
    console.log(gridItems);
    setGridItems((prevGridItems) => [...prevGridItems, { id: Date.now() }]);
  }

  const handleOpenModal = () => {
    setToggleGalleryModal(true);
  };

  const handleCloseModal = () => {
    setToggleGalleryModal(false);
  };

  //  useEffect(() => {
  //    if (!currentUser) {
  //      router.push("/");
  //    }
  //  }, [currentUser]);

  return (
    <>
      {currentUser ? (
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
                  <ModalHeader>Gallery Details</ModalHeader>
                  <ModalBody>
                    <Input
                      required
                      value={galleryName}
                      onChange={(e) => setGalleryName(e.target.value)}
                      placeholder="Gallery Name"
                      size="lg"
                    />
                    <Input
                      required
                      value={galleryDescription}
                      onChange={(e) => setGalleryDescription(e.target.value)}
                      placeholder="Description"
                      size="lg"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={addGridItem}>Create Gallery</Button>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={6}
              border="10px"
              borderColor="starNight.light"
            >
              {gridItems.map((item) => (
                <GridItem
                  key={item.id}
                  minHeight="10px"
                  minWidth="10px"
                  bg="starNight.light"
                >
                  This is a grid
                </GridItem>
              ))}
            </Grid>
          </Box>
        </>
      ) : (
        <div> You are not logged in, please login to continue</div>
      )}
    </>
  );
};

export default GalleriesPage;
