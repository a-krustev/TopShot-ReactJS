import * as contestService from "../../../../services/contestService";
import { useParams } from "react-router-dom";
import Popup from 'react-popup'

export const Photo = ({ _id, photoUrl }) => {
    const { contestId } = useParams();
    const onPhotoLike = async (e) => {
        e.preventDefault();
        const result = await contestService.like(contestId, _id);
        Popup.alert(result.message);
    };

    return (
        <span className="photo-box">
            <img src={photoUrl} alt="Contest" />
            <div className="like-box">
                <button onClick={onPhotoLike}>Like</button>
            </div>
        </span>
    );
};
