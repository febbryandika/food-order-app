import { useContext } from "react";

import Button from "./UI/Button.jsx";

import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalItems, item) => {
        return totalItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Restaurant" />
                <h1>Food Order App</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}

export default Header;