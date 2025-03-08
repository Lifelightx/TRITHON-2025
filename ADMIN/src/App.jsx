import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import { StoreContext } from './Context'
import ManageSellers from './Components/ManageSeller'
function App() {
  const {token} = useContext(StoreContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/*' element={
          <>
            <Navbar />
            <Routes>
            <Route path='/home' element={token &&<Home />} />
            <Route path='/home/manageSeller' element={<ManageSellers/>} />
            </Routes>
            <Footer/>
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
