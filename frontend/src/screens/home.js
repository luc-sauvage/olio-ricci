import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLastPageAction } from "../actions/navActions.js";
/* import data from "./data.js";  */

export default function Home(props) {

    const redirect = props.location.pathname;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLastPageAction(redirect));
    });

    return (
        <div className="row centered">
            <h1>Hello World</h1>
        </div>
    );
}