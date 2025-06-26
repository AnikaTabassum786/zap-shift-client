import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = () => {

    const stripe = useStripe();
    const element = useElements();

    const [error,setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !element) {
            return;
        }

        const card = element.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)
           
            // console.log('error', error)
        }
        else {
            setError('')
            console.log('Payment method', paymentMethod)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement>

                </CardElement>
                <button type='submit' disabled={!stripe} className='btn btn-primary text-black'>
                    Pay For Parcel Pickup
                </button>

                {
                    error && <p className='text-red-400'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;