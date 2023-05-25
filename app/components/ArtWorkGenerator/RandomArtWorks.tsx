"use client";

import { Box, Button, Flex, Image, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ref } from "firebase/storage";
import React, { useEffect, useState } from "react";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const RandomArtWorks: React.FC = () => {
  const [currentArtwork, setCurrentArtwork] = useState(null);

  //This will chose a random painting out of the response of 10;
  const randomIndex = Math.floor(Math.random() * 10);

  const fetchRandomArtwork = async () => {
    const minPage = 1; // Minimum page number
    const maxPage = 100; // Maximum page number
    const randomNumber =
      Math.floor(Math.random() * (maxPage - minPage + 1)) + minPage;

    const request = await fetch(
      `https://api.artic.edu/api/v1/artworks/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: {
            term: {
              is_public_domain: true,
            },
          },
          fields: [
            "artist_display",
            "artist_title",
            "classification_id",
            "classification_title",
            "date_display",
            "is_public_domain",
            "id",
            "image_id",
            "style_title",
            "style_id",
            "subject",
            "main_reference_number",
            "title",
          ],
          page: randomNumber,
        }),
      }
    );

    const response = await request.json();

    return response;
  };

  const {
    data: artwork,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["randomArtwork"],
    queryFn: fetchRandomArtwork,
  });

  const handleClick = () => {
    refetch();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const randomArtwork = artwork?.data[randomIndex];

  //TODO: check about creating a basic default image sizxe for images
  //TODO: use the main colour background to reactivly set the background colour of the div should it overflow

  const imageUrl = `https://www.artic.edu/iiif/2/${randomArtwork["image_id"]}/full/843,/0/default.jpg`;

  return (
    <>
      <Box>
        <Flex alignItems="center" direction="column">
          {isFetching ? (
            <Skeleton
              isLoaded={!isLoading}
              maxH="70vh"
              minH="70vh"
              bg="starNight.dark"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <LoadingSpinner />

              <Button onClick={handleClick}>Find a random artwork</Button>
            </Skeleton>
          ) : (
            <Flex
              direction="column"
              alignItems="center"
              bg={"starNight.dark"}
              width="100%"
            >
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
