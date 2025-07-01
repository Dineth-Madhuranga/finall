import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Package, Truck } from 'lucide-react';
import HomeSection from '../sections/HomeSection';
import GallerySection from '../sections/GallerySection';

const HomePage = () => {
  return (
    <div>
      <section id="home">
        <HomeSection />
      </section>
      <section id="gallery">
        <GallerySection />
      </section>
      <section id="categories">
      </section>
    </div>
  );
};

export default HomePage;