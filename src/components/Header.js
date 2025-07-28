import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from "./firebase";
import logo from '../images/amazon-logo.png'
const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const login = () => {
    if (user) {
      navigate('/')
      dispatch({
        type: 'SET_USER',
        user: null
      });
      localStorage.removeItem('userEmail')
      auth.signOut();

    }
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header-logo"
          src={logo}
          alt="here is"
        />
      </Link>
      <div className="header-search">
        <input className="header-search-input" type="text" />
        {/* logo */}
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="header-nav">
        <Link to={!user && '/login'}>
          <div className="header__option">

            <span className="header__option_one">Hello {!user ? "Guest" : user} </span>
            <span className="header__option_two" onClick={login}>{!user ? "Sign In" : "Sign Out"}</span>

          </div>
        </Link>
        <div id="second__option" className="header__option">
          <span className="header__option_one">Returns</span>
          <span className="header__option_two">& Orders</span>
        </div>
        <div id="third__option" className="header__option">
          <span className="header__option_one">Your</span>
          <span className="header__option_two">Prime</span>
        </div>
        <div className="header__option-shoppingBasket">
          <Link to="/checkout">
            <i className="fa fa-cart-plus" aria-hidden="true"></i>
          </Link>
          <span className="header__optionLineTwo header_basketCount">{basket?.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
