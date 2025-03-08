import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import About from './Pages/AboutPage';
import CartPage from './Pages/CartPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import CheckoutPage from './Pages/CheckoutPage';
import Products from './Pages/Products';
import { ToastContainer } from 'react-toastify';
import Profile from './Pages/Profile'
function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/details/:id' element={<ProductDetailsPage/>} />
        <Route path='/checkout' element={<CheckoutPage/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
