import { useEffect } from "react";
import { useAuthContext } from '../../contexts/AuthContext';

export const Profile = () => {
    const { user, onGetProfile } = useAuthContext();
    useEffect(() => {
        onGetProfile();
    }, []);
    
    return (
        <form className="profile">
            <img src={require('../../assets/images/profile.png')} alt="default user" />

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
                <p>You participate in </p>
                <p>{user.contestParticipates}</p>
                <p> contests</p>
            </div>
        </form>
    );
};
