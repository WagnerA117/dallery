"use client";
import ProtectedRoute from "@/app/components/higherOrderComponent/withAuth ";

const ProfilePage = () => {
  return <div>This will be the profile page </div>;
};

export default ProtectedRoute(ProfilePage);
