import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, ShoppingCart } from 'lucide-react';

const PricingPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const frameId = queryParams.get('frame');
  
  const [selectedFrame, setSelectedFrame] = useState<number | null>(frameId ? parseInt(frameId) : null);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // All available frames
  const frames = [
    {
      id: 101,
      name: "Sleek Black Frame",
      category: "Modern",
      image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      prices: {
        small: 24.99,
        medium: 34.99,
        large: 44.99
      }
    },
    {
      id: 102,
      name: "Geometric Metal Frame",
      category: "Modern",
      image: "https://images.unsplash.com/photo-1579541591970-e5a7e3a79a0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      prices: {
        small: 29.99,
        medium: 39.99,
        large: 49.99
      }
    },
    {
      id: 201,
      name: "Traditional Wooden Frame",
      category: "Classic",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      prices: {
        small: 19.99,
        medium: 29.99,
        large: 39.99
      }
    },
    {
      id: 301,
      name: "Antique Gold Frame",
      category: "Vintage",
      image: "https://images.unsplash.com/photo-1594731804993-b6ce6db43a3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      prices: {
        small: 34.99,
        medium: 44.99,
        large: 54.99
      }
    }
  ];

  // Find the selected frame data
  const selectedFrameData = frames.find(frame => frame.id === selectedFrame) || frames[0];

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Order submitted:', {
      frame: selectedFrameData,
      size: selectedSize,
      quantity,
      customer: formData
    });
    setFormSubmitted(true);
  };

  // Calculate total price
  const calculateTotal = () => {
    return (selectedFrameData.prices[selectedSize as keyof typeof selectedFrameData.prices] * quantity).toFixed(2);
  };

  // Reset form when frame changes
  useEffect(() => {
    setShowForm(false);
    setFormSubmitted(false);
  }, [selectedFrame]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-4">Pricing & Purchase</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Select your preferred frame, choose the size, and place your order for cash-on-delivery.
        </p>

        {!formSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Frame Selection */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Select a Frame</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {frames.map((frame) => (
                      <div 
                        key={frame.id}
                        className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                          selectedFrame === frame.id ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'
                        }`}
                        onClick={() => setSelectedFrame(frame.id)}
                      >
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={frame.image} 
                            alt={frame.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold">{frame.name}</h3>
                          <p className="text-sm text-gray-500">{frame.category}</p>
                          <div className="mt-2 text-indigo-600 font-medium">
                            From ${frame.prices.small.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Size and Quantity Selection */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Choose Size & Quantity</h2>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Frame Size</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['small', 'medium', 'large'].map((size) => (
                        <div 
                          key={size}
                          className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                            selectedSize === size ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          <div className="font-medium capitalize">{size}</div>
                          <div className="text-sm text-gray-500">
                            {size === 'small' ? '5" x 7"' : size === 'medium' ? '8" x 10"' : '11" x 14"'}
                          </div>
                          <div className="mt-2 text-indigo-600 font-medium">
                            ${selectedFrameData.prices[size as keyof typeof selectedFrameData.prices].toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Quantity</label>
                    <div className="flex items-center">
                      <button 
                        className="border border-gray-300 rounded-l-md px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="border-t border-b border-gray-300 px-4 py-2 w-16 text-center focus:outline-none"
                      />
                      <button 
                        className="border border-gray-300 rounded-r-md px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={() => setQuantity(prev => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="flex items-center mb-4">
                    <img 
                      src={selectedFrameData.image} 
                      alt={selectedFrameData.name} 
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{selectedFrameData.name}</h3>
                      <p className="text-sm text-gray-500">{selectedFrameData.category}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium capitalize">{selectedSize} (
                        {selectedSize === 'small' ? '5" x 7"' : selectedSize === 'medium' ? '8" x 10"' : '11" x 14"'}
                      )</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">${selectedFrameData.prices[selectedSize as keyof typeof selectedFrameData.prices].toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="font-semibold text-indigo-600">${calculateTotal()}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                    onClick={() => setShowForm(true)}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We will contact you shortly to confirm your purchase.
              </p>
              <div className="bg-gray-50 p-4 rounded-md text-left mb-6">
                <h3 className="font-semibold mb-2">Order Details:</h3>
                <p><span className="text-gray-600">Frame:</span> {selectedFrameData.name}</p>
                <p><span className="text-gray-600">Size:</span> {selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}</p>
                <p><span className="text-gray-600">Quantity:</span> {quantity}</p>
                <p><span className="text-gray-600">Total:</span> ${calculateTotal()}</p>
              </div>
              <button 
                onClick={() => {
                  setSelectedFrame(null);
                  setSelectedSize('medium');
                  setQuantity(1);
                  setShowForm(false);
                  setFormSubmitted(false);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
              >
                Place Another Order
              </button>
            </div>
          </div>
        )}

        {/* Checkout Form */}
        {showForm && !formSubmitted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Complete Your Order</h2>
                <p className="text-gray-600 mb-6">
                  Please provide your details for cash-on-delivery.
                </p>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Delivery Address</label>
                      <input 
                        type="text" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <button 
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingPage;