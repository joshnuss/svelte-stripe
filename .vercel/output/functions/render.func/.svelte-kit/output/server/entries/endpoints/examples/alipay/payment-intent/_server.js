import { j as json } from "../../../../../chunks/index.js";
import Stripe from "stripe";
import { S as SECRET_STRIPE_KEY } from "../../../../../chunks/private.js";
const stripe = new Stripe(SECRET_STRIPE_KEY);
async function POST({ request }) {
  const { email } = await request.json();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2e3,
    currency: "cny",
    payment_method_types: ["alipay"],
    receipt_email: email
  });
  return json({
    clientSecret: paymentIntent.client_secret
  });
}
export {
  POST
};
