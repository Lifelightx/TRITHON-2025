import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-xl rounded-xl p-10 max-w-lg w-full text-center border border-gray-200"
      >
        <h2 className="text-4xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-8">We’d love to hear from you! Reach out to us for any inquiries or support.</p>
        
        <div className="space-y-6 text-left">
          <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <Mail className="text-blue-600" size={28} />
            <p className="text-gray-800">jeebanjyotimallik01@gmail.com</p>
          </div>
          <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <Phone className="text-green-600" size={28} />
            <p className="text-gray-800">+91 6371317325</p>
          </div>
          <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <MapPin className="text-red-600" size={28} />
            <p className="text-gray-800">Siadimal, Raj-Nilgiri, Balasore, Odisha</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-[#bf4221] text-white px-8 py-3 rounded-lg shadow-lg hover:bg-[#9d4932] transition"
        >
          Contact Us
        </motion.button>
      </motion.div>
    </div>
  );
}
