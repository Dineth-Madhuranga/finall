import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const SliderSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      frameId: 201,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Premium Wooden Frames",
      description: "Handcrafted from sustainable wood sources, our premium frames add warmth and elegance to any space."
    },
    {
      id: 2,
      frameId: 102,
      image: "https://i.postimg.cc/3J1yZRbK/manja-vitolic-7t-OV35hnkao-unsplash.jpg",
      title: "Modern Minimalist Collection",
      description: "Clean lines and sleek finishes make our minimalist frames perfect for contemporary interiors."
    },
    {
      id: 3,
      frameId: 301,
      image: "https://i.postimg.cc/VvBJpLfW/planet-volumes-BABI2m1-Bax0-unsplash.jpg",
      title: "Vintage-Inspired Designs",
      description: "Timeless elegance with ornate details that celebrate the artistry of traditional frame making."
    },
    {
      id: 4,
      frameId: 202,
      image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Custom Size Options",
      description: "Available in various sizes to perfectly fit your photos, artwork, or memorabilia."
    },
    {
      id: 5,
      frameId: 103,
      image: "https://i.postimg.cc/JzdG9FLv/taru-goyal-Kt-JNcg-Cx-LAM-unsplash.jpg",
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
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
                  to={`/purchase/${slide.frameId}`}
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
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderSection;