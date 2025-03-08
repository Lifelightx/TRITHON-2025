import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Instagram, Facebook, Twitter } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-amber-600 relative overflow-hidden">
      {/* Background pattern elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-white"></div>
        <div className="absolute top-40 right-40 w-20 h-20 rounded-full bg-white"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center mb-4"
              >
                <Mail className="mr-2 text-white" size={24} />
                <h2 className="text-3xl font-bold text-white">Stay Connected</h2>
              </motion.div>
              
              <p className="text-amber-100 mb-6">
                Join our community to receive updates about new artisan collections, behind-the-scenes stories, and exclusive offers.
              </p>
              
              <div className="mb-8">
                <motion.form 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex"
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow p-3 rounded-l-md focus:outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-stone-800 text-white p-3 rounded-r-md flex items-center"
                  >
                    Subscribe <Send size={18} className="ml-2" />
                  </motion.button>
                </motion.form>
                <p className="text-amber-100 text-xs mt-2">
                  We respect your privacy and will never share your information.
                </p>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="text-white mb-2 font-medium">Follow our journey</p>
                <div className="flex space-x-4">
                  <motion.a 
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    href="#" 
                    className="text-white hover:text-amber-200"
                  >
                    <Instagram size={24} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    href="#" 
                    className="text-white hover:text-amber-200"
                  >
                    <Facebook size={24} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    href="#" 
                    className="text-white hover:text-amber-200"
                  >
                    <Twitter size={24} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-stone-800 mb-4">Get 10% Off Your First Order</h3>
              <p className="text-stone-600 mb-6">
                Sign up for our newsletter and receive a welcome discount code to begin your artisan collection journey.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
                className="space-y-4"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <label htmlFor="fullname" className="block text-sm font-medium text-stone-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    className="w-full p-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="John Doe"
                  />
                </motion.div>
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="john@example.com"
                  />
                </motion.div>
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <label htmlFor="interests" className="block text-sm font-medium text-stone-700 mb-1">
                    Interests
                  </label>
                  <select
                    id="interests"
                    className="w-full p-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select your interests</option>
                    <option value="ceramics">Ceramics</option>
                    <option value="textiles">Textiles</option>
                    <option value="woodwork">Woodwork</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="all">All Artisan Crafts</option>
                  </select>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-amber-600 text-white py-3 rounded-md font-medium"
                >
                  Claim Your 10% Discount
                </motion.button>
                
                <p className="text-stone-500 text-xs text-center">
                  By signing up, you agree to our Privacy Policy and Terms of Service.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;