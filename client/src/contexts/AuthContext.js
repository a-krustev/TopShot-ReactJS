import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies();

    const onLoginSubmit = async ({ email, password }) => {
        try {
            const token = await authService.login({ email, password });
            setCookies("auth-cookie", token, { path: "/" });
            navigate("/contests");
        } catch (error) {
            alert(error.message);
        }
    };

    const onRegisterSubmit = async (values) => {
        const { errors, rePassword, ...registerData } = values;
        if (rePassword !== registerData.password) {
            console.log("Passwords not equal!");
            return;
        }
        try {
            const token = await authService.register(registerData);
            setCookies("auth-cookie", token, { path: "/" });
            navigate("/contests");
        } catch (error) {
            alert(error)
        }
    };

    const onLogout = async () => {
        await authService.logout();
        removeCookies("auth-cookie");
    };

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        isAuthenticated: !!cookies["auth-cookie"],
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
