import React from 'react';
import { 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon, 
  MailIcon,
  MapPinIcon,
  PhoneIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Artisans', path: '/artisans' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Contact', path: '/contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Shipping Policy', path: '/shipping' }
  ];

  return (
    <footer 
      className="bg-[#f6f6ff] text-gray-700 py-12"
      
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 
              className="text-2xl text-[#ff9d00] font-bold mb-4"
    
            >
              Odisha Crafts
            </h3>
            <p className="text-gray-700 mb-4">
              Preserving traditions, empowering artisans, and connecting cultures through handmade crafts.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="hover:text-[#E07A5F] transition-colors"
              >
                <InstagramIcon size={24} />
              </a>
              <a 
                href="#" 
                className="hover:text-[#E07A5F] transition-colors"
              >
                <FacebookIcon size={24} />
              </a>
              <a 
                href="#" 
                className="hover:text-[#E07A5F] transition-colors"
              >
                <TwitterIcon size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-xl font-semibold mb-4"
              style={{ color: '#F2CC8F' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-700 hover:text-[#E07A5F] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 
              className="text-xl font-semibold mb-4"
              style={{ color: '#F2CC8F' }}
            >
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-700 hover:text-[#E07A5F] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 
              className="text-xl font-semibold mb-4"
              style={{ color: '#F2CC8F' }}
            >
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPinIcon size={20} className="text-[#E07A5F]" />
                <span className="text-gray-700">
                  Bhubaneswar, Odisha, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneIcon size={20} className="text-[#E07A5F]" />
                <span className="text-gray-700">
                  +91 1234 5678 90
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <MailIcon size={20} className="text-[#E07A5F]" />
                <span className="text-gray-700">
                  contact@odishacrafts.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © {currentYear} Odisha Crafts. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;