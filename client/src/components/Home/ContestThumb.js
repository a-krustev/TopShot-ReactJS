import { Link } from "react-router-dom";

export const ContestThumb = ({ _id, titleImg, title, category }) => {
    return (
        <div className="owl-item">
            <div className="item">
                <Link to={`/contests/${_id}`} onClick={() => {window.scroll(0, 0)}}>
                    <div className="thumb">
                        <img src={titleImg} alt="" />
                        <div className="hover-effect">
                            <div className="content">
                                <h4>{title}</h4>
                                <span>
                                    <b>Category:</b> {category}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};
