"use client";

import { Button, Image, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

//const getArtsyArtworkdata = async () => {
//  const response = await fetch(`https://api.artsy.net/api/artworks`, {
//    headers: {
//      "X-Xapp-Token": process.env.NEXT_PUBLIC_ARTSY_APP_TOKEN!,
//      Accept: "application/vnd.artsy-v2+json",
//    },
//  });

//  const data = await response.json();

//  console.log(data._embedded);

//  const artwork = data[0];

//  return artwork;
//};

const RandomArtWorks: React.FC = () => {
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchArtwork = async () => {
    const minPage = 1; // Minimum page number
    const maxPage = 100; // Maximum page number
    const randomNumber =
      Math.floor(Math.random() * (maxPage - minPage + 1)) + minPage;

    //This will chose a random painting out of the response of 10;
    const randomIndex = Math.floor(Math.random() * 10);

    console.log(randomNumber, "this is the random page number");

    //const testReq = await fetch(
    //  "https://api.artic.edu/api/v1/artworks/search?fields=id,title,artist_display,date_display,main_reference_number&query[term][is_public_domain]=true"
    //).then((response) => response.json());

    //console.log(testReq, "this is the test request");

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

    setCurrentArtwork(response.data[randomIndex]);
  };

  const newPage = () => {};
  useEffect(() => {
    fetchArtwork();
  }, []);

  const handleClick = () => {
    fetchArtwork();
  };

  if (!currentArtwork) {
    return (
      <div>
        <Spinner></Spinner>
      </div>
    );
  }

  console.log(currentArtwork, "this is the current artwork");

  //https://www.artic.edu/iiif/2/{identifier}/{region}/{size}/{rotation}/{quality}.{format}
  const imageUrl = `https://www.artic.edu/iiif/2/${currentArtwork["image_id"]}/full/843,/0/default.jpg`;

  return (
    <div>
      <Image src={imageUrl} alt="this is the alt"></Image>

      <Button onClick={handleClick}>Generate artwork</Button>
      <Button onClick={newPage}>New Page</Button>
    </div>
  );
};

export default RandomArtWorks;
