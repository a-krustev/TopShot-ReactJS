import { Link } from 'react-router-dom';

export const CategoryContestThumb = ({
    _id,
    titleImg,
    prize,
    title,
    photos
}) => {
    return (
        <div className="item col-lg-4">
            <div className="thumb">
                <img
                    src={titleImg}
                    alt=""
                    className="contest-img-title"
                />
                <div className="hover-effect">
                    <div className="content">
                        <div className="top-content">
                            <span className="award">Award</span>
                            <span className="price">{prize}</span>
                        </div>
                        <h4>{title}</h4>
                        <div className="info">
                            <span className="submittions">
                                <img src={require('../../../assets/images/icon-01.png')} alt="" />
                                <br />
                                {photos.length}
                            </span>
                        </div>
                        <div className="border-button">
                            <Link to={`/contests/${_id}`} onClick={() => {window.scroll(0, 0)}}>
                                Join contest
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
