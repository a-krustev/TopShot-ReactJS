import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContestContext } from "../../../contexts/ContestContext";

export const NewContest = () => {
    const [state, setState] = useState({
        contestTitle: "",
        titleImg: "",
        category: "",
        prize: 50,
    });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const { onCreateContest } = useContestContext();

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setState({ ...state, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        await onCreateContest({...state, startDate, endDate});
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
                    name="contestTitle"
                    required
                    id="contestTitle"
                    value={state.contestTitle}
                    onChange={onChangeHandler}
                />
            </div>

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
                onChange={(date) => setStartDate(date)}
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
                onChange={(date) => setEndDate(date)}
            />

            <div className="new-contest-buttons">
                <button className="cancel" type="button">
                    Cancel
                </button>
                <input
                    type="submit"
                    className="btn submit"
                    value="NewContest"
                />
            </div>
        </form>
    );
};
