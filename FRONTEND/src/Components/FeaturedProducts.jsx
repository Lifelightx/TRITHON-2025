import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Star } from 'lucide-react';

import ceramic from "../assets/ceramic.jpg";
import basket from "../assets/basket.jpeg";
import scarf from "../assets/scarf.jpeg";
import bowl from "../assets/bowl.jpeg";
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Handcrafted Ceramic Vase',
      price: 799,
      rating: 4.8,
      imagePlaceholder: ceramic,
      description: 'Unique ceramic vase with traditional patterns'
    },
    {
      id: 2,
      name: 'Woven Jute Basket',
      price: 499,
      rating: 4.7,
      imagePlaceholder:basket,
      description: 'Sustainable and stylish storage basket'
    },
    {
      id: 3,
      name: 'Hand-painted Silk Scarf',
      price: 650,
      rating: 4.9,
      imagePlaceholder: scarf,
      description: 'Elegant scarf with artisan patterns'
    },
    {
      id: 4,
      name: 'Carved Wooden Bowl',
      price: 385,
      rating: 4.6,
      imagePlaceholder: bowl,
      description: 'Natural wooden bowl with intricate detailing'
    }
  ];
  const navigate = useNavigate()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-16 bg-[#fcf1ee]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <ShoppingBag className="mr-2 text-amber-600" size={24} />
            <h2 className="text-3xl font-bold text-stone-800">Featured Products</h2>
          </motion.div>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Discover our handpicked collection of extraordinary artisan crafts, each piece telling a unique story of tradition and craftsmanship.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-64 overflow-hidden"
              >
                <img
                  src={product.imagePlaceholder}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-[rgba(0,0,0,0.1)] flex items-center justify-center"
                >
                  {/* <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-amber-600 px-4 py-2 rounded-full font-medium flex items-center"
                  >
                    Quick View <ChevronRight size={16} />
                  </motion.button> */}
                </motion.div>
              </motion.div>
              <div className="p-5">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-stone-500 ml-1">({product.rating})</span>
                </div>
                <h3 className="font-bold text-lg text-stone-800 mb-1">{product.name}</h3>
                <p className="text-stone-600 text-sm mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-600">Rs.{product.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-amber-600 text-white p-2 rounded-full"
                  >
                    <ShoppingBag size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=> navigate("/products")}
            className="bg-amber-600 text-white px-6 py-3 rounded-md font-medium inline-flex items-center"
          >
            View All Products <ChevronRight size={18} className="ml-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;