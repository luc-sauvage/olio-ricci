import React, { useEffect } from "react";
import LoadingBox from "../components/loadingbox.js";
import MessageBox from "../components/messagebox.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions.js";
import Card from "../components/card.js"
import { setLastPageAction } from "../actions/navActions.js";
import { Grid } from "@material-ui/core";
import Hero from "../components/hero.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    gridContainerStyles: {
        width: "100vw",
        display: "flex",
        justifyContent: "center"
    },
    gridStyles: {
        maxWidth: "65%",
    }
})

export default function Shop(props) {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, prodotti } = productList;

    const redirect = props.location.pathname;

    const classes = useStyles();

    useEffect(() => {
        dispatch(listProducts());
        dispatch(setLastPageAction(redirect));
    }, [dispatch, redirect]);

    return (
        <>
            <Hero classes={"shop"} subtitle={"Vendita olio al dettaglio"}></Hero>
            <div className={classes.gridContainerStyles}>
                <Grid className={classes.gridStyles} maxWidth={"lg"} container spacing={3}>
                {loading ? (
                    <Grid item><LoadingBox></LoadingBox></Grid>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    prodotti.map((prodotto) => (
                        <Grid key={prodotto._id} item xs={12} sm={6} md={4}><Card prodotto={prodotto}></Card></Grid>
                    ))
                )}
                </Grid>
            </div>
        </>
    );
}


