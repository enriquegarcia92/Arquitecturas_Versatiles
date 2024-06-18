import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { whoami } from "../api/whoamiAPI";

const PrivateRoutes: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    whoami
      .whoami()
      .then((response) => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        localStorage.clear();
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    // You can return a loading spinner or null while checking the authentication status
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/react/sign-in" />;
};

export default PrivateRoutes;
