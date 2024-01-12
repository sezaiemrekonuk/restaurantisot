import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51OWPlCGbW3fTXbeT1Kvao0O1kRbn2EM9d8lE85BzBAV2k2oLjSJYzwEprrBwxJggqZbUtoi3Or7CJjy7MpXGqrWt00fuygRKd5");
  }
  return stripePromise;
};

export default getStripe;