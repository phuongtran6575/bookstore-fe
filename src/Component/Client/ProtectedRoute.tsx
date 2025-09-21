import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../core/store/authStore";

const ProtectedRoute = () => {
  const token = useAuthStore(state => state.token);

  if (!token) {
    return <Navigate to="auth/login" replace />;
  }

  return <Outlet />; // cho phép render các child routes
};

export default ProtectedRoute;
