import { Link } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContestContext } from "../../../../contexts/ContestContext";
import './new-contest.css'

export const NewContest = () => {
    const [state, setState] = useState({
        title: "",
        titleImg: "",
        category: "nature",
        prize: 50,
        errors: {
            titleOk: true,
            titleImgOk: true,
            endDateOk: true,
        },
    });
    const [isNotError, setNotError] = useState(false);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [startDate, setStartDate] = useState(
        new Date(tomorrow.setUTCHours(0, 0, 0, 0))
    );

    const [endDate, setEndDate] = useState(
        new Date(tomorrow.setUTCHours(0, 0, 0, 0))
    );

    const { onCreateContest } = useContestContext();

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "title") {
            if (value.length === 0) {
                state.errors.titleOk = false;
            } else {
                state.errors.titleOk = true;
            }
        }
        if (name === "titleImg") {
            if (value.length === 0 || !/^https?:\/\/.*/.test(value)) {
                state.errors.titleImgOk = false;
            } else {
                state.errors.titleImgOk = true;
            }
        }

        setNotError(state.errors.titleOk && state.errors.titleImgOk);

        setState({ ...state, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setStartDate(new Date(startDate));
        setEndDate(new Date(endDate.setUTCHours(23, 59, 59, 999)));
        await onCreateContest({ ...state, startDate, endDate });
    };

    return (
        <form className="new_contest" method="POST" onSubmit={submitHandler}>
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
                    value={state.title}
                    onChange={onChangeHandler}
                />
            </div>
            {!state.errors.titleOk && (
                <p className="form_error">Title is required</p>
            )}

            <label htmlFor="titleImg">
                Contest image<span className="red">*</span>
            </label>
            <input
                type="text"
                name="titleImg"
                required
                pattern="^https?:\/\/.*"
                id="titleImg"
                value={state.titleImg}
                onChange={onChangeHandler}
            />
            {!state.errors.titleImgOk && (
                <p className="form_error">
                    Title image url must start with http:// or https://
                </p>
            )}

            <label htmlFor="category">
                Category<span className="red">*</span>
            </label>
            <select
                id="category"
                required
                name="category"
                value={state.category}
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
                value={state.prize}
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
                        setEndDate(new Date(date.setUTCHours(0, 0, 0, 0)));
                    }
                    setStartDate(new Date(date.setUTCHours(0, 0, 0, 0)));
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
            {/* {!state.errors.endDateOk && (
                <p className="form_error">
                    End date must be after or equal to start date
                </p>
            )} */}

            <div className="new-contest-buttons">
                <button className="cancel" type="button">
                    <Link to="/contests">Cancel</Link>
                </button>
                <button
                    className="main-button"
                    disabled={isNotError ? false : true}
                >
                    New Contest
                </button>
            </div>
        </form>
    );
};
