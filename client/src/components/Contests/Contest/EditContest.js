import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { useContestContext } from "../../../contexts/ContestContext";
import { getOne } from "../../../services/contestService";
import DatePicker from "react-datepicker";

export const EditContest = () => {
    const { contestId } = useParams();
    const { onEditContest } = useContestContext();

    const [contest, setContest] = useState({});

    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const [isNotError, setNotError] = useState(true);

    useEffect(() => {
        Promise.resolve(getOne(contestId)).then((result) => {
            result = (({
                title,
                titleImg,
                category,
                prize,
                startDate,
                endDate,
            }) => ({
                title,
                titleImg,
                category,
                prize,
                startDate,
                endDate,
                errors: {
                    titleOk: true,
                    titleImgOk: true,
                    endDateOk: true,
                },
            }))(result);
            setStartDate(new Date(new Date(result.startDate).setUTCHours(0, 0, 0, 0)));
            setEndDate(new Date(new Date(result.endDate).setUTCHours(0, 0, 0, 0)));
            setContest(result);
        });
    }, [contestId]);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "title") {
            if (value.length === 0) {
                contest.errors.titleOk = false;
            } else {
                contest.errors.titleOk = true;
            }
        }
        if (name === "titleImg") {
            if (value.length === 0 || !/^https?:\/\/.*/.test(value)) {
                contest.errors.titleImgOk = false;
            } else {
                contest.errors.titleImgOk = true;
            }
        }

        setNotError(contest.errors.titleOk && contest.errors.titleImgOk);
        setContest({ ...contest, [name]: value });
        console.log(contest);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setStartDate(new Date(startDate.setUTCHours(0, 0, 0, 0)));
        setEndDate(new Date(endDate.setUTCHours(23, 59, 59, 999)));
        console.log(startDate);
        contest.startDate = startDate;
        contest.endDate = endDate;
        await onEditContest(contestId, contest);
    };

    return (
        <>
            {!contest ? (
                <h3>Contest loading...</h3>
            ) : (
                <form
                    className="new_contest"
                    method="POST"
                    onSubmit={submitHandler}
                >
                    <h2>New Contest</h2>
                    <div className="new-contest-title">
                        <label htmlFor="contestTitle">
                            Title <span className="red">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            id="contestTitle"
                            defaultValue={contest.title}
                            onChange={onChangeHandler}
                        />
                    </div>
                    {/* {!contest.errors.titleOk && (
                        <p className="form_error">Title is required</p>
                    )} */}

                    <label htmlFor="titleImg">
                        Contest image<span className="red">*</span>
                    </label>
                    <input
                        type="text"
                        name="titleImg"
                        required
                        pattern="^https?:\/\/.*"
                        id="titleImg"
                        defaultValue={contest.titleImg}
                        onChange={onChangeHandler}
                    />
                    {/* {!contest.errors.titleImgOk && (
                        <p className="form_error">
                            Title image url must start with http:// or https://
                        </p>
                    )} */}

                    <label htmlFor="category">
                        Category<span className="red">*</span>
                    </label>
                    <select
                        id="category"
                        required
                        name="category"
                        value={contest.category}
                        onChange={onChangeHandler}
                    >
                        <option value="nature">Nature</option>
                        <option value="architecture">Architecture</option>
                        <option value="portrait">Portrait</option>
                        <option value="sport">Sport</option>
                        <option value="macro">Macro</option>
                    </select>

                    <label htmlFor="prize">
                        Prize<span className="red">*</span>
                    </label>
                    <input
                        type="number"
                        id="prize"
                        required
                        name="prize"
                        min="50"
                        step="10"
                        defaultValue={contest.prize}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="start">
                        Start date<span className="red">*</span>
                    </label>
                    <DatePicker
                        isClearable
                        filterDate={(d) => {
                            return d >= new Date();
                        }}
                        placeholderText="Select Start Date"
                        dateFormat="MMMM d, yyyy"
                        selected={startDate}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(date) => {
                            if (endDate < date) {
                                setEndDate(
                                    new Date(date.setUTCHours(0, 0, 0, 0))
                                );
                            }
                            setStartDate(
                                new Date(date.setUTCHours(0, 0, 0, 0))
                            );
                        }}
                    />

                    <label htmlFor="end">
                        End date<span className="red">*</span>
                    </label>
                    <DatePicker
                        isClearable
                        filterDate={(d) => {
                            return d >= startDate;
                        }}
                        placeholderText="Select End Date"
                        dateFormat="MMMM d, yyyy"
                        selected={endDate}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        onChange={(date) => {
                            setEndDate(new Date(date.setUTCHours(0, 0, 0, 0)));
                        }}
                    />

                    <div className="new-contest-buttons">
                        <button
                            className="cancel"
                            type="button"
                        >
                            <Link to={`/contests/${contestId}`}>Cancel</Link>
                        </button>
                        <input
                            type="submit"
                            className="btn submit"
                            value="EditContest"
                            disabled={isNotError ? false : true}
                        />
                    </div>
                </form>
            )}
        </>
    );
};
