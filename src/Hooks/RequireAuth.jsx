import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./UseAuth";

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
};

export { RequireAuth };
