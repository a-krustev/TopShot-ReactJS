import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export const Register = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        rePassword: "",
    });

    const { onRegisterSubmit } = useAuthContext();

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setState({ ...state, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        onRegisterSubmit(state);
    };

    return (
        <form className="user_register" method="POST" onSubmit={submitHandler}>
            <h2>Register Form</h2>

            <p className="field field-icon">
                <label htmlFor="username">
                    <span>
                        <i className="fas fa-envelope"></i>
                    </span>
                </label>
                <input
                    className="input-error"
                    required
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    value={state.username}
                    onChange={onChangeHandler}
                />
            </p>

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
                />
            </p>

            <p className="field field-icon">
                <label htmlFor="rePassword">
                    <span>
                        <i className="fas fa-lock"></i>
                    </span>
                </label>
                <input
                    type="password"
                    name="rePassword"
                    id="re-password"
                    placeholder="******"
                    value={state.rePassword}
                    onChange={onChangeHandler}
                />
            </p>

            <button className="main-button">Register</button>

            <p className="text-center">
                Have no account?
                <Link to="/login"> Login</Link>
            </p>
        </form>
    );
};
