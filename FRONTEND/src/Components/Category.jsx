import React from "react";
import { motion } from "framer-motion";
import bambooImg from "../assets/bamboo.jpg";
import juteImg from "../assets/Jute.jpg";
import pattachitra from "../assets/pattachitra.jpg";
import pot from "../assets/pot.jpg";
import woodCraft from "../assets/woodCraft.jpg";

const categories = [
  { 
    name: "Pattachitra", 
    image: pattachitra, 
    origin: "Puri, Raghurajpur", 
    desc: "Ancient scroll painting known for intricate detailing." 
  },
  { 
    name: "Silver Filigree", 
    image: juteImg, 
    origin: "Cuttack", 
    desc: "Exquisite silver jewelry and decorative items crafted with precision."
  },
  { 
    name: "Dhokra Art", 
    image: bambooImg, 
    origin: "Mayurbhanj, Dhenkanal", 
    desc: "Metal casting craft famous for tribal motifs and patterns."
  },
  { 
    name: "Applique Work", 
    image: pot, 
    origin: "Pipili", 
    desc: "Colorful fabric patchwork used for decorative hangings."
  },
  { 
    name: "Terracotta", 
    image: woodCraft, 
    origin: "Balasore, Bhadrak", 
    desc: "Clay-based art used to make figurines and pottery."
  },
];

function Category() {
  return (
    <div className="container mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-[#bf4221] mb-8">
        Explore Our <span className="font-sourgummy text-gray-700">Collections</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-b from-[#ffffff] to-[#fde6d9] rounded-xl shadow-lg overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full p-1 h-40 object-cover"
            />

            {/* Content */}
            <div className="p-4 text-center">
              <h3 className="text-xl font-sourgummy font-bold text-[#bf4221]">{category.name}</h3>
              <p className="text-sm text-gray-700">{category.desc}</p>
              <p className="text-xs text-gray-500 mt-1">Origin: {category.origin}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Category;
