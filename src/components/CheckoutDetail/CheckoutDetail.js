import React, { useContext } from 'react'

//CONTEXT:
import { CartContext } from '../../context/CartContext'

const CheckoutDetail = () => {
    const { carrito, totalPurchase } = useContext(CartContext)

    return (
        <div className="violet-container">
                    <div>
                        <h4 className="white-title">Detalle de compra</h4>
                        <ul>
                        {carrito.map(item => <li key={item.id} className="title title-small list">{item.name} Cantidad: {item.quantity} Presentación: {item.presentation} Precio: $ { item.price}</li>)}
                        </ul>
                        <hr/>
                        <p>Total a pagar: <span>${totalPurchase()}</span></p>
                    </div>
                    
                </div>
    )
}

export default CheckoutDetail;