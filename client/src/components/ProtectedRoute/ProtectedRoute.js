import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../components/context";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;