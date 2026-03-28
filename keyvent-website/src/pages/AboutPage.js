import React from 'react';
import CtaButton from '../components/CtaButton';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: 'url(/assets/generated-image.png)' }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white border-opacity-20">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 tracking-wide text-shadow-lg">
              ABOUT KEYVENT
            </h1>
            <p className="font-playfair text-xl md:text-2xl italic text-gold-600 mb-8 text-shadow-md">
              Crafting Unforgettable Experiences
            </p>
            <div className="flex justify-center space-x-4">
              <span className="text-2xl animate-pulse">✨</span>
              <span className="text-2xl animate-bounce">⭐</span>
              <span className="text-2xl animate-pulse">💫</span>
              <span className="text-2xl animate-bounce">🌟</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-primary-900 rounded-3xl p-8 shadow-2xl">
                <img 
                  src="/assets/generated-image.png" 
                  alt="KeyVent Team" 
                  className="w-full h-96 object-cover rounded-2xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-96 bg-gold-600 rounded-2xl items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
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

            {/* Content Side */}
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="font-playfair text-4xl font-bold text-primary-900 mb-6 tracking-wide">
                  ABOUT KEYVENT
                </h2>
                <div className="w-24 h-1 bg-gold-600 mb-6"></div>
                <h3 className="font-playfair text-2xl font-bold text-gold-600 mb-4">
                  Your Perfect Wedding Starts Here
                </h3>
                <p className="font-inter text-lg text-gray-600 leading-relaxed mb-6">
                  At Keyvent, we believe that planning your wedding should be as joyful and exciting as the day itself—not stressful and overwhelming. We founded Keyvent to solve the biggest challenges couples face: finding the perfect venue and building a reliable team of vendors that fit their vision and their budget.
                </p>
                <p className="font-inter text-lg text-gray-600 leading-relaxed mb-8">
                  We are more than just a planning service; we are your dedicated partners in turning your dream celebration into a perfectly executed reality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Keyvent Difference Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-primary-900 mb-6">
              THE KEYVENT DIFFERENCE
            </h2>
            <div className="w-24 h-1 bg-gold-600 mx-auto mb-8"></div>
            <h3 className="font-playfair text-2xl font-bold text-gold-600 mb-6">
              Venue Matching Expertise
            </h3>
            <p className="font-inter text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
              Our core strength lies in our deep, localized knowledge of wedding locations. We don't just show you a list of halls; we act as your personal venue scouts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow duration-300 border border-purple-200 border-opacity-50">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="font-playfair text-xl md:text-2xl font-semibold text-primary-900 mb-6">Compatibility First</h3>
              <p className="font-inter text-gray-600 leading-relaxed text-sm md:text-base px-2">
                We focus on finding venues that are the perfect fit for your guest count, aesthetic vision, and logistical needs.
              </p>
            </div>
            
            <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow duration-300 border border-purple-200 border-opacity-50">
              <div className="text-6xl mb-6">💰</div>
              <h3 className="font-playfair text-xl md:text-2xl font-semibold text-primary-900 mb-6">Budget Focused</h3>
              <p className="font-inter text-gray-600 leading-relaxed text-sm md:text-base px-2">
                We prioritize budget-friendly options, ensuring you get maximum value without compromising on quality or location.
              </p>
            </div>
            
            <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow duration-300 border border-purple-200 border-opacity-50">
              <div className="text-6xl mb-6">📍</div>
              <h3 className="font-playfair text-xl md:text-2xl font-semibold text-primary-900 mb-6">Preferred Location</h3>
              <p className="font-inter text-gray-600 leading-relaxed text-sm md:text-base px-2">
                Whether you need a lakeside view, a historic ballroom, or a quiet garden, we guarantee options in your preferred geographical area.
              </p>
            </div>
          </div>

          {/* Beyond the Venue */}
          <div className="text-center mb-12">
            <h3 className="font-playfair text-3xl font-bold text-primary-900 mb-6">
              Beyond the Venue: The Complete Solution
            </h3>
            <p className="font-inter text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
              Once your ideal location is secured, Keyvent ensures every other detail falls seamlessly into place. We have curated a network of the industry's best professionals, saving you the time and worry of searching for dependable suppliers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gold-600 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
              <div className="text-5xl mb-4">📸</div>
              <h4 className="font-playfair text-lg font-semibold text-primary-900 mb-3">Photography & Videography</h4>
              <p className="font-inter text-gray-600 text-sm">
                Capturing every memory with artistry and precision.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gold-600 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
              <div className="text-5xl mb-4">🎨</div>
              <h4 className="font-playfair text-lg font-semibold text-primary-900 mb-3">Decor & Design</h4>
              <p className="font-inter text-gray-600 text-sm">
                Transforming your space into a breathtaking environment.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gold-600 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
              <div className="text-5xl mb-4">💄</div>
              <h4 className="font-playfair text-lg font-semibold text-primary-900 mb-3">Makeover Artists</h4>
              <p className="font-inter text-gray-600 text-sm">
                Ensuring you look and feel your absolute best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-primary-900 mb-6">
              OUR MISSION
            </h2>
            <div className="w-24 h-1 bg-gold-600 mx-auto mb-8"></div>
            <h3 className="font-playfair text-2xl font-semibold text-primary-900 mb-6">
              The Action & The Commitment
            </h3>
            <p className="font-inter text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
              Our mission is to simplify the wedding planning process by offering an unparalleled, end-to-end service focused on three core commitments:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow duration-300 border border-purple-200 border-opacity-50">
              <div className="text-6xl mb-6">🏢</div>
              <h3 className="font-playfair text-xl md:text-2xl font-semibold text-primary-900 mb-6">Venue Compatibility</h3>
              <p className="font-inter text-gray-600 leading-relaxed text-sm md:text-base px-2">
                To find and secure the best-suited venue that aligns perfectly with the client's guest size, style, and geographical needs.
              </p>
            </div>
            
            <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow duration-300 border border-purple-200 border-opacity-50">
              <div className="text-6xl mb-6">💰</div>
              <h3 className="font-playfair text-xl md:text-2xl font-semibold text-primary-900 mb-6">Budget Optimization</h3>
              <p className="font-inter text-gray-600 leading-relaxed text-sm md:text-base px-2">
                To provide honest, budget-friendly options and solutions that maximize value without ever compromising the quality of the event.
              </p>
            </div>
            
            <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow duration-300 border border-purple-200 border-opacity-50">
              <div className="text-6xl mb-6">🎆</div>
              <h3 className="font-playfair text-xl md:text-2xl font-semibold text-primary-900 mb-6">Comprehensive Solutions</h3>
              <p className="font-inter text-gray-600 leading-relaxed text-sm md:text-base px-2">
                To curate and manage a professional team of vetted vendors (photographers, videographers, decorators, etc.), ensuring every element of the wedding is cohesive, reliable, and spectacular.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gold-600 bg-opacity-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div>
                <h2 className="font-playfair text-4xl font-bold text-primary-900 mb-6">
                  OUR VISION
                </h2>
                <div className="w-24 h-1 bg-gold-600 mb-8"></div>
                <h3 className="font-playfair text-2xl font-bold text-gold-600 mb-4">
                  Seamless Celebrations, Personalized For You
                </h3>
                <p className="font-inter text-lg text-gray-600 leading-relaxed mb-6">
                  Our vision is to be recognized as the leading, most reliable platform for personalized wedding planning, known for our innovative approach to venue sourcing and vendor matching.
                </p>
                <p className="font-inter text-lg text-gray-600 leading-relaxed mb-6">
                  We strive to be the standard-bearer for compatibility, budget transparency, and comprehensive service in the events industry.
                </p>
                <p className="font-inter text-lg text-gray-600 leading-relaxed">
                  We envision a future where every couple can bypass the stress of wedding planning and move straight to the joy of celebration, confidently knowing that every detail, large and small, has been perfectly managed by the Keyvent team.
                </p>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-to-br from-primary-900 to-purple-800 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white bg-opacity-10 rounded-2xl p-8 text-center">
                  <div className="text-8xl mb-6">👑</div>
                  <h3 className="font-playfair text-2xl font-bold text-gold-600 mb-4">
                    Leading the Future
                  </h3>
                  <p className="font-inter text-purple-100 leading-relaxed">
                    Setting the standard for wedding planning excellence, where stress-free celebrations and perfect execution meet innovative solutions.
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 text-4xl animate-pulse">✨</div>
              <div className="absolute -bottom-6 -left-6 text-3xl animate-bounce">🌟</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-playfair text-4xl font-bold text-primary-900 mb-6">
              OUR PROMISE TO YOU
            </h2>
            <div className="w-24 h-1 bg-gold-600 mx-auto mb-8"></div>
            <p className="font-inter text-xl text-gray-600 leading-relaxed mb-8">
              Your wedding is a key event in your life, and we treat it with the seriousness, creativity, and attention it deserves. Let us handle the complexities of logistics and negotiation so you can focus on enjoying the journey to "I Do."
            </p>
            <div className="bg-primary-900 rounded-3xl p-8 shadow-2xl">
              <p className="font-playfair text-2xl font-bold text-gold-600 mb-4">
                Ready to find the perfect setting for your celebration?
              </p>
              <p className="font-inter text-lg text-purple-100 mb-6">
                Let's connect and start planning your dream wedding today.
              </p>
              <CtaButton 
                href="/contact" 
                size="large"
              >
                GET STARTED TODAY
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
