import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [cookies, setCookies, removeCookies] = useCookies();
    
    const onLoginSubmit = async ({ email, password }) => {
        try {
            const token = await authService.login({ email, password });
            setCookies("auth-cookie", token);
            navigate("/contests");
        } catch (error) {
            console.log(error.message);
        }
    };

    const onRegisterSubmit = async (values) => {
        const { rePassword, ...registerData } = values;
        if (rePassword !== registerData.password) {
            console.log("Passwords not equal!");
            return;
        }
        
        try {
            await authService.register(registerData);
            navigate("/contests");
        } catch (error) {
            console.log(error.message);
        }
    };
    
    const onLogout = async () => {
        await authService.logout();
        removeCookies("auth-cookie");
    };
    
    const onGetProfile = async () => {
        const result = await authService.getProfile();
        setUser(result);
        return;
    };
    

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        onGetProfile,
        user,
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
