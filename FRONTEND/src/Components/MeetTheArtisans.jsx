import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Instagram, Globe, ExternalLink } from 'lucide-react';

import elena from "../assets/elena.jpeg";
import wooden from "../assets/wooden.jpeg";
import cups from "../assets/cups.jpeg";
import metal from "../assets/metal.jpeg";


const MeetTheArtisans = () => {
  const artisans = [
    {
      id: 1,
      name: 'Malati Ketaki',
      craft: 'Textile Weaver',
      location: 'Koraput, Odisha',
      bio: 'Malati creates vibrant textiles using traditional techniques passed down through five generations of her family.',
      imagePlaceholder: elena,
      instagram: '@malatiketaki',
      featured: true
    },
    {
      id: 2,
      name: 'Rohit Muduli',
      craft: 'Wood Carver',
      location: 'Jajpur, Odisha',
      bio: 'Specializing in intricate wooden sculptures that tell stories of Ghanaian folklore and daily life.',
      imagePlaceholder: wooden,
      instagram: '@rohitmuduli',
      featured: false
    },
    {
      id: 3,
      name: 'Amit Marandi',
      craft: 'Ceramic Artist',
      location: 'Sambalpur, Odisha',
      bio: 'Amit blends traditional Japanese pottery techniques with contemporary designs, creating functional art pieces.',
      imagePlaceholder: cups,
      instagram: '@amit_marandi',
      featured: false
    },
    {
      id: 4,
      name: 'Rajiv Majhi',
      craft: 'Metal Smith',
      location: 'Keonjhar, Odisha',
      bio: 'A third-generation metal smith whose intricate brass and copper work celebrates the rich artistic heritage of Rajasthan.',
      imagePlaceholder: metal,
      instagram: '@rajivmetalart',
      featured: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <Globe className="mr-2 text-amber-600" size={24} />
            <h2 className="text-3xl font-bold text-stone-800">Meet The Artisans</h2>
          </motion.div>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Discover the talented creators behind our unique collection and learn about their craft, traditions, and inspiration.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {artisans.map((artisan) => (
            <motion.div
              key={artisan.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                artisan.featured ? 'border-2 border-amber-500' : ''
              }`}
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="h-64 overflow-hidden"
                >
                  <img
                    src={artisan.imagePlaceholder}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {artisan.featured && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                    Featured
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="font-bold text-white text-lg">{artisan.name}</h3>
                  <p className="text-amber-300 text-sm">{artisan.craft}</p>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center text-stone-500 text-sm mb-3">
                  <MapPin size={16} className="mr-1" />
                  <span>{artisan.location}</span>
                </div>
                
                <p className="text-stone-600 text-sm mb-4">{artisan.bio}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-stone-500 text-sm">
                    <Instagram size={16} className="mr-1" />
                    <span>{artisan.instagram}</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-amber-600 font-medium text-sm flex items-center"
                  >
                    View Profile <ExternalLink size={14} className="ml-1" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-600 text-white px-6 py-3 rounded-md font-medium inline-flex items-center"
          >
            Meet More Artisans <ExternalLink size={18} className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetTheArtisans;