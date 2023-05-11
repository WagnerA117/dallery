import AuthContext from "@/app/firebase/AuthProvider ";
import { Box } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import LoadingSpinner from "./LoadingSpinner";

export interface ProtectedRouteProps extends NextPageContext {
  currentUser?: object;
}

//naming convention use 'with'

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper = (props: P) => {
    const router = useRouter();
    //use currentUser
    const { currentUser, loading } = useContext(AuthContext);

    //useEffect(() => {
    //  if (!currentUser) {
    //    // Redirect to login page if user is not authenticated
    //    router.push("/");
    //  }
    //}, []);

    if (!currentUser) {
      if (loading) {
        return <LoadingSpinner />;
      }

      // Return null or loading spinner while authentication is being checked
      return null;
    }

    // If user is authenticated, render the protected component
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
