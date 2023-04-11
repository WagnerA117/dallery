import React from "react";

import { Button, Card, Image, Heading } from "@chakra-ui/react";

import deleteGallery from "@/app/functions/deleteFirebaseGallery ";

interface GalleryItemProps {
  id: string;
  name: string;
  description: string;
  updateFirebaseGalleries: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  id,
  name,
  description,
  updateFirebaseGalleries,
}) => {
  return (
    <Card>
      <Heading>{name}</Heading>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg/540px-Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg"
        alt="Van Gogh Almond Blossom Painting"
      />
      <Button
        onClick={() => {
          deleteGallery(id);
          updateFirebaseGalleries();
        }}
      >
        Remove
      </Button>
    </Card>
  );
};

export default GalleryItem;
