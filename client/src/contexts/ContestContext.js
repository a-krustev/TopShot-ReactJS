import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as contestService from "../services/contestService";

export const ContestContext = createContext();

export const ContestProvider = ({ children }) => {
    const navigate = useNavigate();
    const [contests, setContests] = useState([]);
    const [latestContests, setLastestContests] = useState();
    const [categories, setCategories] = useState({});
    const [popularContests, setPopularContests] = useState([]);

    useEffect(() => {
        contestService.getAll().then((result) => {
            setContests(result);
        });
    }, []);

    const onGetLatestContests = async () => {
        const result = await contestService.getLatests();
        setLastestContests(result);
        return;
    };

    const getContest = (contestId) => {
        return contests.find((contest) => contest._id === contestId);
    };

    const onCreateContest = async (data) => {
        try {
            const result = await contestService.addContest(data);
            setContests((state) => [...state, result]);
            navigate(`/contests/${result._id}`);
        } catch (error) {
            console.log(error.message);
        }
    };

    const onEditContest = async (contestId, data) => {
        const result = await contestService.editContest(contestId, data);

        setContests(state => state.map(x => x._id === result._id ? result : x))

        navigate(`/contests/${contestId}`);
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

    const onDeleteContest = async (id) => {
        setContests((state) => state.filter((result) => result._id !== id));
    };

    const contextValues = {
        contests,
        latestContests,
        categories,
        popularContests,
        onGetLatestContests,
        getContest,
        onCreateContest,
        onGetCategories,
        onEditContest,
        onDeleteContest,
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
