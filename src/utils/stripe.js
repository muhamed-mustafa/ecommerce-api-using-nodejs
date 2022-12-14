import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2020-08-27',
});

export { stripe };
