import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Award, Heart } from 'lucide-react';

import artistAtWork from "../assets/artistAtWork.jpeg";

const AboutUs = () => {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-amber-600" />,
      title: 'Global Sourcing',
      description: 'We collaborate with artisans from over 40 countries, bringing diverse cultural traditions to your doorstep.'
    },
    {
      icon: <Award className="h-8 w-8 text-amber-600" />,
      title: 'Quality Craftsmanship',
      description: 'Each item in our collection meets rigorous quality standards, ensuring exceptional artistry and durability.'
    },
    {
      icon: <Heart className="h-8 w-8 text-amber-600" />,
      title: 'Sustainable Practices',
      description: 'We prioritize eco-friendly materials and production methods that respect both people and planet.'
    },
    {
      icon: <Users className="h-8 w-8 text-amber-600" />,
      title: 'Community Support',
      description: 'A portion of every purchase goes directly to supporting artisan communities and preserving traditional crafts.'
    }
  ];

  return (
    <section className="py-16 bg-stone-100">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <Users className="mr-2 text-amber-600" size={24} />
            <h2 className="text-3xl font-bold text-stone-800">Our Story</h2>
          </motion.div>
          <p className="text-stone-600 mb-6">
            Founded in 2015, our mission is to connect discerning customers with exceptional artisans from around the world.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-20 ">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img 
              src = {artistAtWork}
              alt="Artisans at work" 
              className="rounded-2xl shadow-lg w-90 h-auto ml-40"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-stone-800 mb-4">Preserving Heritage Through Craft</h3>
            <p className="text-stone-600 mb-4">
              We believe that handcrafted goods tell stories that mass-produced items cannot. Each piece in our collection carries the cultural heritage and personal touch of its maker.
            </p>
            <p className="text-stone-600 mb-6">
              By creating a marketplace for these unique creations, we're helping to preserve traditional crafts that might otherwise be lost to industrialization, while providing sustainable livelihoods for skilled artisans.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-600 text-white px-6 py-3 rounded-md font-medium"
            >
              Learn More About Our Mission
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="mx-auto mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-lg font-bold text-stone-800 mb-2">{feature.title}</h3>
              <p className="text-stone-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;