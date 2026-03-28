import React from "react";
import { Link } from "react-router-dom";
import Hero from "../Hero";
import OptimizedImage from "../components/OptimizedImage";
import CtaButton from "../components/CtaButton";

const HomePage = () => {
  const services = [
    {
      title: "Venues",
      icon: "🏛️",
      path: "/services/venues",
      color: "bg-light-maroon",
      bgColor: "#D81B60", // More vibrant maroon/magenta
      image: "/images/Homecards/1.jpg",
      hoverImage: "/images/HomeCardHover/Venues.png",
    },
    {
      title: "Photo/Videographer",
      icon: "📸",
      path: "/services/photo-video",
      color: "bg-light-pink",
      bgColor: "#FF4081", // More vibrant pink
      image: "/images/Homecards/2.jpg",
      hoverImage: "/images/HomeCardHover/PhotoVideographer.png",
    },
    {
      title: "Decorators",
      icon: "🎨",
      path: "/services/decorators",
      color: "bg-light-green",
      bgColor: "#00E676", // More vibrant green
      image: "/images/Homecards/3.jpg",
      hoverImage: "/images/HomeCardHover/Decorator.png",
    },
    {
      title: "Makeover Artist",
      icon: "💄",
      path: "/services/makeover",
      color: "bg-light-peach",
      bgColor: "#FF5252", // More vibrant red
      image: "/images/Homecards/4.jpg",
      hoverImage: "/images/HomeCardHover/Makeover.png",
    },
    {
      title: "Entertainers",
      icon: "🎭",
      path: "/services/entertainers",
      color: "bg-light-blue",
      bgColor: "#2196F3", // More vibrant blue
      image: "/images/Homecards/5.jpg",
      hoverImage: "/images/HomeCardHover/Entertainers.png",
    },
    {
      title: "Return Gifts",
      icon: "🎁",
      path: "/services/return-gifts",
      color: "bg-light-yellow",
      bgColor: "#FFD600", // More vibrant yellow
      image: "/images/Homecards/6.jpg",
      hoverImage: "/images/HomeCardHover/Return Gifts.png",
    },
    {
      title: "Destination Events",
      icon: "✈️",
      path: "/services/destination",
      color: "bg-grey",
      bgColor: "#607D8B", // More vibrant grey/blue-grey
      image: "/images/Homecards/7.jpg",
      hoverImage: "/images/HomeCardHover/Destination Events.png",
    },
    {
      title: "KeyVent Specials",
      icon: "⭐",
      path: "/services/specials",
      color: "bg-multicolor",
      bgColor:
        "linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FECA57)",
      image: "/images/Homecards/8.jpg",
      hoverImage: "/images/HomeCardHover/Keyvent Specials.png",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section
        className="py-12 md:py-16 lg:py-20 bg-white"
        aria-labelledby="about-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-primary-900 rounded-3xl p-6 md:p-8 shadow-2xl">
                <OptimizedImage
                  src="/assets/generated-image.png"
                  alt="KeyVent Team"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="hidden w-full h-64 md:h-80 lg:h-96 bg-gold-600 rounded-2xl items-center justify-center">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 md:w-16 md:h-16 bg-primary-900 rounded-full flex items-center justify-center text-white text-xl md:text-2xl shadow-lg hover-scale-effect"
                        aria-label={`Team member ${i + 1}`}
                        role="img"
                      >
                        👤
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 text-2xl md:text-4xl animate-pulse"
                aria-hidden="true"
              >
                ⭐
              </div>
              <div
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 text-xl md:text-3xl animate-bounce"
                aria-hidden="true"
              >
                ✨
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
              <div>
                <h2
                  id="about-heading"
                  className="font-playfair text-3xl md:text-4xl font-bold text-primary-900 mb-4 md:mb-6 tracking-wide"
                >
                  ABOUT KEYVENT
                </h2>
                <p className="font-inter text-base md:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6">
                  Founded with a passion for creating extraordinary moments,
                  KeyVent has been at the forefront of luxury event planning for
                  over a decade. Our team of dedicated professionals brings
                  together creativity, expertise, and meticulous attention to
                  detail to transform your vision into reality.
                </p>
                <p className="font-inter text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">
                  From intimate celebrations to grand corporate events, we pride
                  ourselves on delivering personalized experiences that exceed
                  expectations. Every event tells a unique story, and we're here
                  to help you tell yours with elegance and sophistication.
                </p>
                <Link
                  to="/about"
                  className="bg-transparent border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white font-inter font-semibold px-6 md:px-8 py-2 md:py-3 rounded-full transition-all duration-300 hover-scale-effect inline-block text-decoration-none text-sm md:text-base"
                  aria-label="Learn more about KeyVent"
                >
                  LEARN MORE ABOUT US
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services-section"
        className="w-full py-12 md:py-16 lg:py-20 golden-services-section"
        style={{ overflow: "visible" }}
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2
              id="services-heading"
              className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-4 md:mb-6"
            >
              OUR SERVICES
            </h2>
            <p className="font-inter text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
              From intimate gatherings to grand celebrations, we offer
              comprehensive event planning services tailored to your unique
              vision.
            </p>
          </div>

          <div
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            style={{ overflow: "visible" }}
          >
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.path}
                className="service-card block text-decoration-none"
                aria-label={`View our ${service.title} service`}
              >
                <div
                  className={`service-card-wrapper service-card-${index} group relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden transition-all duration-300 hover:scale-105`}
                  style={{
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                    border: "3px solid transparent",
                  }}
                >
                  {/* Hover image - shown on hover (Unsplash images) - Always at bottom */}
                  <div className="service-hover-image absolute inset-0 z-0 opacity-100">
                    <img
                      src={service.hoverImage}
                      alt={`${service.title} service hover`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  </div>

                  {/* Default image shown (Homecards images) - Visible by default, fades out on hover */}
                  <div className="service-default-image absolute inset-0 z-10 opacity-100 transition-opacity duration-500">
                    <img
                      src={service.image}
                      alt={`${service.title} service`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  </div>

                  {/* Hover button at bottom of image - Only visible on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex justify-center items-center">
                    <CtaButton size="medium" className="w-4/5">
                      {service.title}
                    </CtaButton>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .service-card-wrapper:hover .service-default-image {
          opacity: 0;
        }

        .service-card-0:hover {
          border-color: #d81b60 !important;
        }

        .service-card-1:hover {
          border-color: #ff4081 !important;
        }

        .service-card-2:hover {
          border-color: #00e676 !important;
        }

        .service-card-3:hover {
          border-color: #ff5252 !important;
        }

        .service-card-4:hover {
          border-color: #2196f3 !important;
        }

        .service-card-5:hover {
          border-color: #ffd600 !important;
        }

        .service-card-6:hover {
          border-color: #607d8b !important;
        }

        .service-card-7:hover {
          border: 3px solid;
          border-image: linear-gradient(
              135deg,
              #ff6b6b,
              #4ecdc4,
              #45b7d1,
              #96ceb4,
              #feca57
            )
            1;
        }
      `}</style>
    </div>
  );
};

export default HomePage;