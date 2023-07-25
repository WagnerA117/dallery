import { Box, Button, Flex, Image, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const useRandomArtWork = () => {
  return useQuery({
    queryKey: ["randomArtwork"],
    queryFn: async () => {
      const result = await fetch("/api/randomArtwork", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });

      return result.json();
    },
  });
};

const RandomArtWorks: React.FC = () => {
  const { data: randomArtwork, refetch, isLoading } = useRandomArtWork();

  //This will chose a random painting out of the response of 10;

  const handleClick = () => {
    refetch();
  };

  if (isLoading || !randomArtwork) {
    return <LoadingSpinner />;
  }

  //TODO: check about creating a basic default image sizxe for images
  //TODO: use the main colour background to reactivly set the background colour of the div should it overflow

  const imageUrl = `https://www.artic.edu/iiif/2/${randomArtwork["image_id"]}/full/843,/0/default.jpg`;

  return (
    <>
      <Box>
        <Flex alignItems="center" direction="column">
          {isLoading || !randomArtwork ? (
            <Skeleton
              isLoaded={!isLoading}
              maxH="70vh"
              minH="70vh"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <LoadingSpinner />
            </Skeleton>
          ) : (
            <Flex direction="column" alignItems="center" width="100%">
              <Image
                maxH="70vh"
                minH="70vh"
                src={imageUrl}
                alt="this is the alt"
                padding="2%"
                objectFit={"contain"}
              />
            </Flex>
          )}
        </Flex>
      </Box>
      <Button onClick={handleClick}>Find a random artwork</Button>
    </>
  );
};

export default RandomArtWorks;
