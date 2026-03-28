import React from 'react';
import { Link } from 'react-router-dom';
import CtaButton from '../../components/CtaButton';

const DestinationPage = () => {
  // Gallery images for destination events
  const destinationImages = [
    { src: '/images/Gallery/_DSC0148.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC1425.jpg', span: 'col-span-2 row-span-2' }, // Large featured
    { src: '/images/Gallery/IMG_5404.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/_DSC3425.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC1810.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/IMG_8063.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/_DSC4472.jpg', span: 'col-span-2 row-span-1' }, // Wide
    { src: '/images/Gallery/_DSC3751.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC6371.jpg', span: 'col-span-2 row-span-2' }, // Large featured
    { src: '/images/Gallery/_DSC3503.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/_DSC1473.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC4913.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/_DSC1823.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC3871.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/_DSC6626.jpg', span: 'col-span-2 row-span-1' }, // Wide
    { src: '/images/Gallery/_DSC7413.jpg', span: 'col-span-1 row-span-1' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: 'url(/assets/generated-image.png)' }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 tracking-wide">DESTINATION EVENTS</h1>
          <p className="font-playfair text-xl md:text-2xl italic text-gold mb-8">Extraordinary Celebrations in Exotic Locations</p>
          <div className="flex justify-center space-x-6 mb-8">
            <div className="text-6xl">🌴</div><div className="text-6xl">✈️</div><div className="text-6xl">🏖️</div>
          </div>
          <CtaButton size="large">
            Plan Your Destination
          </CtaButton>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-primary mb-6">Unforgettable Experiences</h2>
            <p className="font-inter text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your special occasion into an extraordinary celebration with our destination event services. 
              From tropical beaches to mountain retreats, we create magical moments in the most stunning locations worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🏝️', title: 'Beach Weddings', desc: 'Picture-perfect ceremonies on pristine shores with turquoise waters' },
              { icon: '🏰', title: 'Historic Venues', desc: 'Majestic castles and estates for timeless celebrations' },
              { icon: '⛰️', title: 'Mountain Retreats', desc: 'Breathtaking alpine settings for intimate gatherings' },
              { icon: '🛳️', title: 'Cruise Events', desc: 'Luxury celebrations aboard world-class vessels' },
              { icon: '🌆', title: 'City Experiences', desc: 'Iconic urban backdrops for modern celebrations' },
              { icon: '🌿', title: 'Nature Escapes', desc: 'Serene natural settings for eco-friendly celebrations' }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="font-playfair text-xl font-semibold text-primary mb-3">{service.title}</h3>
                <p className="font-inter text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">Our Destination Gallery</h2>
            <p className="font-inter text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our collection of breathtaking destination events from around the world
            </p>
          </div>

          {/* Masonry Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
            {destinationImages.map((image, index) => (
              <div 
                key={index}
                className={`relative group overflow-hidden rounded-xl shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:z-10 ${image.span}`}
              >
                <img 
                  src={image.src} 
                  alt={`Destination event ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Optional: Image number overlay on hover */}
                <div className="absolute bottom-4 left-4 text-white font-playfair text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Centered Book Now Button */}
          <div className="flex justify-center mt-16">
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-gradient-to-r from-gold-600 to-yellow-500 text-primary-900 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-playfair"
            >
              Book Your Dream Event
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">Client Experiences</h2>
            <p className="font-inter text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from couples who chose destination celebrations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                quote: "Our beach wedding in Bali was beyond our wildest dreams. The team handled every detail flawlessly.", 
                author: "Sarah & Michael", 
                location: "Bali, Indonesia" 
              },
              { 
                quote: "The mountain retreat in Switzerland was magical. Every moment felt like a fairy tale.", 
                author: "Emma & James", 
                location: "Swiss Alps" 
              },
              { 
                quote: "Our cruise celebration was the perfect blend of luxury and adventure. Unforgettable!", 
                author: "Olivia & David", 
                location: "Mediterranean" 
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-amber-50 rounded-2xl p-8 shadow-lg">
                <div className="text-4xl text-gold-500 mb-4">❝</div>
                <p className="font-inter text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <h4 className="font-playfair font-bold text-primary">{testimonial.author}</h4>
                    <p className="font-inter text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationPage;