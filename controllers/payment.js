import Stripe from 'stripe';

// TODO Restart to put in STRIPE_API_KEY ENV
const stripe = new Stripe(
  'sk_test_51LSPblDDD3A02n19HxmIJhGbPDoWDTeidfSxPdCs8665GoVsI6fcGgu4mSFDZ2plD2lmyF4OoSy2HgORljtByxGt001GOX45G0'
);

export default function initStripeController() {
  const getCustomer = async (req, res) => {
    try {
      const { customerId } = req.params;
      const customer = await stripe.customers.retrieve(customerId);
      res.json({
        balance: customer.balance,
      });
    } catch (error) {
      console.log('Error', error);
      res.json({
        message: 'Customer finding failed!',
      });
    }
  };

  const createCustomer = async (req, res) => {
    try {
      const customer = await stripe.customers.create({
        description: req.body.description,
        name: req.body.name,
      });
      res.json({
        customerId: customer.id,
        balance: customer.balance,
      });
    } catch (error) {
      console.log('Error', error);
      res.json({
        message: 'Customer creation failed!',
      });
    }
  };

  const updateCard = async (req, res) => {
    const { customerId } = req.params;
    const { name, cardNumber, month, year, cvc } = req.body;
    console.log('Updating card now');
    try {
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        billing_details: {
          name,
        },
        card: {
          number: cardNumber,
          exp_month: month,
          exp_year: year,
          cvc: cvc,
        },
      });
      console.log('Creating payment method', paymentMethod);
      const attachCustomer = await stripe.paymentMethods.attach(
        paymentMethod.id,
        { customer: customerId }
      );
      console.log('Attaching customer', attachCustomer);
      res.json({
        name: attachCustomer.billing_details.name,
        lastFourDigit: attachCustomer.card.last4,
        expMonth: attachCustomer.card.exp_month,
        expYear: attachCustomer.card.exp_year,
        brand: attachCustomer.card.brand,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: 'Failed to update card.',
        success: false,
      });
    }
  };

  const getCard = async (req, res) => {
    const { customerId } = req.params;
    try {
      const paymentMethods = await stripe.customers.listPaymentMethods(
        customerId,
        { type: 'card' }
      );
      if (!paymentMethods.data[0]) {
        res.json({ card: false });
      }
      console.log(paymentMethods);
      res.json({
        name: paymentMethods.data[0].billing_details.name,
        card: paymentMethods.data[0].card.last4,
        month: paymentMethods.data[0].card.exp_month,
        year: paymentMethods.data[0].card.exp_year,
        brand: paymentMethods.data[0].card.brand,
        success: true,
      });
    } catch (error) {
      console.log('Error', error);
    }
  };

  const retrieveCustomerPaymentMethod = async (req, res) => {
    const { customerId } = req.params;
    try {
      const paymentMethods = await stripe.customers.listPaymentMethods(
        customerId,
        { type: 'card' }
      );
      res.json({ payment: paymentMethods });
    } catch (error) {
      console.log(error);
    }
  };

  const existingCardPayment = async (req, res) => {
    const { customer, amount, currency, payment_method } = req.body;
    try {
      const createPaymentIntent = await stripe.paymentIntents.create({
        amount,
        customer,
        currency,
        payment_method,
        confirm: true,
      });
      const customerRetrieval = await stripe.customers.retrieve(customer);
      const customerBalance = await stripe.customers.update(customer, {
        balance: customerRetrieval.balance + amount,
      });

      console.log(createPaymentIntent);

      res.json({
        balance: customerBalance.balance,
        message: 'Payment successful',
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getCustomer,
    createCustomer,
    existingCardPayment,
    updateCard,
    getCard,
    retrieveCustomerPaymentMethod,
  };
}
