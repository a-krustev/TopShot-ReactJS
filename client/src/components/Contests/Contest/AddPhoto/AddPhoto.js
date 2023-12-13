import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as contestService from "../../../../services/contestService";

export const AddPhoto = () => {
    const navigate = useNavigate();

    const { contestId } = useParams();
    const [photoUrl, setPhoto] = useState("");
    const [photoUrlError, setphotoUrlError] = useState(true);

    const submitHandler = async (e) => {
        e.preventDefault();
        await contestService.addPhoto(contestId, photoUrl);
        navigate(-1);
    };

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setPhoto(value);

        if (name === "photoUrl") {
            if (!/^https?:\/\/.*/.test(value)) {
                setphotoUrlError(true);
            } else {
                setphotoUrlError(false);
            }
        }
    };

    return (
        <form className="new_photo" method="POST" onSubmit={submitHandler}>
            <fieldset>
                {/* <h2>Submit Photo to {{contest.title}} contest</h2>   */}

                <label htmlFor="contestImg">
                    Contest image<span className="red">*</span>
                </label>
                <input
                    type="text"
                    name="photoUrl"
                    id="contestImg"
                    placeholder="Add photo..."
                    value={photoUrl}
                    onChange={onChangeHandler}
                    // required
                />
                {photoUrl.length !== 0 && photoUrlError && (
                    <p className="form_error">
                        Image url it is not in correct format.
                    </p>
                )}
                <p className="error">
                    Image url must start with http:// or https://
                </p>
                <br />

                <button className="cancel" type="button">
                    <Link to={`/contests/${contestId}`}>Cancel</Link>
                </button>
                <button
                    className="main-button"
                    disabled={photoUrlError ? true : false}
                >
                    New Contest
                </button>
            </fieldset>
        </form>
    );
};
