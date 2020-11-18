import React from "react";
import data from "./data.js";

export default function App() {
  return (
      <div className="grid-template">
          <header className="row">
              <div>
                  <a href="index.html">
                      <img src="./images/logo.png" alt="olio ricci logo"></img>
                  </a>
              </div>
              <div>
                  <a href="cart.html">Carrello</a>
                  <a href="signin.html">Registrati</a>
              </div>
          </header>
          <main>
              <div className="row centered">
                  {data.prodotti.map((prodotto) => (
                      <div key={prodotto._id} className="card">
                          <a href={`/prodotti/${prodotto._id}`}>
                              <img
                                  className="prod-image"
                                  src={prodotto.foto}
                                  alt={`olio ricci qualità ${prodotto.nome}`}
                              ></img>
                          </a>
                          <div className="card-body">
                              <h2>
                                  <a href={`/prodotti/${prodotto._id}`}>{prodotto.nome}</a>
                              </h2>
                              <div className="price">€ {prodotto.prezzo}</div>
                          </div>
                      </div>
                  ))}
              </div>
          </main>
          <footer className="row centered">
              All rights reserved - Azienda Agricola Alessandro Ricci - via
              della Variante 2, 05020 Montecchio
          </footer>
      </div>
  );
}

