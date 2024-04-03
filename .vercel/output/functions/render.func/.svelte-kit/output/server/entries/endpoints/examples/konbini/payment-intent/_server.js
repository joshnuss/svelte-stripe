import { j as json } from "../../../../../chunks/index.js";
import Stripe from "stripe";
import { b as SECRET_STRIPE_KEY_JP } from "../../../../../chunks/private.js";
const stripe = new Stripe(SECRET_STRIPE_KEY_JP);
async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2e3,
    currency: "jpy",
    payment_method_types: ["konbini"],
    payment_method_options: {
      konbini: {
        product_description: "Tシャツ",
        expires_after_days: 3
      }
    }
  });
  return json({
    clientSecret: paymentIntent.client_secret
  });
}
export {
  POST
};
