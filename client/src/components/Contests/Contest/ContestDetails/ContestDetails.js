import { useParams, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Photo } from "./Photo";
import styles from "./ContestDetails.module.css";
import { useContestContext } from "../../../../contexts/ContestContext";
import { deleteContest } from "../../../../services/contestService";
import { useState } from "react";
import { getProfile } from "../../../../services/authService";
import { getOne } from "../../../../services/contestService";

export const ContestDetails = () => {
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const navigate = useNavigate();
    const { contestId } = useParams();
    const [contest, setContest] = useState({});
    const { onDeleteContest } = useContestContext();
    const [user, setUser] = useState();

    useEffect(() => {
        Promise.all([getOne(contestId), getProfile()]).then(
            ([contest, user]) => {
                contest.endDate = new Date(contest.endDate).setUTCHours(
                    20,
                    59,
                    59,
                    999
                );
                setContest(contest);
                setUser(user);
            }
        );
    }, [contestId]);

    const isOwner = contest && user ? contest.authorId === user._id : false;

    const deleteHandler = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(
            `Are you sure you want to delete ${contest.title}`
        );

        if (result) {
            await deleteContest(contestId);

            onDeleteContest(contestId);
            navigate(`/contests`);
        }
    };

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
                                                    {`${new Date(
                                                        contest.endDate
                                                    ).getDate()}-${
                                                        months[
                                                            new Date(
                                                                contest.endDate
                                                            ).getMonth()
                                                        ]
                                                    }-${new Date(
                                                        contest.endDate
                                                    ).getFullYear()}`}
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
                                {!isOwner && (
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
                                )}
                                {isOwner && (
                                    <div>
                                        <div className={styles.collg4}>
                                            <div className="main-content">
                                                <div className="main-button">
                                                    <button
                                                        onClick={deleteHandler}
                                                    >
                                                        Delete Contest
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="main-content">
                                                <div className="main-button">
                                                    <Link
                                                        to={`/contests/${contest._id}/edit`}
                                                        className="details-button"
                                                        onClick={() => {
                                                            window.scroll(0, 0);
                                                        }}
                                                    >
                                                        Edit Contest
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
