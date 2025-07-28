import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";


const Product = ({ id, title, price, rating, image }) => {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate()

  // const addToBasket = () => {
  //   console.log("hello");
  //   //Dispatch the basket into the data layer
  //   dispatch({
  //     type: 'ADD_TO_BASKET',
  //     item: {
  //       id: id,
  //       title: title,
  //       price: price,
  //       rating: rating,
  //     },
  //   });
  // };

  const addToBasket = () => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch({
        type: 'ADD_TO_BASKET',
        item: {
          id: id,
          title: title,
          image: image,
          price: price,
          rating: rating,
        },
      });
    }
  }
  return (
    <div className="product" key={id}>
      <div className="product__info">
        <div className="product__title">{title}</div>
        <div className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </div>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => {
              return <p>⭐</p>;
            })}
        </div>
      </div>
      <img src={image} alt="here is" className="product_image" />
      <button type="button" onClick={addToBasket}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
