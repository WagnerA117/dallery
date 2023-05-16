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
    const request = await fetch(
      "https://api.artic.edu/api/v1/artworks/search?fields=id,title,artist_display,date_display,main_reference_number&query[term][is_public_domain]=true&page=2"
    ).then((response) => response.json());

    console.log(request, "this is the request made now");

    setResponse(request);

    setCurrentArtwork(request.data);
  };

  const newPage = () => {};
  useEffect(() => {
    fetchArtwork();
  }, []);

  const handleClick = () => {
    fetchArtwork();
    console.log(currentArtwork, "this is the current artwork");
  };

  console.log(currentArtwork, "this is the current artwork");

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
      <Button onClick={newPage}>New Page</Button>
    </div>
  );
};

export default RandomArtWorks;
