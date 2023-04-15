import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as contestService from "../../../../services/contestService";

export const AddPhoto = () => {
    const navigate = useNavigate();

    const { contestId } = useParams();
    const [photoUrl, setPhoto] = useState("");

    const onChangeHandler = (e) => {   
        const value = e.target.value;

        setPhoto(value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await contestService.addPhoto(contestId, photoUrl);
        navigate(-1);
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
                    required
                />
                <p className="error">Image url is required.</p>
                <p className="error">
                    Image url must start with http:// or https://
                </p>
                <br />

                <div className="new-contest-buttons">
                    <input type="submit" className="btn submit" value="AddPhoto" />
                </div>
            </fieldset>
        </form>
    );
};
