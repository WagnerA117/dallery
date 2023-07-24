import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const randomIndex = Math.floor(Math.random() * 10);
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
          "Cache-Control": "no-cache, no-store, must-revalidate",
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
    const randomArtwork = response?.data[randomIndex];

    return NextResponse.json(randomArtwork);
  } catch (err) {
    return NextResponse.error();
  }
};
