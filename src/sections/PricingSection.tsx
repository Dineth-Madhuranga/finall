import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShoppingCart } from 'lucide-react';

const PricingSection = () => {
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);

  // All available frames
  const frames = [
    {
      id: 103,
      name: "Mount Frame",
      type: "General",
      image: "https://i.postimg.cc/HxdRbj5Q/10.png",
      prices: {
        small: 19.99,
        medium: 29.99,
        large: 39.99
      }
    },
    {
      id: 102,
      name: "Glass Frame",
      type: "General",
      image: "https://i.postimg.cc/85pXj9Q4/3.png",
      prices: {
        small: 24.99,
        medium: 34.99,
        large: 44.99
      }
    },
    {
      id: 301,
      name: "Rotating Frame",
      type: "Modern",
      image: "https://i.postimg.cc/B6PpL07x/31.png",
      prices: {
        small: 29.99,
        medium: 39.99,
        large: 49.99
      }
    },
    {
      id: 202,
      name: "Plymount Frame",
      type: "Boarderless",
      image: "https://i.postimg.cc/3JT1RzXv/14.png",
      prices: {
        small: 21.99,
        medium: 31.99,
        large: 41.99
      }
    },
    {
      id: 302,
      name: "Floating Frame",
      type: "Modern",
      image: "https://i.postimg.cc/RFpdq0TC/27.png",
      prices: {
        small: 26.99,
        medium: 36.99,
        large: 46.99
      }
    },
    {
      id: 203,
      name: "Embossed Frame",
      type: "Boarderless",
      image: "https://i.postimg.cc/4NQ5hwPF/20.png",
      prices: {
        small: 27.99,
        medium: 37.99,
        large: 47.99
      }
    },
    {
      id: 204,
      name: "Compound Frame",
      type: "Boarderless",
      image: "https://i.postimg.cc/MGvbNwSh/22.png",
      prices: {
        small: 22.99,
        medium: 32.99,
        large: 42.99
      }
    }
  ];


  // Find the selected frame data
  const selectedFrameData = frames.find(frame => frame.id === selectedFrame) || frames[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-4">Pricing & Purchase</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Select your preferred frame, choose the size, and place your order for cash-on-delivery.
        </p>

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
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedFrame === frame.id ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'
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

            {/* Size Information */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Available Sizes</h2>

                <div className="grid grid-cols-3 gap-4">
                  {['small', 'medium', 'large'].map((size) => (
                    <div
                      key={size}
                      className="border rounded-lg p-4 text-center"
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
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Selected Frame</h2>

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
                    <span className="text-gray-600">Small (5" x 7"):</span>
                    <span className="font-medium">${selectedFrameData.prices.small.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Medium (8" x 10"):</span>
                    <span className="font-medium">${selectedFrameData.prices.medium.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Large (11" x 14"):</span>
                    <span className="font-medium">${selectedFrameData.prices.large.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to={`/purchase/${selectedFrame || selectedFrameData.id}`}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Proceed to Purchase
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;