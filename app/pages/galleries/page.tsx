"use client";
import CreateGallery from "@/app/components/CreateGallery/CreateGallery ";
import ProtectedRoute from "@/app/components/higherOrderComponent/withAuth ";

//userGallery
//publicGallery for logged in

const GalleriesPage: React.FC = () => {
  return <CreateGallery />;
};

export default ProtectedRoute(GalleriesPage);
