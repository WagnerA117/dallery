import { Button, Card, Heading, Image } from "@chakra-ui/react";
import React from "react";

interface GalleryItemProps {
  id: string;
  name: string;
  description: string;
  updateFirebaseGalleries: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ id, name, description }) => {
  return (
    <Card>
      <Heading>{name}</Heading>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg/540px-Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg"
        alt="Van Gogh Almond Blossom Painting"
      />
    </Card>
  );
};

export default GalleryItem;
