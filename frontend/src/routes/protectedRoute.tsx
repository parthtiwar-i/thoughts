import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";

export const ProtectedRoute = () => {
  const { jwt } = useAuth();

  return jwt ? <Outlet /> : <Navigate to={"/login"} />;
};
