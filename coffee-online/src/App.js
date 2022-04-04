import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './default.scss'
import { ShoppingProvider } from './components/ShoppingContext/ShoopingContext'
import Header from './components/Header/index'
import Shelf from './components/Shelf/index'
import ShoppingCart from './components/ShoppingCart/index'
import CheckoutForm from './components/CheckoutForm/index'
import RegisterForm from './components/RegisterForm/index'
import Coupons from './components/Coupons/index'
// import Footer from './components/Footer/index'

function App() {
  return (
    <>
      <ShoppingProvider>
        <Router>
          <Header />
          <ShoppingCart />
          <Routes>
            <Route exact path='/' element={<Shelf/>} />
            <Route exact path='/checkout' element={<CheckoutForm/>} />
            <Route exact path='/register' element={<RegisterForm/>} />
          </Routes>
          <Coupons />
        </Router>
      </ShoppingProvider>
   
    </>
  );
}

export default App;