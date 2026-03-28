import React, { useState } from 'react';
import CtaButton from '../components/CtaButton';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear any previous status messages when user starts typing
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started', formData);
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Simulate a successful submission
      setTimeout(() => {
        setSubmitStatus({ type: 'success', message: 'Thank you for your message! We will get back to you within 24 hours.' });
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          message: ''
        });
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // More specific error messages
      let errorMessage = 'There was an error sending your message.';
      
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage
      });
      setIsSubmitting(false);
    }
  };

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
              CONTACT US
            </h1>
            <p className="font-playfair text-xl md:text-2xl italic text-gold-600 mb-8 text-shadow-md">
              Let's Create Something Extraordinary Together
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <div className="text-6xl">📞</div>
              <div className="text-6xl">✉️</div>
              <div className="text-6xl">🤝</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-playfair text-4xl font-bold text-primary mb-6">
                  Get in Touch
                </h2>
                <p className="font-inter text-lg text-gray-600 leading-relaxed mb-8">
                  Ready to start planning your dream event? Our team of experts is here to bring your vision to life. Contact us today for a personalized consultation.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <span className="text-primary text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-primary">Email</h3>
                    <p className="font-inter text-gray-600">keyvent.in@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <span className="text-primary text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-primary">Phone</h3>
                    <p className="font-inter text-gray-600">+91 85 95 15 90 90</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <span className="text-primary text-xl">🕒</span>
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-primary">Hours</h3>
                    <p className="font-inter text-gray-600">24X7</p>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <i className="fab fa-whatsapp text-primary text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-primary">WhatsApp</h3>
                    <a 
                      href="https://wa.me/918595159090" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-inter text-gray-600 hover:text-gold-600 transition-colors duration-300"
                    >
                      Message us on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 md:p-10 border border-purple-200 border-opacity-50 shadow-xl">
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-primary-900 mb-8 text-center">
                Send us a Message
              </h3>
              
              {/* Status Message */}
              {submitStatus.message && (
                <div className={`p-4 rounded-lg text-center font-inter ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-red-100 text-red-700 border border-red-300'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter text-sm font-semibold text-gray-700 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-600 focus:border-gold-600 font-inter text-base transition-all duration-300 bg-white shadow-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold font-inter"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold font-inter"
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                      Event Type
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold font-inter"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                    Preferred Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold font-inter"
                  />
                </div>

                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold font-inter resize-none"
                    placeholder="Tell us about your event vision..."
                  ></textarea>
                </div>

                <CtaButton
                  type="submit"
                  size="large"
                  className={`w-full transition-all duration-200 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:transform hover:scale-105'
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </CtaButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Additional Info Section */}
      {/* <section className="py-16 bg-gold bg-opacity-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-playfair text-3xl font-bold text-primary mb-6">
            Why Choose KeyVent?
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6 md:p-8 rounded-2xl bg-white bg-opacity-60 backdrop-blur-sm shadow-lg border border-gold-600 border-opacity-30">
              <div className="text-5xl mb-6">⚡</div>
              <h4 className="font-playfair text-xl md:text-2xl font-semibold text-black-900 mb-4">Quick Response</h4>
              <p className="font-inter text-black leading-relaxed px-2">We respond to all inquiries within 24 hours</p>
            </div>
            <div className="text-center p-6 md:p-8 rounded-2xl bg-white bg-opacity-60 backdrop-blur-sm shadow-lg border border-gold-600 border-opacity-30">
              <div className="text-5xl mb-6">🎯</div>
              <h4 className="font-playfair text-xl md:text-2xl font-semibold text-black-900 mb-4">Personalized Service</h4>
              <p className="font-inter text-black leading-relaxed px-2">Every event is customized to your unique vision</p>
            </div>
            <div className="text-center p-6 md:p-8 rounded-2xl bg-white bg-opacity-60 backdrop-blur-sm shadow-lg border border-gold-600 border-opacity-30">
              <div className="text-5xl mb-6">🏆</div>
              <h4 className="font-playfair text-xl md:text-2xl font-semibold text-black-900 mb-4">Award Winning</h4>
              <p className="font-inter text-black leading-relaxed px-2">Recognized for excellence in event planning</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default ContactPage;