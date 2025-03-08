import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bambooImg from '../assets/bamboo.png';

const Hero = () => {
  const navigate = useNavigate();

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div 
      className="relative min-h-screen w-full bg-[#ffffff] bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundBlendMode: 'multiply'
      }}
    >
      <motion.div
        className="text-center max-w-4xl px-4 z-20 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl text-[#391300] font-caesar-dressing font-bold mb-4 md:mb-6"
          variants={textVariants}
        >
          Crafting Traditions of Odisha
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl font-sourgummy mb-6 md:mb-8"
          style={{ color: '#E07A5F' }}
          variants={textVariants}
        >
          Discover the Timeless Art of Handmade Craftsmanship
        </motion.p>

        <motion.div
          variants={textVariants}
        >
          <button
            onClick={() => navigate('/seller/register')}
            className="px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-gray-100 cursor-pointer bg-[#ff5e00] rounded-lg hover:bg-[#ff4500] transition-colors duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 inline-block" size={20} />
          </button>
        </motion.div>
      </motion.div>

      {/* Bamboo Images */}
      <img 
        src={bambooImg}
        className='absolute right-0 bottom-0 h-1/2 md:h-3/4 lg:h-full w-auto opacity-70 md:opacity-100'
        style={{
          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))',
        }}
        alt="Bamboo decoration" 
      />
      
    </div>
  );
};

export default Hero;