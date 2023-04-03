import AuthContext from "@/app/firebase/AuthProvider ";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { NextPageContext } from "next";

export interface ProtectedRouteProps extends NextPageContext {
  currentUser?: object;
}

const ProtectedRoute = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper = (props: P) => {
    const router = useRouter();
    //use currentUser
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
      if (!currentUser) {
        // Redirect to login page if user is not authenticated
        router.push("/");
      }
    }, []);

    if (!currentUser) {
      // Return null or loading spinner while authentication is being checked
      return null;
    }

    // If user is authenticated, render the protected component
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default ProtectedRoute;
