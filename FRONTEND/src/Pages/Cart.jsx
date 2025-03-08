import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, MinusCircle, PlusCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useState({
        items: [
          {
            product: {
              _id: "p1",
              name: "Handcrafted Wooden Bowl",
              price: 25.99,
              images: ["/images/wooden-bowl.jpg"],
              craftType: "Woodwork",
              region: "Odisha",
              description: "A beautifully handcrafted wooden bowl made by skilled artisans."
            },
            quantity: 2
          },
          {
            product: {
              _id: "p2",
              name: "Terracotta Vase",
              price: 18.5,
              images: ["/images/terracotta-vase.jpg"],
              craftType: "Pottery",
              region: "West Bengal",
              description: "An elegant terracotta vase perfect for home decor."
            },
            quantity: 1
          },
          {
            product: {
              _id: "p3",
              name: "Handwoven Cotton Scarf",
              price: 12.75,
              images: ["/images/cotton-scarf.jpg"],
              craftType: "Weaving",
              region: "Rajasthan",
              description: "A soft, handwoven cotton scarf with intricate designs."
            },
            quantity: 3
          }
        ]
      });
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    // Calculate total price whenever cart items change
    calculateTotal();
  }, [cart.items]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      // Assuming you have an API endpoint to fetch the current user's cart
      const response = await axios.get('/api/cart');
      
      // If we get a response but no cart or empty cart, we just show empty state
    //   setCart( { items: [] });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart:', err);
      // Instead of showing error for no data, we show empty cart
      setCart({ items: [] });
      // Only set error if it's not a 404 (no cart found)
      if (err.response && err.response.status !== 404) {
        setError('Failed to fetch your cart. Please try again.');
      }
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const total = cart.items.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const updateItemQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await axios.put(`/api/cart/items/${itemId}`, { quantity: newQuantity });
      
      // Update local state without fetching the entire cart again
      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.map(item => 
          item.product._id === itemId 
            ? { ...item, quantity: newQuantity } 
            : item
        )
      }));
    } catch (err) {
      setError('Failed to update quantity. Please try again.');
      console.error('Error updating quantity:', err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`/api/cart/items/${itemId}`);
      
      // Update local state
      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.filter(item => item.product._id !== itemId)
      }));
    } catch (err) {
      setError('Failed to remove item. Please try again.');
      console.error('Error removing item:', err);
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page or initiate checkout process
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // Render empty cart state when no items are in the cart
  const renderEmptyCart = () => (
    <div className="bg-amber-50 rounded-lg p-8 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ShoppingBag className="text-amber-400 mx-auto mb-4" size={64} />
        <h2 className="text-xl font-medium text-stone-700 mb-2">Your cart is empty</h2>
        <p className="text-stone-500 mb-6">Discover unique artisan crafts to add to your collection</p>
        <a href="/products" className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors">
          Browse Products
        </a>
      </motion.div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <ShoppingBag className="text-amber-600 mr-3" size={28} />
          <h1 className="text-3xl font-bold text-stone-800">Your Cart</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="text-red-500 mr-2" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!cart.items || cart.items.length === 0 ? (
          renderEmptyCart()
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-amber-50 border-b border-amber-100">
                  <h2 className="font-medium text-stone-800">Cart Items ({cart.items.length})</h2>
                </div>
                <ul className="divide-y divide-gray-100">
                  {cart.items.map((item) => (
                    <motion.li
                      key={item.product._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-24 h-24 sm:h-auto mb-4 sm:mb-0 flex-shrink-0">
                          <img
                            src={item.product.images[0] || '/api/placeholder/100/100'}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-grow sm:ml-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-stone-800">{item.product.name}</h3>
                              <p className="text-sm text-stone-500 mb-2">
                                Craft: {item.product.craftType} | Region: {item.product.region}
                              </p>
                              <p className="text-amber-600 font-medium">₹{item.product.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center mt-4 sm:mt-0">
                              <button
                                onClick={() => updateItemQuantity(item.product._id, item.quantity - 1)}
                                className="text-stone-400 hover:text-amber-600 transition-colors"
                              >
                                <MinusCircle size={20} />
                              </button>
                              <span className="mx-3 w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateItemQuantity(item.product._id, item.quantity + 1)}
                                className="text-stone-400 hover:text-amber-600 transition-colors"
                              >
                                <PlusCircle size={20} />
                              </button>
                              <button
                                onClick={() => removeItem(item.product._id)}
                                className="ml-6 text-stone-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-stone-600 line-clamp-2">{item.product.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-stone-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-stone-200 pt-4 mb-6">
                  <div className="flex justify-between font-bold">
                    <span className="text-stone-800">Total</span>
                    <span className="text-amber-600">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  Proceed to Checkout
                </motion.button>
                
                <p className="text-xs text-center text-stone-500 mt-4">
                  Shipping and taxes will be calculated during checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartPage;