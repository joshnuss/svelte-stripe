import { r as redirect } from "../../../../../chunks/index.js";
import Stripe from "stripe";
import { S as SECRET_STRIPE_KEY } from "../../../../../chunks/private.js";
const stripe = new Stripe(SECRET_STRIPE_KEY);
async function GET(req) {
  const { searchParams } = req.url;
  const intentId = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const paymentIntent = await stripe.paymentIntents.retrieve(intentId);
  if (paymentIntent.client_secret !== clientSecret)
    throw new Error("Client secret mismatch");
  if (paymentIntent.status === "succeeded") {
    throw redirect(302, "/examples/alipay/thanks");
  }
  throw redirect(302, "/examples/alipay?error=true");
}
export {
  GET
};
