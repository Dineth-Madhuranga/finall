import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import CategoriesPage from './pages/CategoriesPage';
import PurchasePage from './pages/PurchasePage';
import AboutPage from './pages/AboutPage';
import FramesPage from './pages/FramesPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24 md:pt-28">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/purchase/:frameId" element={<PurchasePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/frames" element={<FramesPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;