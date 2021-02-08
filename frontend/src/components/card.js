import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../actions/cartActions";
import { makeStyles } from "@material-ui/core/styles";
import ShopCard from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
       minHeight: "60rem",
    },
    media: {
        maxHeight: "25rem",
        maxWidth: "25rem",
    },
    typographyPStyles: {
        fontSize: "1.6rem",
    },
}));

export default function Card({ prodotto }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const dispatch = useDispatch();
    let [quantita, setQuantita] = useState(1);

    const addToCartHandler = (prodotto, qty) => {
        dispatch(addProductToCart(prodotto, qty));
    };

    return (
        <>
            <ShopCard
                display="flex"
                flexDirection="column"
                key={prodotto._id}
                className={classes.root}
            >
                <Box display="flex" justifyContent="center">
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={prodotto.foto}
                        title={prodotto.nome}
                    />
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="h2">
                        {prodotto.nome}
                    </Typography>
                    <Typography
                        className={classes.typographyPStyles}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {prodotto.descrizione}
                    </Typography>
                </CardContent>
                <Button
                    onClick={() => addToCartHandler(prodotto, quantita)}
                >Aggiungi al carrello</Button>
            </ShopCard>
        </>
    );
}
