import { useEffect, useState } from "react";
import { useContestContext } from "../../../contexts/ContestContext";
import { getProfile } from "../../../services/authService";
import { Contest } from "../../Contests/Contest/Contest";
import './profile.css'

export const Profile = () => {
    const { contests } = useContestContext();
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            const result = await getProfile();
            setUser(result);
        })();
    }, []);

    const contestsParticipates =
        contests && user
            ? contests.filter((contest) =>
                  user.contestsParticipates.includes(contest._id)
              )
            : [];

    return (
        <>
            {!user ? (
                <h3>Contest loading...</h3>
            ) : (
                <div id="profile-id">
                    <form className="profile">
                        <img
                            src={require("../../../assets/images/profile.png")}
                            alt="default user"
                        />

                        <h3 className="label">User Info:</h3>
                        <div className="flex">
                            <p>Username: </p>
                            <p>{user.username}</p>
                        </div>
                        <div className="flex">
                            <p>Email: </p>
                            <p>{user.email}</p>
                        </div>
                        <div className="flex">
                            {user.contestsParticipates.length > 0 ? (
                                <p>
                                    You participate in{" "}
                                    {`${user.contestsParticipates.length}`}{" "}
                                    {user.contestsParticipates.length === 1
                                        ? "contest"
                                        : "contests"}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                    </form>
                    <div className="container">
                        <div className="row">
                            {!contestsParticipates ? (
                                <h3>Contests loading...</h3>
                            ) : contestsParticipates.length === 0 ? (
                                <h3>You don't participate in any contest.</h3>
                            ) : (
                                contestsParticipates &&
                                contestsParticipates.map((contest) => (
                                    <Contest key={contest._id} {...contest} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
