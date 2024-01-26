import getStripe from '../lib/getStripe.jsx';
import React, { useEffect } from 'react';

export default function Payment() {
  async function handleCheckout() {
    try {
      const stripe = await getStripe();
      const result = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: "price_1OWhm3GbW3fTXbeTMtzzL5Dw",
            quantity: 1,
          },
        ],
        mode: 'payment',
        successUrl: `https://www.restaurantisot.com/success?session_id={CHECKOUT_SESSION_ID}?payment_success=true`,
        cancelUrl: `https://www.restaurantisot.com/cancel`,
        customerEmail: 'customer@email.com',
      });

      console.log("Stripe Checkout Result:", result);
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  }

  useEffect(() => {
    handleCheckout();

    localStorage.setItem("context", "head")
  }, []);

  return <></>;
}
