"use client";

import getRandomArtsyImage from "@/app/functions/getRandomArtsyImage ";
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

  const fetchArtwork = async () => {
    const query =
      "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number&classification_title=painting&limit=100&";

    //const params = new URLSearchParams({
    //  fields:
    //    "id,image_id,title,artist_display,date_display,thumbnail,public_domain=true,classification_title",
    //  limit: "100", // Change this value to retrieve more or fewer artworks
    //});

    const response = await fetch(query);

    const data = await response.json();

    console.log(data);

    const randomIndex = Math.floor(Math.random() * data.data.length);
    const artwork = data.data[randomIndex];
    setCurrentArtwork(artwork);
  };

  useEffect(() => {
    fetchArtwork();
  }, []);

  const handleClick = () => {
    fetchArtwork();
    console.log(currentArtwork, "this is the current artwork");
  };

  if (!currentArtwork) {
    return (
      <div>
        <Spinner></Spinner>
      </div>
    );
  }

  //https://www.artic.edu/iiif/2/{identifier}/{region}/{size}/{rotation}/{quality}.{format}
  const imageUrl = `https://www.artic.edu/iiif/2/${currentArtwork["image_id"]}/full/843,/0/default.jpg`;

  return (
    <div>
      <Image src={imageUrl} alt="this is the alt"></Image>

      <Button onClick={handleClick}>Generate artwork</Button>
    </div>
  );
};

export default RandomArtWorks;
