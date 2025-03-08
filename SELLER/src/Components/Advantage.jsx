import React from 'react';
import { motion } from 'framer-motion';
import { 
  PaletteIcon,
  GlobeIcon,
  DollarSignIcon,
  HeartHandshakeIcon,
  AwardIcon,
  CheckCircle2Icon
} from 'lucide-react';
import konarkTemple from '../assets/konark.png'
function Advantage() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
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

  const advantages = [
    {
      icon: <PaletteIcon size={40} strokeWidth={1.5} />,
      title: "Showcase Your Craft",
      description: "Amplify your artistic voice and reach a global audience passionate about traditional craftsmanship."
    },
    {
      icon: <GlobeIcon size={40} strokeWidth={1.5} />,
      title: "Global Marketplace",
      description: "Connect with art collectors and enthusiasts who value authentic, handmade creations from Odisha."
    },
    {
      icon: <DollarSignIcon size={40} strokeWidth={1.5} />,
      title: "Fair Compensation",
      description: "Receive just recognition and compensation for your intricate, time-honored craft techniques."
    },
    {
      icon: <HeartHandshakeIcon size={40} strokeWidth={1.5} />,
      title: "Community Support",
      description: "Join a nurturing network dedicated to preserving and celebrating traditional artisan skills."
    }
  ];

  return (
    <div className="bg-[#fffdf4] py-16 px-4">
      <motion.div 
        className="container mx-auto max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#3D405B]"
          variants={fadeInVariants}
        >
          Empowering Artisan Traditions
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Advantages Column */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
          >
            {advantages.map((advantage, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6  border border-gray-200 flex items-start space-x-6 group"
                variants={fadeInVariants}
                
              >
                <div 
                  className="p-3 rounded-lg bg-[#E07A5F]/10 group-hover:bg-[#E07A5F]/20 transition-colors"
                >
                  {React.cloneElement(advantage.icon, { 
                    color: '#E07A5F', 
                    className: 'group-hover:scale-110 transition-transform' 
                  })}
                </div>
                <div>
                  <h3 
                    className="text-xl font-semibold mb-2 text-[#3D405B]"
                  >
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Image Column */}
          <motion.div 
            className="relative"
            variants={fadeInVariants}
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl group">
              <img 
                src={konarkTemple} 
                alt="Konark Temple" 
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-black/60 p-6 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-4 mb-2">
                  <AwardIcon size={28} className="text-[#F2CC8F]" />
                  <span className="text-lg font-semibold">
                    Certified Artisan Platform
                  </span>
                </div>
                <p className="text-gray-200">
                  Every artisan is meticulously verified and celebrated for their unique cultural heritage and exceptional skills.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Additional Benefits */}
        <motion.div 
          className="mt-16 bg-white rounded-2xl p-10 shadow-lg"
          variants={fadeInVariants}
        >
          <h2 
            className="text-3xl font-bold text-center mb-10 text-[#3D405B]"
          >
            Your Journey of Artisan Excellence
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Zero Platform Fees",
              "Worldwide Shipping Support",
              "Professional Marketing",
              "Skill Enhancement Workshops",
              "Cultural Preservation Program",
              "Artisan Networking"
            ].map((benefit, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-4 bg-[#81B29A]/10 p-4 rounded-lg"
                variants={fadeInVariants}
              >
                <CheckCircle2Icon size={24} className="text-[#81B29A]" />
                <span className="text-[#3D405B]">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Advantage;