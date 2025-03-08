import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import About from './Pages/About'
import SellerRegistration from './Pages/SellerRegistration'
import Login from './Pages/LogIn'
import AddProductForm from './Pages/AddProductForm'
import Profile from './Pages/Profile'
function App() {
  
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/seller/register' element={<SellerRegistration />} />
        <Route path='/seller/profile' element={<Profile/>} />
        <Route path='/seller/login' element={<Login />} />
        <Route path='/seller/dashboard' element={<AddProductForm/>} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
