import { useAuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import './header.css'

export const Header = () => {
    const { isAuthenticated } = useAuthContext();
    return (
        <header className="header-area header-sticky">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="main-nav">
                            <Link to="/" className="logo">
                                <img
                                    src={logo}
                                    alt="SnapX Photography Template"
                                />
                            </Link>
                            <nav className="nav">
                                <Link to="/">Home</Link>
                                <Link to="/contests">Contests</Link>
                                <Link to="/categories">Categories</Link>
                                {isAuthenticated && (
                                    <Link to="/new-contest">New Contest</Link>
                                )}
                            </nav>
                            {!isAuthenticated && (
                                <div className="border-button">
                                    <Link
                                        to="/login"
                                        id="modal_trigger"
                                        className="sign-in-up"
                                    >
                                        <i className="fa fa-user"></i> Login
                                    </Link>
                                </div>
                            )}
                            {isAuthenticated && (
                                <div className="border-button">
                                    <Link to="/profile">My Profile</Link>
                                    <Link
                                        to="/logout"
                                        id="modal_trigger"
                                        className="sign-in-up"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}

                            {/* <a href="/" className="menu-trigger">
                      <span>Menu</span>
                  </a> */}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};
