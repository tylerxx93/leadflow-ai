const db = require('../config/db');

const handleStripeWebhook = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  const event = req.body;

  // In a real app, we would verify the signature using Stripe library
  // For now, we'll just log and handle basic events
  
  console.log('Received Stripe event:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const customerId = session.customer;
        const userEmail = session.customer_details.email;

        // Update user status
        await db.query(
          'UPDATE users SET stripe_customer_id = $1, subscription_status = $2 WHERE email = $3',
          [customerId, 'active', userEmail]
        );
        console.log(`Updated subscription for user: ${userEmail}`);
        break;
      
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        const deletedCustomerId = subscription.customer;

        await db.query(
          'UPDATE users SET subscription_status = $1 WHERE stripe_customer_id = $2',
          ['canceled', deletedCustomerId]
        );
        console.log(`Canceled subscription for customer: ${deletedCustomerId}`);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleStripeWebhook
};
