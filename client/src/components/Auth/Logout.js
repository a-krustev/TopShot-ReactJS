import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const Logout = () => {
    const { token, onLogout } = useAuthContext();

    useEffect(() => {
        onLogout(token);
    }, [token, onLogout]);

    return <Navigate to="/" />;
};
