import Stripe from "stripe";
import { S as SECRET_STRIPE_KEY, a as STRIPE_WEBHOOK_SECRET } from "../../../../../chunks/private.js";
const stripe = new Stripe(SECRET_STRIPE_KEY);
async function POST({ request }) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.warn("⚠️  Webhook signature verification failed.", err.message);
    return new Response(void 0, { status: 400 });
  }
  if (event.type == "charge.succeeded") {
    const charge = event.data.object;
    console.log(`✅ Charge succeeded ${charge.id}`);
  }
  return new Response(void 0);
}
export {
  POST
};
