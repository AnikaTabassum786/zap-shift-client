import React from 'react';
import {Element} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')

const Payment = () => {
    return (
        <Element stripe={stripePromise}>
           <PaymentForm></PaymentForm>
        </Element>
    );
};

export default Payment;