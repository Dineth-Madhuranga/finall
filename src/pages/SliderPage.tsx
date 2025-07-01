import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const SliderPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Premium Wooden Frames",
      description: "Handcrafted from sustainable wood sources, our premium frames add warmth and elegance to any space."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1579541591970-e5a7e3a79a0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Modern Minimalist Collection",
      description: "Clean lines and sleek finishes make our minimalist frames perfect for contemporary interiors."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1594731804993-b6ce6db43a3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Vintage-Inspired Designs",
      description: "Timeless elegance with ornate details that celebrate the artistry of traditional frame making."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Custom Size Options",
      description: "Available in various sizes to perfectly fit your photos, artwork, or memorabilia."
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Special Occasion Frames",
      description: "Celebrate life's important moments with our specially designed commemorative frames."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[80vh]">
        {/* Slider */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div 
              className="h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="container mx-auto px-6 relative z-10 flex flex-col justify-center h-full text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">{slide.title}</h2>
                <p className="text-xl mb-8 max-w-2xl">{slide.description}</p>
                <Link 
                  to="/categories" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition-colors inline-flex items-center w-fit"
                >
                  Explore Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-white z-20 transition-colors"
          onClick={goToPrevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-white z-20 transition-colors"
          onClick={goToNextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Additional Content */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Our Frames Stand Out</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Premium Materials</h3>
            <p className="text-gray-600 mb-4">
              We source only the highest quality materials for our frames, ensuring durability and a premium finish that enhances your photos.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Premium Materials" 
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Handcrafted Excellence</h3>
            <p className="text-gray-600 mb-4">
              Each frame is meticulously crafted by skilled artisans who take pride in their work, ensuring attention to every detail.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1579541591970-e5a7e3a79a0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Handcrafted Excellence" 
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Customization Options</h3>
            <p className="text-gray-600 mb-4">
              We offer a range of customization options to ensure your frame perfectly complements your photos and interior design.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1594731804993-b6ce6db43a3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Customization Options" 
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/categories" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-md transition-colors inline-flex items-center"
          >
            Explore Frame Categories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SliderPage;