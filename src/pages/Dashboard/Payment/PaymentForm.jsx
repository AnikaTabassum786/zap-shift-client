import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useTrackingLogger from '../../../hooks/useTrackingLogger';

const PaymentForm = () => {

    const {user} = useAuth();
    const navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('')
    const { parcelId } = useParams();
    console.log(parcelId)

    const axiosSecure = useAxiosSecure();
    const {logTracking} = useTrackingLogger();

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })

    if (isPending) {
        return '...loading'
    }

   

    console.log(parcelInfo)
    const amount = parcelInfo.cost
    const amountInCents = amount * 100;
    console.log(amountInCents);


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        //step-1: check valid card 
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
            // step-2: create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                parcelId
            })

            console.log('res from intent', res)

            const clientSecret = res.data.clientSecret
            console.log(clientSecret)



            // step-3: confirm payment

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email:user.email,

                    },
                },
            });

            if (result.error) {
                setError(result.error.message)
            }
            else {
                setError(' ')
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded')
                    console.log(result);

                    const transactionId = result.paymentIntent.id

                    const paymentData = {
                        parcelId,
                        email:user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod:result.paymentIntent.payment_method_types
                    }

                    const paymentRes = await axiosSecure.post('/payments', paymentData);
                    if(paymentRes.data.insertedId){
                        // console.log('Payment Successfully')
                         // ✅ Show SweetAlert with transaction ID
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to My Parcels',
                        });

                        await logTracking(
                            {
                                tracking_id: parcelInfo.tracking_id,
                                status:'payment_done',
                                details:`Paid by ${user.displayName}`
                            }
                        )

                        // ✅ Redirect to /myParcels
                        navigate('/dashboard/myParcels');
                    }
                }
            }
        }





    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement>

                </CardElement>
                <button type='submit' disabled={!stripe} className='btn btn-primary text-black'>
                    Pay  ${amount}
                </button>

                {
                    error && <p className='text-red-400'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;