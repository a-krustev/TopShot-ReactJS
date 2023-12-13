import { useEffect, useState } from "react";
import { useParams, Outlet, Navigate, useLocation } from "react-router-dom";
import { useContestContext } from "../../contexts/ContestContext";
import { getProfile } from "../../services/authService";

export const ContestCreator = ({ children }) => {
    const { contestId } = useParams();
    const location = useLocation();
    const { getContest } = useContestContext();
    const [user, setUser] = useState();
    const contest = getContest(contestId);

    useEffect(() => {
        Promise.resolve(getProfile()).then((result) => {
            setUser(result);
        });
    }, []);

    const lastPartUtl = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
    );

    if (contest && user) {
        if (
            (lastPartUtl === "edit" && contest.authorId !== user._id) ||
            (lastPartUtl === "add-photo" && contest.authorId === user._id)
        ) {
            return <Navigate to={`/contests/${contestId}`} replace />;
        }
    }

    return children ? children : <Outlet />;
};
