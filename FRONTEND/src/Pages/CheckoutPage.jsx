import React, { useState } from 'react';
import { CreditCard, Truck, DollarSign, Check, ChevronRight, AlertCircle } from 'lucide-react';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample cart data - this would come from your cart context/state
  const cartItems = [
    {
      id: '1',
      name: 'Handcrafted Ceramic Vase',
      price: 79.99,
      quantity: 1,
      image: '/api/placeholder/80/80'
    },
    {
      id: '2',
      name: 'Traditional Woven Basket',
      price: 45.50,
      quantity: 2,
      image: '/api/placeholder/80/80'
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 12.99;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['fullName', 'phoneNumber', 'email', 'addressLine1', 'city', 'state', 'postalCode', 'country'];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        errors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phoneNumber && !/^\d{10,15}$/.test(formData.phoneNumber.replace(/[^0-9]/g, ''))) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }

    // Payment method validation
    if (!paymentMethod) {
      errors.paymentMethod = 'Please select a payment method';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }

    setIsProcessing(true);

    try {
      // If Stripe is selected, you would normally redirect to Stripe here
      if (paymentMethod === 'stripe') {
        console.log('Processing Stripe payment...');
        // Simulating Stripe redirect
        setTimeout(() => {
          alert('Redirecting to Stripe payment gateway...');
          // window.location.href = '/stripe-payment-url';
        }, 1500);
      } else {
        // For COD, just submit the order
        console.log('Processing Cash on Delivery order...');
        // Simulate API call
        setTimeout(() => {
          alert('Order placed successfully! You will pay on delivery.');
          // Redirect to confirmation page
          // window.location.href = '/order-confirmation';
        }, 1500);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl text-amber-600 font-bold mb-6">Checkout</h1>

      {/* Checkout form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Address Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-600 mb-6">
              <h2 className="text-lg font-semibold flex items-center mb-4">
                <Truck size={20} className="mr-2" />
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your phone number"
                  />
                  {formErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${formErrors.addressLine1 ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Street address, P.O. box"
                  />
                  {formErrors.addressLine1 && <p className="text-red-500 text-xs mt-1">{formErrors.addressLine1}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Apartment, suite, unit, building, floor, etc. (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your city"
                  />
                  {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${formErrors.state ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your state or province"
                  />
                  {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${formErrors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your postal code"
                  />
                  {formErrors.postalCode && <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${formErrors.country ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Country</option>
                    <option value="INDIA">INDIA</option>
                    <option value="NEPAL">NEPAL</option>
                    <option value="BHUTAL">BHUTAN</option>
                    <option value="BANGLADESH">BANGLADESH</option>
                    
                    {/* Add more countries as needed */}
                  </select>
                  {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-600 mb-6">
              <h2 className="text-lg font-semibold flex items-center mb-4">
                <CreditCard size={20} className="mr-2" />
                Payment Method
              </h2>

              {formErrors.paymentMethod && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-md flex items-start">
                  <AlertCircle size={16} className="text-red-500 mr-2 mt-0.5" />
                  <p className="text-red-500 text-sm">{formErrors.paymentMethod}</p>
                </div>
              )}

              <div className="space-y-3">
                {/* Cash on Delivery Option */}
                <div
                  className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-orange-500' : 'border-gray-400'}`}>
                      {paymentMethod === 'cod' && <Check size={12} className="text-orange-500" />}
                    </div>
                    <div className="ml-3 flex items-center">
                      <DollarSign size={20} className="text-gray-600 mr-2" />
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 ml-8">Pay with cash when your order is delivered</p>
                </div>

                {/* Stripe Option */}
                <div
                  className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'stripe' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setPaymentMethod('stripe')}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'stripe' ? 'border-orange-500' : 'border-gray-400'}`}>
                      {paymentMethod === 'stripe' && <Check size={12} className="text-orange-500" />}
                    </div>
                    <div className="ml-3 flex items-center">
                      <CreditCard size={20} className="text-gray-600 mr-2" />
                      <span className="font-medium">Pay with Card</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 ml-8">Secure payment via Stripe</p>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              className="w-full bg-[#db3e13] text-white p-3 rounded-md font-semibold flex items-center justify-center"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Place Order</span>
                  <ChevronRight size={20} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-600 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {/* Cart Items */}
            <div className="mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex py-3 border-b border-gray-100">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-gray-500 text-xs mt-1">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
