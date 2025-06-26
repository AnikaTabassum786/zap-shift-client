import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const PaymentForm = () => {

    const stripe= useStripe();
    const element = useElements();

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!stripe || !element){
            return;
        }

        const card = element.getElement(CardElement);

        if(!card){
            return;
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement>
                    <button type='submit' disabled={!stripe}>
                          Pay For Parcel Pickup
                    </button>
                </CardElement>
            </form>
        </div>
    );
};

export default PaymentForm;