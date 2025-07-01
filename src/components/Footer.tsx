import React from 'react';
import { Link } from 'react-router-dom';
import { Frame, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern rotate-12 scale-150"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex flex-col items-start mb-6 group">
              <img
                src="https://i.postimg.cc/QCk8PFbN/Black-White-Minimalist-Initials-Monogram-Jewelry-Logo-removebg-preview-1.png"
                alt="The Gallery Logo"
                className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Being a group of entrepreneurs "The Artistic Unity", We wishe to touch the sky with the effort of providing a satisfactory service to our customers through hard work innovation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Frame className="h-5 w-5 mr-2 text-indigo-400" />
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-400">
              {['Home', 'Gallery', 'Categories', 'Pricing'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.toLowerCase()); }}
                    className="hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="relative overflow-hidden">
                      <span className="relative inline-block transform group-hover:translate-x-1 transition-transform">
                        {link}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-indigo-400" />
              Contact Us
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 group-hover:text-indigo-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">(+94) 712961268</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 group-hover:text-indigo-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">ashengamage238@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 mt-1 group-hover:text-indigo-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">
                  Colombo<br />Sri Lanka
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Connected</h3>
            <div className="flex space-x-4 mb-8">
              {[
                { icon: Instagram, href: 'https://instagram.com/thegallery' },
                { icon: Facebook, href: 'https://facebook.com/thegallery' },
                { icon: Twitter, href: 'https://twitter.com/thegallery' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-indigo-600 hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Newsletter</h4>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 bg-white/10 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 text-sm placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} The Artistic Unity. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Shipping Info'].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-white transition-colors relative group"
              >
                <span className="relative inline-block">
                  {link}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;