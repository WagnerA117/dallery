"use client";
import React, { useEffect, useState } from "react";

type GetRandomArtsyImage = () => Promise<string>;

const getRandomArtsyImage: GetRandomArtsyImage = async () => {
  const clientId = process.env.NEXT_PUBLIC_ARTSY_API_KEY;
  const clientSecret = process.env.NEXT_PUBLIC_ARTSY_SECRET;

  const tokenRequest = await fetch(
    "https://api.artsy.net/api/tokens/xapp_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
      }),
    }
  );

  if (!tokenRequest.ok) {
    throw new Error(
      `Artsy API authentication failed with status ${tokenRequest.status}`
    );
  }

  const data = await tokenRequest.json();
  const token = data.token;

  const response = await fetch(`https://api.artsy.net/api/artworks`, {
    headers: {
      "X-Xapp-Token": token,
      Accept: "application/vnd.artsy-v2+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Artsy API returned ${response.status}`);
  }

  const artwork = await response.json();
  return artwork.images[0].url;
};

export default getRandomArtsyImage;
