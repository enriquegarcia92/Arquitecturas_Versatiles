import {Navigate, Outlet } from "react-router-dom";

  
  const PrivateRoutes: React.FC = () => {
    console.log("private route works");

    const token = localStorage.getItem('token')
    return token ? <Outlet /> : <Navigate to="/sign-in" />;
  };
  
  export default PrivateRoutes;