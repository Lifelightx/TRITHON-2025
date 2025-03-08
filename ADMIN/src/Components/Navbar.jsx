import React, { useState } from 'react';
import { Menu, X, Users, Store, ShoppingBag, FileText, BarChart2, Tag, MessageSquare, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };
  
  const navItems = [
    { name: 'Analytics Dashboard', icon: <BarChart2 className="w-5 h-5" />, path: '/home'},
    { name: 'Manage Users', icon: <Users className="w-5 h-5" />, path: '/admin/users' },
    { name: 'Manage Sellers', icon: <Store className="w-5 h-5" />, path: '/admin/sellers' },
    { name: 'Approve Products', icon: <ShoppingBag className="w-5 h-5" />, path: '/admin/products' },
    { name: 'Manage Categories', icon: <Tag className="w-5 h-5" />, path: '/admin/categories' },
    { name: 'Review Complaints', icon: <MessageSquare className="w-5 h-5" />, path: '/admin/complaints' }
    
  ];
  
  return (
    <div className="bg-gray-800 text-white">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 font-bold text-xl">
              <Link to="/admin" className="flex items-center">
                Admin Panel
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center space-x-1"
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center space-x-1 text-red-400 hover:text-red-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="ml-2">Logout</span>
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className=" px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 flex items-center space-x-2 text-red-400 hover:text-red-300"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-2">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
