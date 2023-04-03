"use client";
import ProtectedRoute from "@/app/components/higherOrderComponent/ProtectedRoute ";

const ProfilePage = () => {
  return <div>Thi sis the profile page </div>;
};

export default ProtectedRoute(ProfilePage);
