import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    
    if (!allowedRoles.includes(decodedToken.role)) {
      return <Navigate to="/no-access" replace />;  // ✅ Redirect to "No Access" page
    }

    return <Outlet />;
  } catch (error) {
    console.error("Invalid or expired token:", error);
    localStorage.removeItem("authToken"); // ✅ Remove invalid token
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
