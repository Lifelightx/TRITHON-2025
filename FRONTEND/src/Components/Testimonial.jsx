import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

import sarah from "../assets/sarah.jpeg";
import dibya from "../assets/dibya.jpeg";
import aisha from "../assets/aisha.jpeg";
import Abhisek from "../assets/thomas.jpeg";


const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Maharastra, India',
      text: "The quality of craftsmanship is exceptional. I've purchased several items and each one has a special place in my home. Knowing the story behind each piece makes them even more meaningful.",
      rating: 5,
      imagePlaceholder: sarah
    },
    {
      id: 2,
      name: 'Dibya Pattnaik',
      location: 'Delhi, India',
      text: 'I was looking for unique gifts that tell a story and found exactly what I needed. The customer service was incredible, and they helped me find the perfect pieces for my family.',
      rating: 5,
      imagePlaceholder: dibya
    },
    {
      id: 3,
      name: 'Aisha Patel',
      location: 'Bhopal, India',
      text: "As someone who appreciates traditional craftsmanship, I'm thrilled to have found this marketplace. The ceramics I purchased are not only beautiful but functional works of art.",
      rating: 4,
      imagePlaceholder: aisha
    },
    {
      id: 4,
      name: 'Abhisek Malhan',
      location: 'Hyderabad, India',
      text: 'The shipping was fast and the packaging was thoughtful and eco-friendly. The wooden sculptures exceeded my expectations in terms of detail and finish. Highly recommend!',
      rating: 5,
      imagePlaceholder: Abhisek
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const variants = {
    enter: (direction) => ({
      x: direction === 'left' ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction === 'left' ? -300 : 300,
      opacity: 0
    })
  };

  // Fixed pagination function - now direction matches the expected movement
  const paginate = (newDirection) => {
    setDirection(newDirection);
    
    if (newDirection === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate('right'); // Auto-advance to the next testimonial
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-amber-50">
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
            <Quote className="mr-2 text-amber-600" size={24} />
            <h2 className="text-3xl font-bold text-stone-800">Customer Stories</h2>
          </motion.div>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Discover what our community has to say about their experience with our artisan products.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white rounded-lg shadow-lg p-8 md:p-12"
            >
              <div className="mb-6 text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full border-4 border-amber-200"
                >
                  <img
                    src={testimonials[currentIndex].imagePlaceholder}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < testimonials[currentIndex].rating
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-center italic text-stone-600 text-lg mb-6">
                "{testimonials[currentIndex].text}"
              </blockquote>

              <div className="text-center">
                <h4 className="font-bold text-stone-800">{testimonials[currentIndex].name}</h4>
                <p className="text-stone-500 text-sm">{testimonials[currentIndex].location}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center z-10"
            onClick={() => paginate('left')}
          >
            <ChevronLeft className="text-amber-600" size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center z-10"
            onClick={() => paginate('right')}
          >
            <ChevronRight className="text-amber-600" size={24} />
          </motion.button>

          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? 'bg-amber-600' : 'bg-amber-200'
                }`}
                onClick={() => {
                  // Fixed direction logic for dot navigation
                  const newDirection = index > currentIndex ? 'right' : 'left';
                  setDirection(newDirection);
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;