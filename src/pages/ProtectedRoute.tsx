import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute() {
    const isAuthenticated = localStorage.getItem("userdata"); // Check if user data exists
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
  }
