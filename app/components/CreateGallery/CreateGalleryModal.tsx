//import React from "react";
//import {
//  Box,
//  Button,
//  Modal,
//  ModalBody,
//  ModalContent,
//  ModalFooter,
//  ModalOverlay,
//  ModalHeader,
//  Input,
//  VStack,
//  useToast,
//  Spinner,
//} from "@chakra-ui/react";
//import { AddIcon } from "@chakra-ui/icons";

//const CreateGalleryModal: React.FC = () => {
//  return (
//    <Box width="100%" display="flex" justifyContent="center">
//      <Button
//        bg="starNight.medium"
//        _hover={{ backgroundColor: "starNight.light" }}
//        onClick={handleOpenModal}
//      >
//        <AddIcon /> Create Gallery
//      </Button>

//      <Box>
//        <Modal isOpen={toggleGalleryModal} onClose={handleOpenModal}>
//          <ModalOverlay />
//          <ModalContent>
//            <ModalHeader>Details</ModalHeader>
//            <ModalBody>
//              <VStack spacing={4}>
//                <Input
//                  required
//                  value={galleryName}
//                  onChange={(e) => setGalleryName(e.target.value)}
//                  placeholder="Gallery Name"
//                  size="lg"
//                  margin="1rem"
//                />
//                <Input
//                  required
//                  value={galleryDescription}
//                  onChange={(e) => setGalleryDescription(e.target.value)}
//                  placeholder="Description"
//                  size="lg"
//                  margin="1rem"
//                />
//              </VStack>
//            </ModalBody>
//            <ModalFooter display="flex" justifyContent="space-between">
//              <Button onClick={createNewGallery} bg="starNight.medium">
//                Create Gallery
//              </Button>
//              <Button onClick={handleCloseModal}>Cancel</Button>
//            </ModalFooter>
//          </ModalContent>
//        </Modal>
//      </Box>
//    </Box>
//  );
//};

//export default CreateGalleryModal;
