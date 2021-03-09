import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLastPageAction } from '../actions/navActions.js';
import frantoioA from '../website-images/frantoioA.jpg';
import frantoioB from '../website-images/frantoioB.jpg';
import allProducts from '../website-images/all-products.jpg';
import blend from '../website-images/oil-blend.jpg';
import frantoio from '../website-images/oil-frantoio.jpg';
import melangolo from '../website-images/oil-melangolo.jpg';
import moraiolo from '../website-images/oil-moraiolo.jpg';
import Hero from '../components/hero.js';

export default function Home(props) {
  const redirect = props.location.pathname;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLastPageAction(redirect));
  });

  return (
    <>
      <Hero classes={'home'} subtitle={'Olio Extravergine di Oliva'}></Hero>
      <section id="frantoio" className="content-section">
        <div className="content-container">
          <h2 className="content-title">Chi siamo - Il Frantoio</h2>
          <div className="column-container">
            <div className="column left-col">
              <img
                className="col-image"
                alt="paesaggio sui campi d'ulivi montecchio"
                src={frantoioA}
              ></img>
              <p className="col-text">
                L’olio extravergine di Oliva Ricci nasce dalla grande passione
                per l’olio di Alessandro e Giovanni, padre e figlio che
                proseguono la tradizione del nonno e del bisnonno. Una storia
                lunga un secolo che entra nel vivo con l’acquisto di un
                frantoio. Infatti, precedentemente le olive ottenute dagli oltre
                7000 alberi venivano spremute appoggiandosi a frantoi amici. Ma
                l’esigenza di controllare tutte le fasi della produzione,
                dall’albero al prodotto finito, hanno spinto Alessandro ad
                investire in un frantoio di proprietà, aperto nel 2011.
                Nonostante la recente storia, l’impegno e la passione, ma
                soprattutto il forte legame con il territorio, hanno fatto si
                che l’Olio Extravergine di Oliva Ricci si distinguesse per la
                qualità e l’attenzione riposta nel processo produttivo. Ed è
                così che oltre al tradizionale Blend, Alessandro inizia a
                sperimentare per dare vita a due olii monovarietali, il Frantoio
                Ricci e il Moraiolo Ricci.
              </p>
            </div>
            <div className="column right-col">
              <p className="col-text">
                Il primo, nell’anno di nascita vince subito il Silver Prize alla
                competizione Japan Olive Oil Prize, e insieme al secondo si
                piazza fisso nelle classifiche dei migliori olii Slow Food. Ma
                il desiderio di innovare spinge ancora la famiglia Ricci a
                concepire nuovi prodotti, come il Condimento al Melangolo, un
                extravergine di oliva lavorato con melangoli freschi(Citrus X
                Aurantium). L’olio extravergine di oliva Ricci non è semplice
                olio, ma al suo interno si ritrovano la tradizione e la
                dedizione umbre nella lavorazione della terra e nella capacità
                di coglierne i suoi frutti. Un legame indissolubile tra i colli
                di Montecchio e la storia familiare. Si narra che l’assenza del
                mare abbia donato agli umbri la capacità di legarsi alla terra,
                di lavorarla e di trarne i maggiori benefici, restituendole ciò
                che era stato preso. Così, da veri umbri, i Ricci si impegnano
                per restituire alla terra ciò che è stato tolto, in un legame
                ormai centenario che punta allo sviluppo e al mantenimento della
                terra dove sorgono gli uliveti dell’azienda.
              </p>
              <img
                className="col-image"
                alt="raccolta olive campi ulivi azienda agricola ricci montecchio"
                src={frantoioB}
              ></img>
            </div>
          </div>
        </div>
      </section>
      <section id="prodotti" className="content-section">
        <div className="content-container">
          <h2 className="content-title">I nostri prodotti</h2>
          <p className="col-text">
            L’olio extravergine d’oliva Ricci è coltivato ad un altitudine di
            500 mt a pochi metri dal Frantoio Ricci. Questa è una delle
            caratteristiche principali che ne garantisce, grazie alla rapidità
            di conferimento delle olive e l’immediata lavorazione, il
            mantenimento di tutte le caratteristiche organolettiche, dalla
            freschezza ai profumi, dal sapore al colore. Abbiamo deciso di
            seguire il difficile sentiero dell’impegno, della serietà e della
            tradizione perché siamo convinti che oggi sia l’unico modo per
            riuscire ad instaurare un corretto, trasparente e duraturo rapporto
            di fiducia con i nostri clienti.
          </p>
          <img
            className="col-image single"
            alt="tutte le varietà d'olio"
            src={allProducts}
          ></img>
        </div>
        <div className="product-container">
          <img
            className="col-image left-col"
            alt="raccolta olive campi ulivi azienda agricola ricci montecchio"
            src={blend}
          ></img>
          <div className="right-col shrink flex-col flex-align-left-col">
            <h3 className="product-title">Blend</h3>
            <p className="col-text">
              BLEND: Moraiolo, Frantoio, Leccino COLORE: dal verde pistacchio al
              giallo oro. OLFATTO: al naso si apre con note vegetali di cardo ed
              erba tagliata. GUSTO: è coerente con le sensazioni olfattive,
              morbido ed avvolgente, armonico ed equilibrato nelle note amare e
              piccanti.
            </p>
            <button className="button big">Acquista</button>
          </div>
        </div>
        <div className="product-container">
          <div className="left-col shrink flex-col flex-align-right-col">
            <h3 className="product-title">Monocultivar Moraiolo</h3>
            <p className="col-text">
              Il Monocultivar Moraiolo ricci al naso mette in rilievo note
              mediamente intense di carciofo poi in bocca mostra un corpo
              adeguato, un buon equilibrio delle componenti amaro-piccanti e
              un’aromaticità che verte sulla percezione di erbe amare e di
              cardo.
            </p>
            <button className="button big">Acquista</button>
          </div>
          <img
            className="col-image right-col"
            alt="raccolta olive campi ulivi azienda agricola ricci montecchio"
            src={moraiolo}
          ></img>
        </div>
        <div className="product-container">
          <img
            className="col-image left-col"
            alt="raccolta olive campi ulivi azienda agricola ricci montecchio"
            src={frantoio}
          ></img>
          <div className="right-col shrink flex-col flex-align-left-col">
            <h3 className="product-title">Monocultivar Frantoio</h3>
            <p className="col-text">
              Di buona intensità al naso il Monocultivar Frantoio Ricci offre
              netti sentori di fiori campestri e di mandorla verde. In bocca
              mostra un corpo pieno, mentre il gusto poggia su lieve amaro e su
              un piccante mediamente intenso e progressivo arricchito da
              persistente sapore di mandorla.
            </p>
            <button className="button big">Acquista</button>
          </div>
        </div>
        <div className="product-container">
          <div className="left-col shrink flex-col flex-align-right-col">
            <h3 className="product-title">Melangolo</h3>
            <p className="col-text">
              Olive di varietà Frantoio, pigiate con melangoli freschi (Citrus X
              Aurantium), una varietà di arancia che cresce nel sud dell'Umbria,
              la nostra regione. Ha un alto contenuto di polifenoli e un sapore
              intenso. Ideale per insalate, selvaggina e pesce.
            </p>
            <button className="button big">Acquista</button>
          </div>
          <img
            className="col-image right-col"
            alt="raccolta olive campi ulivi azienda agricola ricci montecchio"
            src={melangolo}
          ></img>
        </div>
      </section>
    </>
  );
}
