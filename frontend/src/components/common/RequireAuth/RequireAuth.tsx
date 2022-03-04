import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface IProps {
  children: ReactNode;
  redirectTo: string;
}

const RequireAuth: React.FC<IProps> = ({ children, redirectTo }) => {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to={redirectTo} />;
};

export default RequireAuth;
