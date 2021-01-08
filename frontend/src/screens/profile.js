import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../actions/userActions';
import LoadingBox from '../components/loadingbox';
import MessageBox from '../components/messagebox';

export default function Profile() {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const userData = useSelector((state) => state.userLogin);
    const { userInfo } = userData;
    const userId = userInfo._id;

    const userProfile = useSelector((state) => state.userProfile);
    console.log("userProfile", userProfile);
    const { loading, error, user } = userProfile;

    function submitHandler (event) {
        event.preventDefault();
        /* dispatch new user data */
    }

    useEffect(() => {
        dispatch(getUserProfile(userId));
    }, [dispatch, userId]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    {userProfile && user && <h1>Ciao {user.firstName}, ecco il tuo profilo</h1>}
                </div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (userProfile && user &&
                    <>
                        <div>
                            <input
                                type="text"
                                id="first-name"
                                defaultValue={user.firstName}
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <input
                                type="text"
                                id="last-name"
                                defaultValue={user.lastName}
                                required
                                onChange={(e) => setLastName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <input
                                type="email"
                                id="email"
                                defaultValue={user.email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                defaultValue={user.password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Conferma password"
                                required
                                onChange={(e) =>
                                    setConfirmedPassword(e.target.value)
                                }
                            ></input>
                        </div>
                        <div>
                            <button className="button" type="submit">Aggiorna i tuoi dati</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
