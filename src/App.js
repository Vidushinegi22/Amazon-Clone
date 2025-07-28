import './App.css';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import { useStateValue } from './components/StateProvider';
import { useEffect } from 'react';
import Payments from './components/Payments';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51N8PH9SAv5vULD4tcZB5Z8giJjVqS6exTGECJXcNoS8MMf9jWRgaQ2qUk7ViqICwtcopQgyD7TTiNHdcb02mFXpu004GmJ7Ak0');

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    if (localStorage.getItem('userEmail')) {
      dispatch({
        type: 'SET_USER',
        user: localStorage.getItem('userEmail')
      })
    }

  }, [1])
  return (
    <div className="App">
      <Router>
        {/* header */}
        <Header />
        <Routes>
          {/* home */}
          <Route exact path='/' element={<Home />} />
          <Route exact path='/checkout' element={<Checkout />} />
          <Route exact path='/login' element={<LogIn />} />
          <Route exact path='/payment' element={(<Elements stripe={promise}>
            <Payments />
          </Elements>)} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
