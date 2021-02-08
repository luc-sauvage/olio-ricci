import React from 'react'

export default function Hero({classes, subtitle}) {
    return (
        <section id="hero" className={`hero ${classes}`}>
                <div className="hero-content-container">
                    <div className="hero-title-container">
                        <h1 className="hero-title">Ricci</h1>
                        <h2 className="hero-subtitle">
                            {subtitle}
                        </h2>
                    </div>
                </div>
        </section>
    )
}
