import React from 'react'
import {
    Home,
    ShoppingBag,
    Gift,
    Info,
    Mail,
    Truck,
    HelpCircle,
    FileText,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    CreditCard,
    Send
} from 'lucide-react';
import { Link } from 'react-router-dom';
const FooterNavLink = ({ to, icon, children }) => {
    const Icon = icon;
    return (
        <Link
            to={to}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors duration-200 mb-2"
        >
            <Icon size={16} />
            <span>{children}</span>
        </Link>
    );
};

function Footer() {
    return (
        <footer className="bg-gray-100 pt-12 pb-8 border-t border-gray-200">
            <div className="container mx-auto px-4">
                {/* Top section with columns */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* About column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">About Us</h3>
                        <p className="text-gray-600 mb-4">
                            Handcrafted with love and care. Every piece tells a story and brings a unique touch to your home.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors duration-200">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors duration-200">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Shop column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Shop</h3>
                        <ul>
                            <li>
                                <FooterNavLink to="/new-arrivals" icon={ShoppingBag}>
                                    New Arrivals
                                </FooterNavLink>
                            </li>
                            <li>
                                <FooterNavLink to="/best-sellers" icon={ShoppingBag}>
                                    Best Sellers
                                </FooterNavLink>
                            </li>
                            <li>
                                <FooterNavLink to="/home-decor" icon={Home}>
                                    Home Decor
                                </FooterNavLink>
                            </li>
                            <li>
                                <FooterNavLink to="/jewelry" icon={Gift}>
                                    Jewelry
                                </FooterNavLink>
                            </li>
                            <li>
                                <FooterNavLink to="/gifts" icon={Gift}>
                                    Gift Ideas
                                </FooterNavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Customer Service</h3>
                        <ul>
                            <li>
                                <FooterNavLink to="/contact" icon={Mail}>
                                    Contact Us
                                </FooterNavLink>
                            </li>
                            <li>
                                <FooterNavLink to="/shipping" icon={Truck}>
                                    Shipping & Returns
                                </FooterNavLink>
                            </li>
                            <li>
                                <FooterNavLink to="/faq" icon={HelpCircle}>
                                    FAQ
                                </FooterNavLink>
                            </li>
                            <li>
                                <FooterNavLink to="/privacy" icon={FileText}>
                                    Privacy Policy
                                </FooterNavLink>
                            </li>
                            <li>
                                <FooterNavLink to="/terms" icon={FileText}>
                                    Terms & Conditions
                                </FooterNavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Stay Updated</h3>
                        <p className="text-gray-600 mb-4">
                            Subscribe to our newsletter for exclusive offers and updates on new arrivals.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                            />
                            <button
                                type="submit"
                                className="bg-[#bf4221] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <Send size={16} />
                                <span>Subscribe</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom section with payment and copyright */}
                <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <p className="text-gray-500 text-sm">
                                &copy; {new Date().getFullYear()} Utkal Crafts. All rights reserved.
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <span className="text-gray-400">
                                <CreditCard size={32} />
                            </span>
                            <span className="text-gray-400">
                                <CreditCard size={32} />
                            </span>
                            <span className="text-gray-400">
                                <CreditCard size={32} />
                            </span>
                            <span className="text-gray-400">
                                <CreditCard size={32} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
