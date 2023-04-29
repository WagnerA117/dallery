import React, { useEffect, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/clientApp ";
import GalleryItem from "./GalleryItem";

const GalleryGrid: React.FC = () => {
  return (
    <div>This is a div</div>
    //<Box display="flex" justifyContent="center">
    //  <Grid
    //    templateColumns="repeat(3, 1fr)"
    //    gap={6}
    //    border="10px"
    //    borderColor="starNight.light"
    //  >
    //    {galleries.map((item) => (
    //      <>
    //        <GalleryItem key={item.id} {...item} />
    //      </>
    //    ))}
    //  </Grid>
    //</Box>
  );
};

export default GalleryGrid;
