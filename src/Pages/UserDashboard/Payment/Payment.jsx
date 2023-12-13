import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CheckOutForm from './checkOutForm';

const Payment = () => {


    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

    return (

        <div>
            <Helmet>
                <title>Dashboard | Payment</title>
            </Helmet>
            <h2 className='text-4xl font-bold text-center mt-10'>Please Payment For The Membership</h2><hr className='border-2 mt-4 md:w-[400px] mx-auto' />

            {/* payment gatway stripe */}
            <Elements stripe={stripePromise}>
                <CheckOutForm></CheckOutForm>
            </Elements>
           
           
        </div>
    );
};

export default Payment;