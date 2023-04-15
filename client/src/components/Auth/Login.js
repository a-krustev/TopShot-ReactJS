import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

export const Login = () => {

    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const { onLoginSubmit } = useAuthContext();

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setState({ ...state, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        await onLoginSubmit(state);
    };

    return (
        <form className="user_login" method="POST" onSubmit={submitHandler}>
            <h2>Login Form</h2>

            <p className="field field-icon">
                <label htmlFor="email">
                    <span>
                        <i className="fas fa-envelope"></i>
                    </span>
                </label>
                <input
                    className="input-error"
                    required
                    type="text"
                    name="email"
                    id="email"
                    placeholder="email"
                    value={state.email}
                    onChange={onChangeHandler}
                />
            </p>

            <p className="field field-icon">
                <label htmlFor="password">
                    <span>
                        <i className="fas fa-lock"></i>
                    </span>
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="******"
                    value={state.password}
                    onChange={onChangeHandler}
                    required
                />
            </p>

            <input type="submit" className="btn submit" value="Login" />

            <p className="text-center">
                Have no account?
                <Link to="/register"> Register</Link>
            </p>
        </form>
    );
};
