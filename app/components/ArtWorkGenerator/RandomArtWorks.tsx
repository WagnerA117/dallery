import { Box, Button, Flex, Image, Skeleton } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

//Variables for this file
const randomIndex = Math.floor(Math.random() * 10);

const useRandomArtWork = () => {
  return useMutation({
    mutationKey: ["randomArtwork"],
    mutationFn: async () => {
      const result = await fetch("/api/randomArtwork", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return result.json();
    },
  });
};

const RandomArtWorks: React.FC = () => {
  const { mutate: postRandomArtwork, data, isLoading } = useRandomArtWork();

  useEffect(() => {
    postRandomArtwork();
    console.log("useEffect called");
  }, []);

  //This will chose a random painting out of the response of 10;

  //  const fetchRandomArtwork = async () => {
  //    const minPage = 1; // Minimum page number
  //    const maxPage = 100; // Maximum page number
  //    const randomNumber =
  //      Math.floor(Math.random() * (maxPage - minPage + 1)) + minPage;

  //    const request = await fetch(
  //      `https://api.artic.edu/api/v1/artworks/search`,
  //      {
  //        method: "POST",
  //        headers: {
  //          "Content-Type": "application/json",
  //        },
  //        body: JSON.stringify({
  //          query: {
  //            term: {
  //              is_public_domain: true,
  //            },
  //          },
  //          fields: [
  //            "artist_display",
  //            "artist_title",
  //            "classification_id",
  //            "classification_title",
  //            "date_display",
  //            "is_public_domain",
  //            "id",
  //            "image_id",
  //            "style_title",
  //            "style_id",
  //            "subject",
  //            "main_reference_number",
  //            "title",
  //          ],
  //          page: randomNumber,
  //        }),
  //      }
  //    );

  //    const response = await request.json();

  //    return response;
  //  };

  //  const {
  //    data: artwork,
  //    isLoading,
  //    isFetching,
  //    refetch,
  //  } = useQuery({
  //    queryKey: ["randomArtwork"],
  //    queryFn: fetchRandomArtwork,
  //  });

  //  const handleClick = () => {
  //    refetch();
  //  };

  const handleRouteCall = () => {
    console.log("route call");
    postRandomArtwork();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  console.log(data);

  //  const randomArtwork = artwork?.data[randomIndex];

  //TODO: check about creating a basic default image sizxe for images
  //TODO: use the main colour background to reactivly set the background colour of the div should it overflow

  //  const imageUrl = `https://www.artic.edu/iiif/2/${randomArtwork["image_id"]}/full/843,/0/default.jpg`;

  return (
    <>
      <Box>
        <Flex alignItems="center" direction="column">
          <Flex
            direction="column"
            alignItems="center"
            bg={"starNight.dark"}
            width="100%"
          >
            <Image
              maxH="70vh"
              minH="70vh"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg/1920px-Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg"
              alt="this is the alt"
              padding="2%"
              objectFit={"contain"}
            />
          </Flex>
          {/*{isFetching ? (
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

              
            </Skeleton>
          ) : (

          )}*/}
        </Flex>
      </Box>
      {/*<Button onClick={handleClick}>Find a random artwork</Button>*/}
      <Button onClick={handleRouteCall}>Find a random artwork</Button>
    </>
  );
};

export default RandomArtWorks;
