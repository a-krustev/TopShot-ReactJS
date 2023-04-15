import { Link } from "react-router-dom";

export const Contest = ({ _id, title, titleImg, category }) => {
    return (
        <div className="col-lg-4">
            <div className="item">
                <div className="thumb">
                    <img src={titleImg} alt={title} />
                    <div className="top-content">
                        <h4>{title}</h4>
                    </div>
                </div>
                <div className="down-content">
                    <div className="row">
                        <div className="col-5">
                            <h6>Category: {category}</h6>
                        </div>
                        <div className="col-6">
                            <Link
                                to={`/contests/${_id}`}
                                className="details-button" onClick={() => {window.scroll(0, 0)}}
                            >
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
