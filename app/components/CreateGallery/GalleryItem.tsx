import { GalleryType } from "@/app/firebase/types ";
import { Button, Card, Heading, Image } from "@chakra-ui/react";
import React from "react";

interface GalleryItemProps {
  gallery: GalleryType;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ gallery }) => {
  return (
    <Card>
      <Heading>{gallery.name}</Heading>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg/540px-Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg"
        alt="Van Gogh Almond Blossom Painting"
      />
    </Card>
  );
};

export default GalleryItem;
