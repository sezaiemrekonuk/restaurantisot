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
        successUrl: `https://65a1ce611e52d95c9746bf2c--thunderous-bunny-4f6d0f.netlify.app/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `http://localhost:3000/cancel`,
        customerEmail: 'customer@email.com',
      });

      console.log("Stripe Checkout Result:", result);
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  }

  useEffect(() => {
    handleCheckout();
  }, []);

  return <></>;
}
