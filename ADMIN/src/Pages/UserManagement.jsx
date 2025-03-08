import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Mail, 
  Phone, 
  Clock, 
  User, 
  Check, 
  X
} from 'lucide-react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (pageNumber) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/users?pageNumber=${pageNumber}`);
      setUsers(data.users);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you would call an API endpoint with the search term
    // For now, we'll just log it
    console.log(`Searching for: ${searchTerm}`);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <Users className="mr-2" />
          User Management
        </h1>
        
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            className="py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <Search size={18} />
          </button>
        </form>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Users size={40} className="text-blue-500" />
          </motion.div>
        </div>
      ) : error ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        >
          {error}
        </motion.div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="md:w-2/3 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {users.map((user) => (
                      <motion.tr 
                        key={user._id}
                        variants={itemVariants}
                        exit={{ opacity: 0, y: -10 }}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleUserSelect(user)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              {user.profileImage ? (
                                <img className="h-10 w-10 rounded-full" src={user.profileImage} alt="" />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                  <User className="h-6 w-6 text-blue-500" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone size={14} className="mr-1" />
                            {user.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.isActive ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              <Check size={12} className="mr-1" /> Active
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              <X size={12} className="mr-1" /> Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-700 hover:bg-blue-50'
                  } border border-gray-300`}
                >
                  <ChevronLeft size={16} />
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page + 1}
                    onClick={() => handlePageChange(page + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-blue-50'
                    } border border-gray-300`}
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-blue-50'
                  } border border-gray-300`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {selectedUser ? (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">User Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-center mb-6">
                    {selectedUser.profileImage ? (
                      <img 
                        className="h-24 w-24 rounded-full border-4 border-blue-100" 
                        src={selectedUser.profileImage} 
                        alt="" 
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-50">
                        <User className="h-12 w-12 text-blue-500" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p className="text-base">{selectedUser.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center">
                      <Mail className="mr-1" size={14} /> Email
                    </h3>
                    <p className="text-base">{selectedUser.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center">
                      <Phone className="mr-1" size={14} /> Phone
                    </h3>
                    <p className="text-base">{selectedUser.phone}</p>
                  </div>
                  
                  {selectedUser.addresses && selectedUser.addresses.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Default Address</h3>
                      {selectedUser.addresses
                        .filter(addr => addr.isDefault)
                        .map((address, index) => (
                          <div key={index} className="text-base">
                            <p>{address.street}</p>
                            <p>{address.city}, {address.state} {address.postalCode}</p>
                            <p>{address.country}</p>
                          </div>
                        ))}
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center">
                      <Clock className="mr-1" size={14} /> Account Created
                    </h3>
                    <p className="text-base">
                      {new Date(selectedUser.createdAt).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200">
                      Edit User
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Users size={40} className="mx-auto mb-4 opacity-30" />
                  <p>Select a user to view details</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;