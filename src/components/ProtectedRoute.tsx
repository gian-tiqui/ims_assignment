import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/AuthService";
import React, { ReactNode } from "react";

interface ProtectedRouteInterface {
  element: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteInterface> = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
