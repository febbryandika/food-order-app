import { useContext } from "react";

import Button from "./UI/Button.jsx";
import Modal from "./UI/Modal.jsx";

import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { formatCurrency } from "../util/formatCurrency.js";
import CartItem from "./CartItem.jsx";

function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleHideCart() {
        userProgressCtx.hideCart();
    }

    function handleShowCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress === "cart" ? handleHideCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{formatCurrency.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleHideCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleShowCheckout}>Checkout</Button>}
            </p>
        </Modal>
    );
}

export default Cart;