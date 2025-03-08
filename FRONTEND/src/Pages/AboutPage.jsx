import { motion } from "framer-motion";
import { Image, ShoppingBag, Hand, Heart } from "lucide-react";

import handcraft1 from "../assets/handcraft1.jpeg"
import handcraft2 from "../assets/handcraft2.jpeg"

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto p-6"
    >
      <motion.h1
        className="text-4xl font-bold text-center text-orange-700"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        About Handcraft of Odisha
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 text-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Celebrating Odisha's rich tradition of handcrafted art, connecting artisans
        with the world.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <motion.div
          className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Hand size={48} className="text-orange-600" />
          <h2 className="text-2xl font-semibold mt-4">Handmade with Love</h2>
          <p className="text-gray-600 mt-2">
            Every product is crafted by skilled artisans, preserving Odisha's
            cultural heritage.
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center"
          whileHover={{ scale: 1.05 }}
        >
          <ShoppingBag size={48} className="text-green-600" />
          <h2 className="text-2xl font-semibold mt-4">Shop Unique Art</h2>
          <p className="text-gray-600 mt-2">
            Discover exclusive handcrafted items, each telling a unique story of
            tradition and skill.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <img
          src={handcraft1}
          alt="Handicraft 1"
          className="w-64 h-64 rounded-xl shadow-lg"
        />
        <img
          src={handcraft2}
          alt="Handicraft 2"
          className="w-64 h-64 rounded-xl shadow-lg"
        />
      </motion.div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Heart size={32} className="text-red-600 mx-auto" />
        <p className="text-lg text-gray-700 mt-4">
          Supporting local artisans and promoting Odisha's artistic excellence
          worldwide.
        </p>
      </motion.div>
    </motion.div>
  );
}
