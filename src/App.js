import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import ContactPage from "./components/ContactPage/ContactPage";
import ItemListContainer from "./containers/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./containers/ItemDetailContainer/ItemDetailContainer";
import Error404 from "./components/Error404/Error404";
import CartView from "./components/CartView/CartView";
import Footer from "./components/Footer/Footer";
import Checkout from "./components/Checkout/Checkout";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

//CONTEXT:
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/nuestrosProductos"
              component={ItemListContainer}
            />
            <Route
              exact
              path="/category/:categoryId"
              component={ItemListContainer}
            />
            <Route exact path="/item/:id" component={ItemDetailContainer} />
            <Route exact path="/contacto" component={ContactPage} />
            <Route exact path="/cart" component={CartView} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp}/>
            <Route path="*" component={Error404} />
          </Switch>

          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;