import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
const Checkout = () => {
  const [{ basket, user }] = useStateValue();
  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img src='https://images-eu.ssl-images-amazon.com/images/G/31/img23/Fashion/BAU/Bank/March/V1/apay.png' className='checkout_ad' alt='here is' />
        <h4>Hello {user}</h4>
        {basket?.length === 0 ? (
          <h2>Your basket is empty</h2>) : (
          <div className='checkout__title'>
            <h2>Your wishlist products here</h2>
          </div>
        )}
        {basket.map(item => (
          <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating} />
        ))}

      </div>


      <div className='checkout__right'>

        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
