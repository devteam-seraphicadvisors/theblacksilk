import Stripe from "stripe";

export const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build";
  return new Stripe(secretKey, {
    apiVersion: "2024-06-20",
  });
};

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build", {
  apiVersion: "2024-06-20",
});
