import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 backdrop-blur-lg ${isScrolled
        ? 'bg-white/90 shadow-lg py-3'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col items-center group"
          >
            <span className="text-3xl md:text-4xl font-serif tracking-wider transition-transform group-hover:scale-105">A|U</span>
            <span className="text-xs md:text-sm tracking-widest bg-black/5 px-2 py-0.5 rounded-full transition-colors group-hover:bg-black/10">
              Artistic Unity
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 text-sm tracking-wide">
            {['HOME', 'FRAMES', 'ABOUT'].map((item) => (
              <Link
                key={item}
                to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                className={`relative py-2 transition-colors hover:text-indigo-600 ${location.pathname === (item === 'HOME' ? '/' : `/${item.toLowerCase()}`)
                  ? 'text-indigo-600'
                  : 'text-gray-800'
                  }`}
              >
                <span>{item}</span>
                {location.pathname === (item === 'HOME' ? '/' : `/${item.toLowerCase()}`) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform origin-left"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-x-0 top-[72px] bg-white/95 backdrop-blur-lg transition-all duration-300 ease-in-out ${isMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
        >
          <div className="container mx-auto px-4 py-6 space-y-1">
            {['HOME', 'FRAMES', 'ABOUT'].map((item) => (
              <Link
                key={item}
                to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                className={`block px-4 py-3 rounded-lg transition-all ${location.pathname === (item === 'HOME' ? '/' : `/${item.toLowerCase()}`)
                  ? 'bg-indigo-50 text-indigo-600 font-medium'
                  : 'hover:bg-gray-50'
                  }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;