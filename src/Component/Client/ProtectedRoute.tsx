import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../core/store/authStore";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}


const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = useAuthStore(state => state.token);
  const roles = useAuthStore(state => state.roles)

  if (!token) {
    return <Navigate to="auth/login" replace />;
  }
  
  if (allowedRoles && roles) {
    const hasRole = roles.some(r => allowedRoles.includes(r));
    if (!hasRole) {
      return <Navigate to="/account" replace />; // trang 403
    }
    
  }

  return <Outlet />; // cho phép render các child routes
};

export default ProtectedRoute;
