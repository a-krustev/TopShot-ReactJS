import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Photo } from "./Photo";
import styles from "./ContestDetails.module.css";
import { useContestContext } from "../../../../contexts/ContestContext";

export const ContestDetails = () => {
    const { contestId } = useParams();
    const { contest, onGetContest } = useContestContext();
    useEffect(() => {
        onGetContest(contestId);
    }, [contestId]);

    return (
        <>
            {!contest ? (
                <h3>Contest loading...</h3>
            ) : (
                <>
                    <div
                        className="page-heading"
                        style={{ backgroundImage: `url(${contest.titleImg})` }}
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2 header-text">
                                    <h2 className="space-need">
                                        {contest.title}
                                    </h2>
                                    <h6>Contest Deadline</h6>
                                    <div className="main-content">
                                        <div className="counter">
                                            <div>
                                                <div className="value">
                                                    {contest.endDate}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contest-details">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="top-content">
                                        <div className="row">
                                            <ul>
                                                <li>
                                                    <i className="fa fa-medal"></i>{" "}
                                                    <span>Award:</span>{" "}
                                                    {contest.prize}
                                                </li>
                                                <li>
                                                    <span>Participants:</span>{" "}
                                                    {contest.participants}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.gallery}>
                                    {contest.photos &&
                                        contest.photos.map((photo) => (
                                            <Photo key={photo._id} {...photo} />
                                        ))}
                                </div>
                                <div className="col-lg-12">
                                    <div className="main-content">
                                        <div className="main-button">
                                            <Link
                                                to={`/contests/${contest._id}/add-photo`}
                                            >
                                                Submit Your Photo
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
