import express from 'express';

// Raw body parser middleware for Stripe webhooks
// Stripe needs the raw body to validate the webhook signature
export const rawBodyParser = express.raw({ type: 'application/json' });
