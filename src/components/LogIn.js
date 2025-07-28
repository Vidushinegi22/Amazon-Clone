import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
const LogIn = () => {
    const [{ user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = (e) => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                //logged in , redirect to home page
                navigate('/')
                dispatch({
                    type: 'SET_USER',
                    user: email
                });
                localStorage.setItem('userEmail', email)
            })
            .catch((e) => alert(e.message))

    }

    const register = (e) => {
        e.preventDefault();
        //Do register logic
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                //create a user and logged in and redirect... to the home page
                navigate('/')
                dispatch({
                    type: 'SET_USER',
                    user: email
                });
                localStorage.setItem('userEmail', email)
            })
            .catch((e) => alert(e.message))


    }
    return (
        <div className='login'>
            <Link to='/'>
                <img className='login__logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt='here is' />
            </Link>
            <div className='login__container'>
                <h1>Sign In</h1>
                <form>
                    <h5>Email</h5>
                    <input type='email' value={email} onChange={event => setEmail(event.target.value)} />
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={event => setPassword(event.target.value)} />
                    <button onClick={login} type='submit' className='login__signInButton'>Sign In</button>

                </form>
                <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default LogIn
