import React, { useContext, useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { StoreContext } from '../Context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const { url, setToken } = useContext(StoreContext);

  // Check if all fields are filled
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return alert("Please fill in all fields.");

    try {
      const res = await axios.post(`${url}/api/seller/login`, formData);
      setToken(res.data.token);
      localStorage.setItem('sellerToken', res.data.token);
      navigate('/seller/profile'); // Redirect only on successful login
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left Section - Illustration */}
        <div className="hidden md:flex bg-[#E9E5E0] items-center justify-center p-12">
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Palette size={200} className="text-[#8B4513] opacity-70" />
            <h3 className="text-2xl font-bold text-[#6B4423] text-center mt-4">
              Crafted with Passion
            </h3>
            <p className="text-center text-[#8B4513] opacity-70">
              Discover unique handmade treasures
            </p>
          </motion.div>
        </div>

        {/* Right Section - Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h2 className="text-3xl font-bold text-[#4A4A4A] text-center mb-4">
              Welcome Back
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div className="relative">
                <div className="flex items-center border-2 border-gray-300 rounded-lg px-4 py-3">
                  <Mail className="text-gray-500 mr-3" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    required
                  />
                </div>
              </motion.div>

              <motion.div className="relative">
                <div className="flex items-center border-2 border-gray-300 rounded-lg px-4 py-3">
                  <Lock className="text-gray-500 mr-3" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    required
                  />
                </div>
              </motion.div>

              <motion.div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="mr-2 accent-[#8B4613]" required />
                  <label htmlFor="remember" className="text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-[#8B4613] hover:underline">
                  Forgot Password?
                </a>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`w-full py-3 rounded-lg font-bold transition-colors flex items-center justify-center
                  ${isFormValid ? "bg-[#8B4613] text-white hover:bg-[#6B3E23]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                disabled={!isFormValid}
              >
                Login
                <ArrowRight className="ml-2" size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
