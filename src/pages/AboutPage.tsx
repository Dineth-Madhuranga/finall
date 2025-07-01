import React from 'react';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import { ImageReveal } from '../components/ui/image-reveal';
import { Award, Users, Heart, Star } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Crafting Memories with Elegance Since 2020
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                At The Artistic Unity, we believe every photograph tells a story, and every frame we craft is designed to enhance that narrative. Our journey began with a simple mission: to create beautiful, handcrafted frames that transform your precious memories into timeless pieces of art.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-indigo-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Premium Quality</h3>
                    <p className="text-sm text-gray-500">Finest materials used</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-indigo-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Expert Craftsmen</h3>
                    <p className="text-sm text-gray-500">Skilled artisans</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <ImageReveal
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Craftsman at work"
                className="rounded-lg shadow-xl"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16">Our Values</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Heart className="h-8 w-8 text-indigo-600" />,
                title: "Passion for Craftsmanship",
                description: "Every frame is crafted with love and attention to detail, ensuring each piece meets our high standards of quality."
              },
              {
                icon: <Star className="h-8 w-8 text-indigo-600" />,
                title: "Excellence in Service",
                description: "We're committed to providing exceptional customer service and ensuring complete satisfaction with every purchase."
              },
              {
                icon: <Award className="h-8 w-8 text-indigo-600" />,
                title: "Quality Materials",
                description: "We source only the finest materials to create frames that will stand the test of time."
              },
              {
                icon: <Users className="h-8 w-8 text-indigo-600" />,
                title: "Community Focus",
                description: "We believe in building lasting relationships with our customers and supporting local artisans."
              }
            ].map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;