import React from 'react'

export default function CheckOut(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? "active" : ""}>Sign In</div>
            <div className={props.step2 ? "active" : ""}>Spedizione</div>
            <div className={props.step3 ? "active" : ""}>Pagamento</div>
            <div className={props.step4 ? "active" : ""}>Ordina</div>  
        </div>
    )
}


