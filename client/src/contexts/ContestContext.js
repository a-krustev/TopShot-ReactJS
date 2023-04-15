import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as contestService from "../services/contestService";

export const ContestContext = createContext();

export const ContestProvider = ({ children }) => {
    const navigate = useNavigate();
    const [latestContests, setLastestContests] = useState();
    const [contests, setContests] = useState();
    const [categories, setCategories] = useState({});
    const [popularContests, setPopularContests] = useState([]);
    const [contest, setContest] = useState();

    const onGetAllContests = async () => {
        const result = await contestService.getAll();
        setContests(result);
        return;
    };

    const onGetLatestContests = async () => {
        const result = await contestService.getLatests();
        setLastestContests(result);
        return;
    };

    const onGetContest = async (contestId) => {
        const result = await contestService.getOne(contestId);
        result.endDate = new Date(result.endDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        setContest(result);
    };

    const onCreateContest = async (data) => {
        try {
            const result = await contestService.addContest(data);
            setContest(result);
            navigate(`/contests/${result._id}`)
        } catch (error) {
            console.log(error.message);
        }
    };

    const onGetCategories = async () => {
        const result = await contestService.getAll();
        const natureContests = result.filter(
            (el) => el.category === "nature"
        ).length;
        const architectureContests = result.filter(
            (el) => el.category === "architecture"
        ).length;
        const portraitContests = result.filter(
            (el) => el.category === "portrait"
        ).length;
        const sportContests = result.filter(
            (el) => el.category === "sport"
        ).length;
        const macroContests = result.filter(
            (el) => el.category === "macro"
        ).length;
        setCategories({
            natureContests,
            architectureContests,
            portraitContests,
            sportContests,
            macroContests,
        });
        setPopularContests(
            [...result]
                .sort((a, b) => b.photos.length - a.photos.length)
                .slice(0, 6)
        );
        return;
    };

    const contextValues = {
        onGetAllContests,
        onGetLatestContests,
        onGetContest,
        onCreateContest,
        onGetCategories,
        contests,
        latestContests,
        contest,
        categories,
        popularContests,
    };

    return (
        <ContestContext.Provider value={contextValues}>
            {children}
        </ContestContext.Provider>
    );
};

export const useContestContext = () => {
    return useContext(ContestContext);
};
