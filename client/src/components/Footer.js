import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <p>
                            Copyright © 2023 <Link to="/" onClick={() => {window.scroll(0, 0)}}>TopShot</Link> Photo
                            Contest Co., Ltd. All rights reserved. Author:
                            Alexander Krustev
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
