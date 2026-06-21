import { Navigate } from "react-router-dom";

export const AuthGuardProtected = ({ children }: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};


export const AuthGuardPublic = ({ children }: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};


