
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  MapPin, 
  Shield, 
  Edit, 
  Camera,
  LogOut,
  CreditCard
} from 'lucide-react';
import { useContext } from 'react';
import { StoreContext } from '../Context';

const Profile = () => {
  const [seller, setSeller] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {url,token} = useContext(StoreContext)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`${url}/api/seller/profile`, config);
        console.log(data)
        setSeller(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
        setLoading(false);
      }
    };


    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-t-4 border-[#bf4221] border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-bold text-red-500">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Format address from object to string
  const formattedAddress = seller?.businessAddress ? 
    `${seller.businessAddress.street || ''}, ${seller.businessAddress.city || ''}, ${seller.businessAddress.state || ''} ${seller.businessAddress.postalCode || ''}, ${seller.businessAddress.country || ''}` : 
    'No address provided';

  // Mask Aadhaar number for privacy
  const maskedAadhaar = seller?.aadhaarNumber ? 
    `XXXX-XXXX-${seller.aadhaarNumber.substring(8, 12)}` : 
    'Not available';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-[#bf4221] to-[#e93605]"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative -mt-16 mb-4 sm:mb-0 sm:mr-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  {seller.profileImage ? (
                    <img 
                      src={seller.profileImage} 
                      alt={`${seller.name}'s profile`}
                      className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                      <User size={48} className="text-gray-400" />
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 p-2 bg-[#bf4221] text-white rounded-full shadow-md hover:bg-[#bf4221] transition-colors">
                    <Camera size={16} />
                  </button>
                </motion.div>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold text-gray-800">{seller.name}</h1>
                <p className="text-gray-600">{seller.businessName}</p>
                <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {seller.role}
                  </span>
                  <span className="px-3 py-1 bg-[#bf4221] text-white text-xs font-medium rounded-full">
                    {seller.isApproved ? 'Approved' : 'Pending Approval'}
                  </span>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 sm:mt-0 px-4 py-2 bg-[#bf4221] text-white rounded-md shadow hover:bg-[#bf4221] transition-colors flex items-center gap-2"
              >
                <Edit size={16} />
                Edit Profile
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6 md:col-span-3"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{seller.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-900">{seller.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Aadhaar Number</p>
                  <p className="font-medium text-gray-900">{maskedAadhaar}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Business Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6 md:col-span-3"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Business Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Briefcase className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Business Name</p>
                  <p className="font-medium text-gray-900">{seller.businessName}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Business Address</p>
                  <p className="font-medium text-gray-900">{formattedAddress}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
};

export default Profile;