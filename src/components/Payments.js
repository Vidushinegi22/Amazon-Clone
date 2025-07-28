import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import axios from './axios';
const Payments = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(null)
    const [processing, setProcessing] = useState(null)
    const [succeeded, setSucceeded] = useState(null)
    const [clientSecret, setClientSecret] = useState(true)
    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe excepts the total in currency subunit
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])
    console.log('client secret is ' + clientSecret)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent = payment confirmation
            setSucceeded(true)
            setError(null)
            setProcessing(false)
            alert("Successfully buy products")
            dispatch({
                type: 'EMPTY_BASKET'
            })
            navigate('/')
        })
    }
    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }
    return (
        <div className='payments'>
            <div className='payments__container'>
                <h1>
                    Checkout {<Link to='/checkout'>{basket?.length} items</Link>}
                </h1>
                {/* Payment Section - delivery section */}
                <div className='payments__section'>
                    <div className='payments__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payments__address'>
                        <p>{user}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                {/* Payment Section - review items */}
                <div className='payments__section'>
                    <div className='payments__title'>
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className='payments__items'>
                        {basket.map(item => {
                            return <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating} />
                        })}
                    </div>
                </div>
                {/* Payment Section -Payment method */}
                <div className='payments__section'>
                    <div className='payments__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payments__details'>
                        {/* Stripe magic will go */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payments__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType='text'
                                    thousandSeparator={true}
                                    prefix='$'

                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payments
