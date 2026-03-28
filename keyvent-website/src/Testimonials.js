import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah K",
      quote: "Working with KeyVent was absolute dream. They exceeded all our expectations.",
      avatar: "👩"
    },
    {
      id: 2,
      name: "Michael R",
      quote: "Working with KeyVent was absolute dream. They exceeded all our expectations.",
      avatar: "👨"
    },
    {
      id: 3,
      name: "Sarah K",
      quote: "Working with KeyVent was absolute dream. They retained their personal and elegant touch.",
      avatar: "👤"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gold-100 to-gold-200 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="font-playfair text-4xl font-bold text-center text-primary-900 mb-16 tracking-wide">WHAT OUR CLIENTS SAY</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className={`bg-white bg-opacity-95 p-8 rounded-2xl text-center shadow-xl transition-transform duration-300 hover:transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm ${
              index === 1 ? 'md:-translate-y-4' : ''
            }`}>
              <div className="text-6xl text-gold-600 mb-4 font-playfair">“</div>
              <p className="font-inter text-lg italic text-gray-600 leading-relaxed mb-6 min-h-20 flex items-center justify-center">{testimonial.quote}</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-primary-900 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                  {testimonial.avatar}
                </div>
                <span className="font-inter font-semibold text-primary-900">- {testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-10 left-5 text-8xl opacity-10 text-primary-900 font-playfair pointer-events-none">❝</div>
        <div className="absolute bottom-15 right-8 text-8xl opacity-10 text-primary-900 font-playfair pointer-events-none">❞</div>
        <div className="absolute top-50 right-15 text-8xl opacity-10 text-primary-900 font-playfair pointer-events-none">❝</div>
      </div>
    </section>
  );
};

export default Testimonials;