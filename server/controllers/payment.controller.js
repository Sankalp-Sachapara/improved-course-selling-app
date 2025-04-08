import Stripe from 'stripe';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import Course from '../models/course.model.js';
import logger from '../utils/logger.js';
import { createError } from '../utils/error.js';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment session
export const createCheckoutSession = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return next(createError(404, 'Course not found'));
    }
    
    // Check if course is published
    if (!course.published) {
      return next(createError(400, 'Course is not available for purchase'));
    }
    
    // Check if user already purchased this course
    const user = await User.findById(req.user.id);
    if (user.purchasedCourses.includes(courseId)) {
      return next(createError(400, 'You already purchased this course'));
    }
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
              description: course.description,
              images: [course.imageLink],
            },
            unit_amount: Math.round(course.price * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/courses/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/courses/${courseId}`,
      metadata: {
        courseId,
        userId: req.user.id
      }
    });
    
    res.status(200).json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url
      }
    });
  } catch (error) {
    logger.error(`Create checkout session error: ${error.message}`);
    next(error);
  }
};

// Handle Stripe webhook
export const handleWebhook = async (req, res, next) => {
  try {
    const sig = req.headers['stripe-signature'];
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody, // Note: You need to make the raw body available
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Fulfill the order
      await fulfillOrder(session);
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    logger.error(`Webhook error: ${error.message}`);
    next(error);
  }
};

// Helper function to fulfill an order
const fulfillOrder = async (session) => {
  try {
    const { courseId, userId } = session.metadata;
    
    // Add course to user's purchased courses
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { purchasedCourses: courseId } }
    );
    
    logger.info(`Course ${courseId} added to user ${userId}'s purchased courses`);
  } catch (error) {
    logger.error(`Error fulfilling order: ${error.message}`);
    throw error;
  }
};

// Get payment status
export const getPaymentStatus = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      return next(createError(404, 'Payment session not found'));
    }
    
    res.status(200).json({
      success: true,
      data: {
        status: session.payment_status,
        amountTotal: session.amount_total / 100
      }
    });
  } catch (error) {
    logger.error(`Get payment status error: ${error.message}`);
    next(error);
  }
};

// Get user payment history
export const getPaymentHistory = async (req, res, next) => {
  try {
    // In a real application, you would store payment records in your database
    // This is a simplified version using Stripe API directly
    const paymentIntents = await stripe.paymentIntents.list({
      customer: req.user.stripeCustomerId, // You would need to store this in your user model
      limit: 10,
    });
    
    const paymentHistory = paymentIntents.data.map(payment => ({
      id: payment.id,
      amount: payment.amount / 100,
      status: payment.status,
      created: new Date(payment.created * 1000).toISOString(),
      paymentMethod: payment.payment_method_types[0]
    }));
    
    res.status(200).json({
      success: true,
      data: paymentHistory
    });
  } catch (error) {
    logger.error(`Get payment history error: ${error.message}`);
    next(error);
  }
};
