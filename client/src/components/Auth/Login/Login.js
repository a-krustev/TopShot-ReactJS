// import { useForm } from "react-hook-form";

//     const { onLoginSubmit } = useAuthContext();

import * as React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import "./login.css";

export const Login = () => {
    const { onLoginSubmit } = useAuthContext();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: "",
            password: "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onLoginSubmit)} className="user_login">
            <p className="field field-icon">
                <label htmlFor="email">
                    <span>
                        <i className="fas fa-envelope"></i>
                    </span>
                </label>
                <input
                    {...register("email", { required: true })}
                    placeholder="Email"
                    type="email"
                    name="email"
                    id="email"
                />
            </p>

            <p className="field field-icon">
                <label htmlFor="password">
                    <span>
                        <i className="fas fa-lock"></i>
                    </span>
                </label>
                <input
                    {...register("password", { required: true })}
                    placeholder="******"
                    type="password"
                    name="password"
                    id="password"
                />
            </p>

            <input type="submit" value="Log in" />
            <p className="text-center">
                Have no account?
                <Link to="/register"> Register</Link>
            </p>
        </form>
    );
};
