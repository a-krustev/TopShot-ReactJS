// import { useForm } from "react-hook-form";

//     const { onRegisterSubmit } = useAuthContext();

import * as React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import "./register.css";

export const Register = () => {
    const emailReg =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const { onRegisterSubmit } = useAuthContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            rePassword: "",
        },
    });
    console.log("errors:", errors);
    return (
        <form onSubmit={handleSubmit(onRegisterSubmit)} className="user_login">
            <p className="field field-icon">
                <label htmlFor="username">
                    <span>
                        <i className="fas fa-user"></i>
                    </span>
                </label>
                <input
                    {...register("username", {
                        required: true,
                        minLength: {
                            value: 3,
                            message:
                                "Username should be between 3 and 15 characters and must contains only lowercase letters, numbers and _",
                        },
                        maxLength: {
                            value: 15,
                            message:
                                "Username should be between 3 and 15 characters and must contains only lowercase letters, numbers and _",
                        },
                    })}
                    placeholder="Username"
                    type="text"
                    name="username"
                    id="username"
                />
            </p>
            {errors.username && (
                <p className="form_error">{errors.username.message}</p>
            )}

            <p className="field field-icon">
                <label htmlFor="email">
                    <span>
                        <i className="fas fa-envelope"></i>
                    </span>
                </label>
                <input
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: emailReg,
                            message: "Enter valid email address", // JS only: <p>error message</p> TS only support string
                        },
                    })}
                    placeholder="Email"
                    type="email"
                    name="email"
                    id="email"
                />
            </p>
            {errors.email && (
                <p className="form_error">{errors.email.message}</p>
            )}

            <p className="field field-icon">
                <label htmlFor="password">
                    <span>
                        <i className="fas fa-lock"></i>
                    </span>
                </label>
                <input
                    {...register("password", {
                        required: true,
                        minLength: {
                            value: 4,
                            message:
                                "Password must containt at least 4 characters",
                        },
                    })}
                    placeholder="Password"
                    type="password"
                    name="password"
                    id="password"
                />
            </p>            
            {errors.password && (
                <p className="form_error">{errors.password.message}</p>
            )}

            <p className="field field-icon">
                <label htmlFor="rePassword">
                    <span>
                        <i className="fas fa-lock"></i>
                    </span>
                </label>
                <input
                    {...register("rePassword", {
                        required: true,
                        validate: (value, formValues) =>
                            value === formValues.password ||
                            "Passwords doesn't match",
                    })}
                    placeholder="Repeat password"
                    type="password"
                    name="rePassword"
                    id="re-password"
                />
            </p>          
            {errors.rePassword && (
                <p className="form_error">{errors.rePassword.message}</p>
            )}

            <input type="submit" value="Register" />
            <p className="text-center">
                Already registered?
                <Link to="/login"> Log in</Link>
            </p>
        </form>
    );
};
