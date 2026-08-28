import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./PrivateRouteWrapper.css";

function PrivateRouteWrapper() {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="private-route-loader" role="status" aria-label="Loading authentication">
                <div className="loading-spinner" />
                <span className="loading-text">Authenticating...</span>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/auth/login" state={{ from: location }} replace />;
}

export default PrivateRouteWrapper;