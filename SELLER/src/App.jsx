import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Services from './Pages/Services'
import About from './Pages/About'
import SellerRegistration from './Pages/SellerRegistration'
import Login from './Pages/LogIn'
import AddProductForm from './Pages/AddProductForm'

import Profile from './Pages/Profile'
import MyProducts from './Pages/MyProducts'
import { ToastContainer, toast } from 'react-toastify';
  

function App() {
  
  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path='/seller/register' element={<SellerRegistration />} />
        <Route path='/seller/login' element={<Login />} />
        <Route path='/seller/products' element={<MyProducts/>}/>
        <Route path='/seller/dashboard' element={<AddProductForm/>} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
