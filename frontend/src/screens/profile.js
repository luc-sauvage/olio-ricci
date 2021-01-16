import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/loadingbox';
import MessageBox from '../components/messagebox';
import { USER_PROFILE_UPDATE_RESET } from '../constants/userConstants';


export default function Profile(props) {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [formError, setFormError] = useState(false);

    const userData = useSelector((state) => state.userLogin);
    const { userInfo } = userData;
    const userId = userInfo._id;

    const userProfile = useSelector((state) => state.userProfile);
    const { loading, error, user } = userProfile;

    const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userProfileUpdate;

    function submitHandler(event) {
        event.preventDefault();
        if (password !== confirmedPassword) {
            setFormError(true);
        } else {
            dispatch(
                updateUserProfile({
                    userId: user._id,
                    firstName,
                    lastName,
                    email,
                    password,
                })
            );
        }
    }

    useEffect(() => {
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
        if (userId) {
            if (!user) {
                setFirstName(userInfo.firstName);
                setLastName(userInfo.lastName);
                setEmail(userInfo.email);
                dispatch(getUserProfile(userId));
            } else {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
            }
        } else {
            props.history.push("/login");
        }
    }, [user]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    {userProfile && user && (
                        <h1>Il tuo profilo</h1>
                    )}
                </div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    userProfile &&
                    user && (
                        <>
                            <div>
                                <input
                                    type="text"
                                    id="first-name"
                                    defaultValue={firstName ? firstName : userInfo.firstName}
                                    required
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="last-name"
                                    defaultValue={lastName ? lastName : userInfo.lastName}
                                    required
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <input
                                    type="email"
                                    id="email"
                                    defaultValue={email ? email : userInfo.email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Inserisci password per modificarla"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="Conferma password per completare modifica"
                                    onChange={(e) =>
                                        setConfirmedPassword(e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <button className="button" type="submit">
                                    Aggiorna i tuoi dati
                                </button>
                            </div>
                            {formError && (
                                <MessageBox variant="danger">
                                    ATTENZIONE! Le password non coincidono!
                                </MessageBox>
                            )}
                            {loadingUpdate && <LoadingBox></LoadingBox>}
                            {successUpdate && (
                                <MessageBox className=".alert-info">
                                    Il tuo profilo è stato aggiornato con
                                    successo!
                                </MessageBox>
                            )}
                            {errorUpdate && (
                                <MessageBox variant="danger">
                                    {errorUpdate}
                                </MessageBox>
                            )}
                        </>
                    )
                )}
            </form>
        </div>
    );
}
