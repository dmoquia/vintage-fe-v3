import { useState, useContext } from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";

import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import submitOrder from "../strapi/submitOrder";

function Checkout() {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = useContext(UserContext);
  // const history = useHistory();
  const navigate = useNavigate();

  // state values
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  // console.log(props.stripe.createToken());
  const isEmpty = !name || alert.show;
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    showAlert({ msg: "submitting order... please wait" });
    e.preventDefault();
    // create payment
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log("paymentMethod", paymentMethod);
    console.log("error", error);

    // create token
    if (paymentMethod) {
      const cardElement = elements.getElement(CardElement);
      let res = await stripe.createToken(cardElement);
      const { token } = res;
      // console.log(token.id);
      if (token) {
        // console.log(token);
        setError("");
        const { id } = token;
        let order = await submitOrder({
          name: name,
          total: total,
          items: cart,
          stripeTokenId: id,
          userToken: user.token,
        });

        if (order) {
          showAlert({ msg: "your order is complete" });
          clearCart();
          navigate("/");
          return;
        } else {
          showAlert({
            msg: "there was an error with your order. please try again",
            type: "danger",
          });
        }
      } else {
        hideAlert();
        setError(res.error.message);
      }
    }
  }

  // const response = await stripe
  //   .createToken(elements)
  //   .catch((error) => console.log(error));

  // const { token } = response;

  if (cart.length < 1) return <EmptyCart />;
  return (
    <section className="section form">
      <h2 className="section-title">checkout</h2>
      <form className="checkout-form">
        <h3>
          Order total : <span>${total}</span>
        </h3>
        {/* single input */}
        <div className="form-control">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* end of single input */}

        {/* card element */}
        <div className="stripe-input">
          <label htmlFor="card-element">Credit or Debit Card</label>
          <p className="stripe-info">
            Test using this credit card: <span>4242 4242 4242 4242</span>
            <br />
            enter any 5 digits for the zip code
            <br />
            enter any 3 digits for the CVC
          </p>
        </div>
        {/* end of card element */}
        {/* STRIPE ELEMENTS */}
        <CardElement className="card-element"></CardElement>
        {/* stripe errors */}

        {error && <p className="form-empty">{error}</p>}
        {/* empty value */}
        {isEmpty ? (
          <p className="form-empty">please fill out name field</p>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-block"
          >
            submit
          </button>
        )}
      </form>
    </section>
  );
}

// const CardForm = injectStripe(Checkout);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
const StripeWrapper = () => {
  return (
    // <StripeProvider apiKey={import.meta.env.VITE_STRIPE_API_KEY}>
    <Elements stripe={stripePromise}>
      {/* <CardForm></CardForm> */}
      <Checkout />
    </Elements>
    // </StripeProvider>
  );
};

export default StripeWrapper;
