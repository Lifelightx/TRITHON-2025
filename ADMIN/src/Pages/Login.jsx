import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, ShoppingBag } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import { useContext } from 'react';
import { StoreContext } from '../Context';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {url, setToken} = useContext(StoreContext)
const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${url}/api/admin/login`, {email:username , password: password})
    .then(res => {
      setToken(res.data.token)
      console.log(res.data)
      localStorage.setItem("adminToken", res.data.token)
      navigate('/home')
    })
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
          <ShoppingBag className="w-12 h-12" style={{ color: "#bf4221" }} />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Admin Portal</h1>
          <p className="mt-2 text-sm text-gray-600">Your Craft Selling Dashboard</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Admin Username"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-[#bf4221] border border-transparent rounded-md shadow-sm hover:bg-[#a3361a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => navigate("/home")}
            >
              Sign in
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <a href="#" className="text-sm  hover:text-indigo-500" style={{ color: "#bf4221" }} > 
            Forgot your password?
          </a>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} Your Craft Store. All rights reserved.
      </div>
    </div>
  );
};

export default Login;