import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLastPageAction } from "../actions/navActions.js";
import frantoioA from "../website-images/frantoioA.jpg"
import frantoioB from "../website-images/frantoioB.jpg"

export default function Home(props) {
    const redirect = props.location.pathname;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLastPageAction(redirect));
    });

    return (
        <>
            <section id="hero" className="hero-home">
                <div className="hero-content-container">
                    <div className="hero-title-container">
                        <h1 className="hero-title">Ricci</h1>
                        <h2 className="hero-subtitle">
                            Olio Extravergine di Oliva
                        </h2>
                    </div>
                </div>
            </section>
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
                                L’olio extravergine di Oliva Ricci nasce dalla
                                grande passione per l’olio di Alessandro e
                                Giovanni, padre e figlio che proseguono la
                                tradizione del nonno e del bisnonno. Una storia
                                lunga un secolo che entra nel vivo con
                                l’acquisto di un frantoio. Infatti,
                                precedentemente le olive ottenute dagli oltre
                                7000 alberi venivano spremute appoggiandosi a
                                frantoi amici. Ma l’esigenza di controllare
                                tutte le fasi della produzione, dall’albero al
                                prodotto finito, hanno spinto Alessandro ad
                                investire in un frantoio di proprietà, aperto
                                nel 2011. Nonostante la recente storia,
                                l’impegno e la passione, ma soprattutto il forte
                                legame con il territorio, hanno fatto si che
                                l’Olio Extravergine di Oliva Ricci si
                                distinguesse per la qualità e l’attenzione
                                riposta nel processo produttivo. Ed è così che
                                oltre al tradizionale Blend, Alessandro inizia a
                                sperimentare per dare vita a due olii
                                monovarietali, il Frantoio Ricci e il Moraiolo
                                Ricci. 
                                Il primo, nell’anno di nascita vince subito il
                                Silver Prize alla competizione Japan Olive Oil
                                Prize, e insieme al
                            </p>
                        </div>
                        <div className="column right-col">
                            <p className="col-text">
                                secondo si piazza fisso nelle classifiche dei migliori olii Slow Food.
                                Ma il desiderio di innovare spinge ancora la
                                famiglia Ricci a concepire nuovi prodotti, come
                                il Condimento al Melangolo, un extravergine di
                                oliva lavorato con melangoli freschi(Citrus X
                                Aurantium). L’olio extravergine di oliva Ricci
                                non è semplice olio, ma al suo interno si
                                ritrovano la tradizione e la dedizione umbre
                                nella lavorazione della terra e nella capacità
                                di coglierne i suoi frutti. Un legame
                                indissolubile tra i colli di Montecchio e la
                                storia familiare. Si narra che l’assenza del
                                mare abbia donato agli umbri la capacità di
                                legarsi alla terra, di lavorarla e di trarne i
                                maggiori benefici, restituendole ciò che era
                                stato preso. Così, da veri umbri, i Ricci si
                                impegnano per restituire alla terra ciò che è
                                stato tolto, in un legame ormai centenario che
                                punta allo sviluppo e al mantenimento della
                                terra dove sorgono gli uliveti dell’azienda.
                            </p>
                            <img
                                className="col-image"
                                alt="paesaggio sui campi d'ulivi montecchio"
                                src={frantoioB}
                            ></img>
                        </div>
                    </div>
                </div>
            </section>
            <section id="prodotti">

            </section>
        </>
    );
}