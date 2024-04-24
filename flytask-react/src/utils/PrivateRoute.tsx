import { Route, Navigate, Outlet, Routes } from "react-router-dom";

  
  const PrivateRoutes: React.FC = () => {
    console.log("private route works");

    const token = ""
    return token ? <Outlet /> : <Navigate to="/sign-in" />;
  };
  
  export default PrivateRoutes;