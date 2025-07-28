import React from 'react'
import './Home.css'
import Product from './Product'
const Home = () => {
  return (
    <div className='home'>
      <div className='home__container'>
        <img src='https://tm.ibxk.com.br/2022/06/14/14180144553522.jpg?ims=1120x420' alt='here is' className='home_image' />
      </div>
      <div className='home__row'>
        {/* product */}
        <Product id="123" title="One Plus 3T metalic bold black 8GB RAM" price={500} rating={4} image="https://m.media-amazon.com/images/I/41mDAtPMDKL._SX300_SY300_QL70_FMwebp_.jpg" />
        {/* product */}
        <Product id="124" title="Fire-Boltt Ninja Call Pro Plus 1.83 Smart Watch with Bluetooth Calling" price={50} rating={4} image="https://m.media-amazon.com/images/I/61S9aVnRZDL._SX679_.jpg" />


        {/* product */}
        <Product id="125" title="Echo Dot (3rd Gen) - Smart speaker with Alexa (Black)" price={100} rating={5} image="https://m.media-amazon.com/images/I/61IfOpQwIEL._SX679_.jpg" />
        {/* product */}
        <Product id="126" title="Campus Men's Maxico Running Shoes" price={10} rating={3} image="https://m.media-amazon.com/images/I/71UDBmG9kbL._UY695_.jpg" />
        {/* product */}
        <Product id="127" title="HP 15s, 11th Gen Intel Core i5-1155G7, 15.6 inch(39.6cm) FHD Anti-Glare 15s-fr4000TU" price={1000} rating={4} image="https://m.media-amazon.com/images/I/71y-nJm3NiL._SX679_.jpg" />


        {/* product */}
        <Product id="128" title="Redmi 108 cm (43 inches) 4K Ultra HD Android Smart LED TV X43 | L43R7-7AIN (Black)" price={700} rating={4} image="https://m.media-amazon.com/images/I/7132bixhytL._SX679_.jpg" />
      </div>
    </div>
  )
}

export default Home
