import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Briefcase, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import craftMan from '../assets/craftman.jpg'
const SellerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    businessName: '',
    businessAddress: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className=" overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
        {/* Form Section */}
        <div className="p-8 md:p-12 flex flex-col bg-gray-50 justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Become a Seller
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Join our platform and expand your business reach
          </p>

          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { icon: User, name: 'name', placeholder: 'Full Name', type: 'text' },
                { icon: Mail, name: 'email', placeholder: 'Email', type: 'email' },
                { icon: Lock, name: 'password', placeholder: 'Password', type: 'password' },
                { icon: Phone, name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                { icon: Briefcase, name: 'businessName', placeholder: 'Business Name', type: 'text' },
                { icon: MapPin, name: 'businessAddress', placeholder: 'Business Address', type: 'text' }
              ].map(({ icon: Icon, name, placeholder, type }) => (
                <div key={name} className="relative">
                  <div className="flex items-center border-2 border-gray-300 rounded-lg px-4 py-3 focus-within:border-orange-500 transition-colors">
                    <Icon className="text-gray-500 mr-3" size={20} />
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full outline-none bg-transparent text-gray-700"
                      required
                    />
                </div>
                </div>
              ))}

              <motion.button
                
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-orange-600 cursor-pointer text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors"
              >
                Register Now
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={80} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Registration Successful!
              </h3>
              <p className="text-gray-600 mb-6">
                Your seller account is being processed. We'll contact you soon.
              </p>
            </div>
          )}
        </div>

        {/* Image Section */}
        <div className="hidden md:block bg-[#fff2df]">
          <div className="h-full flex items-center justify-center p-8">
            <img 
              src={craftMan}
              alt="Seller Registration" 
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistration;