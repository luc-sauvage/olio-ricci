import React from 'react'

export default function CheckOut(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? "active" : ""}>Spedizione</div>
            <div className={props.step2 ? "active" : ""}>Pagamento</div>
            <div className={props.step3 ? "active" : ""}>Ordina</div>  
        </div>
    )
}


