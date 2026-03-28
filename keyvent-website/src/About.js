import React from 'react';

const About = ({ teamImage = '/images/team-photo.jpg' }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-purple-100 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="bg-primary-900 rounded-3xl p-8 shadow-2xl">
              <div className="bg-gold-600 rounded-2xl p-8 min-h-96 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition-transform duration-300"
                    >
                      👤
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 text-4xl animate-pulse">⭐</div>
            <div className="absolute -bottom-4 -left-4 text-3xl animate-bounce">✨</div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="font-playfair text-4xl font-bold text-primary-900 mb-6 tracking-wide">
                ABOUT US
              </h2>
              <p className="font-inter text-lg text-gray-600 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Founded and operated by a team of passionate event specialists, we bring years of expertise and attention to every aspect of our client events.
              </p>
              <button className="bg-transparent border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white font-inter font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                LEARN MORE
              </button>
            </div>
            <div>
              <h2 className="font-playfair text-4xl font-bold text-primary-900 mb-6 tracking-wide">
                OUR MISSION
              </h2>
              <p className="font-inter text-lg text-gray-600 leading-relaxed">
                To be leaders in the global luxury event industry, recognized for innovation and excellence. We strive to create unforgettable experiences that exceed our clients' expectations through meticulous attention to detail.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-15 right-10 text-4xl opacity-40 animate-pulse">⭐</div>
      <div className="absolute bottom-20 left-8 text-3xl opacity-40 animate-bounce">✨</div>
      <div className="absolute top-60 right-5 text-3xl opacity-40 animate-pulse">🌟</div>
    </section>
  );
};

export default About;