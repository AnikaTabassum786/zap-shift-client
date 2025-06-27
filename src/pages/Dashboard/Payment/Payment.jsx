import React from 'react';

import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51ReUZsRoUeXwgqhBoeRYglyto48mKxUPQj5Cn2t5ob3OENiAWZ3oE6qg7SajAOz2kUI7zAZ3VujpjHZSnBG8rBLr00aHzR1wP4')

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;