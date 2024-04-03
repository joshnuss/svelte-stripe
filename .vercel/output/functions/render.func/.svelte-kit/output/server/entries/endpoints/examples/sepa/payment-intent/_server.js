import { j as json } from "../../../../../chunks/index.js";
import Stripe from "stripe";
import { S as SECRET_STRIPE_KEY } from "../../../../../chunks/private.js";
const stripe = new Stripe(SECRET_STRIPE_KEY);
async function POST({ request }) {
  const body = await request.json();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: body.amount,
    currency: "eur",
    payment_method_types: ["sepa_debit"]
  });
  return json({
    clientSecret: paymentIntent.client_secret
  });
}
export {
  POST
};
