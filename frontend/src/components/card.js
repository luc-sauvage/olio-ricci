import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../actions/cartActions';
import { makeStyles } from '@material-ui/core/styles';
import ShopCard from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { flexbox } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    height: '70rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    maxHeight: '25rem',
    maxWidth: '25rem',
  },
  typographyPStyles: {
    fontSize: '1.6rem',
  },
  formControl: {
    minWidth: 120,
    top: '-2px',
  },
  dropdownContainerStyles: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  labelStyling: {
    fontSize: '1.5rem',
  },
  dropdown: {},
}));

export default function Card({ prodotto }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  let [quantita, setQuantita] = useState('');

  const addToCartHandler = (prodotto, qty) => {
    dispatch(addProductToCart(prodotto, qty));
  };

  return (
    <>
      <ShopCard key={prodotto._id} className={classes.root}>
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
          <div className={classes.dropdownContainerStyles}>
            <div className="quantity">Disponibile</div>
            {prodotto.disponibile === 'si' ? (
              <>
                <div className="disponibile">{prodotto.disponibile}</div>
                <FormControl className={classes.formControl}>
                  <InputLabel className={classes.labelStyling}>
                    Quantità
                  </InputLabel>
                  <Select
                    value={quantita}
                    onChange={(e) => setQuantita(e.target.value)}
                    className={classes.dropdown}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
              </>
            ) : (
              <div className="esaurito">{prodotto.disponibile}</div>
            )}
          </div>
          <button
            onClick={() => addToCartHandler(prodotto, quantita)}
            className="button block"
          >
            Aggiungi al carrello
          </button>
        </CardContent>
      </ShopCard>
    </>
  );
}
