import React from 'react';
import CtaButton from '../../components/CtaButton';

const SpecialsPage = () => {
  return (
    <div className="min-h-screen">
      <section 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: 'url(/assets/generated-image.png)' }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 tracking-wide">KEYVENT SPECIALS</h1>
          <p className="font-playfair text-xl md:text-2xl italic text-gold mb-8">Exclusive Packages Tailored Just for You</p>
          <div className="flex justify-center space-x-6 mb-8">
            <div className="text-6xl">👑</div><div className="text-6xl">🌟</div><div className="text-6xl">💎</div>
          </div>
          <CtaButton size="large">
            Explore Specials
          </CtaButton>
        </div>
      </section>
    </div>
  );
};

export default SpecialsPage;