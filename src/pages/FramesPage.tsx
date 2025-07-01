import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import GallerySection from '../sections/GallerySection';

const FramesPage = () => {
  return (
    <div>
      <section id="gallery">
        <GallerySection />
      </section>
    </div>
  );
};

export default FramesPage;