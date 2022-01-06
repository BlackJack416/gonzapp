import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../../context/CartContext';

function CartWidget() {

    const { totalQuantity, carrito } = useContext(CartContext);

    return (
        <div className="cart-widget-container" style={{ visibility: carrito.length === 0 ? 'hidden' : 'visible'}}>
            <FontAwesomeIcon className="shopping-cart" icon={faShoppingCart} />
            <span className="shopping-qty">{totalQuantity()}</span>
        </div>
    )
}

export default CartWidget