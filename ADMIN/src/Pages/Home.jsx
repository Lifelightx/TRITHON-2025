import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Store, 
  ShoppingBag, 
  CreditCard, 
  IndianRupee,
  TrendingUp, 
  Award,
  ChevronRight
} from 'lucide-react';
import { useContext } from 'react';
import { StoreContext } from '../Context';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const {url, token} = useContext(StoreContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(`${url}/api/admin/dashboard`, config);
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </header>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={item} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
                <p className="text-2xl font-semibold text-gray-800">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Store className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Sellers</h2>
                <p className="text-2xl font-semibold text-gray-800">{stats.totalSellers.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Products</h2>
                <p className="text-2xl font-semibold text-gray-800">{stats.totalProducts.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Orders</h2>
                <p className="text-2xl font-semibold text-gray-800">{stats.totalOrders.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={item} className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.recentOrders.map((order) => (
                    <tr key={order._id} className="text-sm">
                      <td className="py-3">{order.user.name}</td>
                      <td className="py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-3">Rs. {order.totalPrice.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {order.isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Revenue</h2>
              <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">This Month</div>
            </div>
            <div className="flex items-center mb-4">
              <IndianRupee className="h-8 w-8 text-green-500 mr-2" />
              <span className="text-3xl font-bold"> {stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Top Rated Products</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {stats.topProducts.map((product) => (
                <div key={product._id} className="border rounded-lg p-4 transition-all hover:shadow-md">
                  <div className="flex justify-center mb-3">
                    <div className="bg-gray-100 rounded-full p-3">
                      <ShoppingBag className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-center mb-1 truncate" title={product.name}>{product.name}</h3>
                  <div className="flex justify-center items-center mb-1">
                    <Award className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm">{product.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({product.numReviews})</span>
                  </div>
                  <p className="text-center text-blue-600 font-semibold">Rs. {product.price}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;