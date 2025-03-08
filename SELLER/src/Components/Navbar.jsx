import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  LogIn, 
  UserPlus, 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Layers, 
  MessageCircle, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { StoreContext } from '../Context';

const Navbar = () => {
  const navItemVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };
  const navigate = useNavigate()
  const {token, setToken} = useContext(StoreContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('sellerToken')
    setToken("")
    navigate('/')
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#ffffff] text-[#211202] sticky top-0 z-50 py-4 px-4 md:px-8 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          whileHover="hover"
          whileTap="tap"
          variants={navItemVariants}
          className="flex items-center"
        >
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-bold flex items-center space-x-2"
          >
            <Home className="mr-2" />
            Seller Platform
          </Link>
        </motion.div>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <motion.button
            onClick={toggleMobileMenu}
            whileHover="hover"
            whileTap="tap"
            variants={navItemVariants}
            className="text-[#260e02] hover:text-[#d78500] transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
        
        {/* Desktop Navigation */}
        {!token ? (
          <div className="hidden md:flex space-x-8">
            <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
              <Link to="/" className="flex items-center text-[#260e02] hover:text-[#d78500] transition">
                <Home className="mr-1" /> Home
              </Link>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
              <Link to="/seller/login" className="flex items-center text-[#260e02] hover:text-[#d78500] transition">
                <LogIn className="mr-1" /> Login
              </Link>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
              <Link to="/seller/register" className="flex items-center text-[#260e02] hover:text-[#d78500] transition">
                <UserPlus className="mr-1" /> Register
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="hidden md:flex space-x-4 items-center">
            <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
              <Link to="/seller/dashboard" className="flex items-center text-[#260e02] hover:text-[#dc7600] transition">
                <LayoutDashboard className="mr-1" /> Dashboard
              </Link>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
              <Link to="/seller/products" className="flex items-center text-[#260e02] hover:text-[#dc7600] transition">
                <Package className="mr-1" /> Products
              </Link>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
              <Link to="/seller/orders" className="flex items-center text-[#260e02] hover:text-[#dc7600] transition">
                <ShoppingCart className="mr-1" /> Orders
              </Link>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
              <Link to="/seller/earnings" className="flex items-center text-[#260e02] hover:text-[#dc7600] transition">
                <DollarSign className="mr-1" /> Earnings
              </Link>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
              <Link to="/seller/stock" className="flex items-center text-[#260e02] hover:text-[#dc7600] transition">
                <Layers className="mr-1" /> Stock
              </Link>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
              <Link to="/seller/chat" className="flex items-center text-[#260e02] hover:text-[#dc7600] transition">
                <MessageCircle className="mr-1" /> Chat
              </Link>
            </motion.div>
            
            <motion.button 
              onClick={handleLogout}
              whileHover="hover"
              whileTap="tap"
              variants={navItemVariants}
              className="flex items-center text-[#ff5e00] cursor-pointer bg-orange-50 px-3 py-1.5 rounded hover:text-[#ff0000] transition"
            >
              <LogOut className="mr-1" /> Logout
            </motion.button>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-6"
          >
            {!token ? (
              <div className="flex flex-col space-y-6">
                <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                  <Link 
                    to="/" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-[#260e02] hover:text-[#d78500] transition text-xl"
                  >
                    <Home className="mr-3" /> Home
                  </Link>
                </motion.div>
                
                <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                  <Link 
                    to="/seller/login" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-[#260e02] hover:text-[#d78500] transition text-xl"
                  >
                    <LogIn className="mr-3" /> Login
                  </Link>
                </motion.div>
                
                <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                  <Link 
                    to="/seller/register" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-[#260e02] hover:text-[#d78500] transition text-xl"
                  >
                    <UserPlus className="mr-3" /> Register
                  </Link>
                </motion.div>
              </div>
            ) : (
              <div className="flex flex-col space-y-6">
                <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                  <Link 
                    to="/seller/dashboard" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-[#260e02] hover:text-[#dc7600] transition text-xl"
                  >
                    <LayoutDashboard className="mr-3" /> Dashboard
                  </Link>
                </motion.div>
                
                <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                  <Link 
                    to="/seller/products" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-[#260e02] hover:text-[#dc7600] transition text-xl"
                  >
                    <Package className="mr-3" /> Products
                  </Link>
                </motion.div>
                
                <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                  <Link 
                    to="/seller/orders" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-[#260e02] hover:text-[#dc7600] transition text-xl"
                  >
                    <ShoppingCart className="mr-3" /> Orders
                  </Link>
                </motion.div>
                
                <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                  <Link 
                    to="/seller/earnings" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-[#260e02] hover:text-[#dc7600] transition text-xl"
                  >
                    <DollarSign className="mr-3" /> Earnings
                  </Link>
                </motion.div>
                
                <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                  <Link 
                    to="/seller/stock" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-[#260e02] hover:text-[#dc7600] transition text-xl"
                  >
                    <Layers className="mr-3" /> Stock
                  </Link>
                </motion.div>
                
                <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                  <Link 
                    to="/seller/chat" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-[#260e02] hover:text-[#dc7600] transition text-xl"
                  >
                    <MessageCircle className="mr-3" /> Chat
                  </Link>
                </motion.div>
                
                <motion.button 
                  onClick={handleLogout}
                  whileHover="hover"
                  whileTap="tap"
                  variants={navItemVariants}
                  className="flex items-center text-[#ff5e00] cursor-pointer bg-orange-50 px-4 py-2 rounded hover:text-[#ff0000] transition text-xl self-start"
                >
                  <LogOut className="mr-3" /> Logout
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;