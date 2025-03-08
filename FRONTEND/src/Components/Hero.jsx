import React from 'react'
import potterImg from "../assets/potterImgv.jpg";
import { motion } from 'framer-motion';
function Hero() {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side - Text content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-[Montserrat] leading-tight">
          Every<span className="text-[#bf4221] font-sourgummy"> Thread</span> Tells a <span className="text-[#bf4221] font-sourgummy"> Story</span>,
            <br />
            Every<span className="text-[#8b5d3b] font-sourgummy"> Craft</span> Builds a <span className="text-[#8b5d3b] font-sourgummy">Dream</span>
          </h1>

          <h2 className="text-lg md:text-xl font-semibold text-[#594d46] font-[Montserrat]">
            Bringing Rural Odisha's Heart to Your Hands
          </h2>

          <div className="pt-4">
            <button className="px-6 py-3 bg-[#bf4221] text-white rounded-lg hover:bg-[#a3361a] transition-colors duration-200 font-medium shadow-md">
              Explore Our Collection
            </button>
            <button className="ml-4 px-6 py-3 border-2 border-[#bf4221] text-[#bf4221] rounded-lg hover:bg-[#bf4221]/10 transition-colors duration-200 font-medium">
              Our Story
            </button>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="w-full md:w-1/3">
          <div className="relative">
            {/* Main image */}
            <img
              src={potterImg}
              alt="Odisha Potter Crafting"
              className="w-full rounded-lg shadow-sm"
            />

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 border-4 border-[#bf4221] rounded-lg opacity-20 -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-[#8b5d3b] rounded-lg opacity-20 -z-10"></div>

            {/* Floating badges with animation */}
            <motion.div
              className="absolute -top-3 -left-3 bg-white px-4 py-2 rounded-full shadow-md"
              animate={{ x: [0, 10, 0] }} // Moves right and back
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <motion.span className="text-[#bf4221] font-medium">Authentic</motion.span>
            </motion.div>

            <motion.div
              className="absolute -bottom-3 -right-3 bg-white px-4 py-2 rounded-full shadow-md"
              animate={{ x: [0, -10, 0] }} // Moves left and back
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <motion.span className="text-[#8b5d3b] font-medium">Handmade</motion.span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
