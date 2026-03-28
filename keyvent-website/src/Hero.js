import React, { useState, useEffect } from 'react';
import CtaButton from './components/CtaButton';

const Hero = ({ backgroundImage = '/images/HeroSectionimages/HomeHero.jpg' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log('Hero background image loaded successfully');
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error('Hero background image failed to load:', backgroundImage);
      setImageError(true);
    };
    img.src = backgroundImage;
  }, [backgroundImage]);

  const heroStyle = {
    backgroundImage: imageLoaded ? `url(${backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: imageError ? '#3F1F4F' : (imageLoaded ? 'transparent' : '#3F1F4F')
  };

  const scrollToServices = (e) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden z-0"
      style={heroStyle}
    >
      <div className="absolute inset-0 bg-primary-900 bg-opacity-20"></div>

    <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
      <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white border-opacity-20">
        {!imageLoaded && !imageError && (
          <div className="mb-4 text-gold-600">
            <div className="animate-pulse">Loading background...</div>
          </div>
        )}
        {imageError && (
          <div className="mb-4 text-red-400 text-sm">
            Background image failed to load
          </div>
        )}
        <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 tracking-wide leading-tight text-shadow-lg">
          Your big day    matters a lot. 
          <br />
        Let’s create magic together
        </h1>
        <p className="font-playfair text-xl md:text-2xl italic text-gold-600 mb-8 text-shadow-md">
          Events with Elegance
        </p>
        <CtaButton 
          size="large"
          onClick={scrollToServices}
        >
          DISCOVER OUR SERVICES
        </CtaButton>
      </div>
    </div>

    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute top-20 left-10 text-2xl opacity-60 animate-pulse">✨</div>
      <div className="absolute top-28 right-16 text-2xl opacity-60 animate-bounce" style={{ animationDelay: '2s' }}>
        ⭐
      </div>
      <div className="absolute bottom-24 left-16 text-2xl opacity-60 animate-pulse" style={{ animationDelay: '4s' }}>
        💫
      </div>
      <div className="absolute bottom-32 right-12 text-2xl opacity-60 animate-bounce" style={{ animationDelay: '1s' }}>
        🌟
      </div>
    </div>
  </section>
  );
};

export default Hero;