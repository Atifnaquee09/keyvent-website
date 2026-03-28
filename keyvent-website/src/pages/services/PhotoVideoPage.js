import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CtaButton from '../../components/CtaButton';

const PhotoVideoPage = () => {
  const navigate = useNavigate();
  // Gallery images from the Gallery folder with custom spans for masonry layout
  const galleryImages = [
    { src: '/images/Gallery/DSC07172.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/IMG_2450.jpg', span: 'col-span-2 row-span-2' }, // Large featured
    { src: '/images/Gallery/IMG_5390.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/IMG_5404.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/IMG_5674.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/IMG_6852.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/IMG_8063.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/IMG_8069.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC0148.jpg', span: 'col-span-2 row-span-1' }, // Wide
    { src: '/images/Gallery/_DSC0221.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC1387.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/_DSC1425.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC1426.jpg', span: 'col-span-2 row-span-2' }, // Large featured
    { src: '/images/Gallery/_DSC1473.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC1810.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC1823.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/_DSC3162.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC3425.jpg', span: 'col-span-2 row-span-1' }, // Wide
    { src: '/images/Gallery/_DSC3485.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC3503.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/_DSC3645.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC3751.jpg', span: 'col-span-2 row-span-2' }, // Large featured
    { src: '/images/Gallery/_DSC3765.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC3781.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC3871.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/_DSC4281.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC4472.jpg', span: 'col-span-2 row-span-1' }, // Wide
    { src: '/images/Gallery/_DSC4546.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC4913.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/_DSC5345.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC5367.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC6371.jpg', span: 'col-span-2 row-span-2' }, // Large featured
    { src: '/images/Gallery/_DSC6626.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC6898.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC7413.jpg', span: 'col-span-1 row-span-2' }, // Tall
    { src: '/images/Gallery/_DSC7491.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/Gallery/_DSC9783.jpg', span: 'col-span-1 row-span-1' }
  ];

  // State for photographers data
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch photographers data from API
  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Use the Node.js/Express API endpoint
        const apiUrl = process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in';
        const response = await fetch(`${apiUrl}/api/photographers`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch photographers: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        
        // Assuming the API returns an array of photographers
        if (result.success && Array.isArray(result.photographers)) {
          setPhotographers(result.photographers);
        } else if (Array.isArray(result)) {
          setPhotographers(result);
        } else {
          console.warn('Unexpected API response format for photographers');
          setPhotographers([]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photographers:', error);
        setError(error.message || 'Failed to load photographers');
        setPhotographers([]);
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: 'url(/assets/generated-image.png)' }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-playfair text-3xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 xs:mb-2 tracking-wide">
            PHOTO & VIDEOGRAPHY
          </h1>
          <p className="font-playfair text-lg xs:text-base sm:text-xl md:text-2xl italic text-gold mb-6 xs:mb-4">
            Capturing Your Most Precious Moments
          </p>
          <div className="flex justify-center space-x-4 xs:space-x-2 mb-6 xs:mb-4">
            <div className="text-4xl xs:text-3xl">📸</div>
            <div className="text-4xl xs:text-3xl">🎥</div>
            <div className="text-4xl xs:text-3xl">✨</div>
          </div>
          <CtaButton 
            size="large"
            className="xs:text-sm"
            dropdown={[
              { label: 'Wedding Photography', href: '/portfolio/wedding' },
              { label: 'Corporate Events', href: '/portfolio/corporate' },
              { label: 'Party Photography', href: '/portfolio/parties' },
              { label: 'Cinematic Videos', href: '/portfolio/videos' },
              { label: 'Contact Photographer', href: '/contact' }
            ]}
          >
            View Our Portfolio
          </CtaButton>
        </div>
      </section>

      {/* Photographers Section - Moved to after hero section */}
      <section className="py-12 xs:py-8 sm:py-16 md:py-20 bg-gradient-to-b from-purple-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 xs:mb-8 sm:mb-16">
            <h2 className="font-playfair text-3xl xs:text-2xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Professional Photographers
            </h2>
            <p className="font-inter text-base xs:text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Meet our talented team of photographers who capture your special moments with creativity and expertise
            </p>
          </div>

          {error ? (
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <p className="text-lg font-medium text-red-700">Error: {error}</p>
              <p className="mt-2 text-sm text-red-600">Failed to load photographers. Please try again later.</p>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <p className="text-lg font-medium text-gray-700">Loading photographers...</p>
            </div>
          ) : photographers.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xs:gap-4">
              {photographers.map((photographer) => (
                <div 
                  key={photographer._id || photographer.id}
                  className="bg-white rounded-2xl p-6 xs:p-4 hover:shadow-xl transition-shadow duration-300 text-center cursor-pointer"
                  onClick={() => navigate(`/services/photographer/${photographer._id || photographer.id}`)}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg">
                      <img 
                        src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${photographer.images[0]}`} 
                        alt={photographer.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/400x400/4a9b8f/white?text=No+Image';
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="font-playfair text-lg xs:text-base sm:text-xl font-semibold text-primary mb-2">
                    {photographer.name}
                  </h3>
                  <p className="font-inter text-gray-600 xs:text-sm">
                    {photographer.images.length} Portfolio Images
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-medium text-gray-700">No photographers available at the moment</p>
              <p className="mt-2 text-sm text-gray-500">Check back later to see our talented photographers</p>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 xs:py-8 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 xs:mb-8 sm:mb-16">
            <h2 className="font-playfair text-3xl xs:text-2xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
              Professional Photography & Videography
            </h2>
            <p className="font-inter text-base xs:text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Our award-winning team of photographers and videographers specializes in capturing the essence of your special moments with artistic flair and technical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-4">
            {[
              { icon: '💍', title: 'Wedding Photography', desc: 'Romantic and timeless wedding documentation' },
              { icon: '🎬', title: 'Cinematic Videos', desc: 'Hollywood-style event cinematography' },
              { icon: '👔', title: 'Corporate Events', desc: 'Professional business event coverage' },
              { icon: '🎉', title: 'Party Photography', desc: 'Fun and vibrant celebration captures' },
              { icon: '📱', title: 'Social Media Content', desc: 'Content optimized for digital platforms' },
              { icon: '🖼️', title: 'Photo Albums', desc: 'Luxury printed albums and displays' }
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 xs:p-4 hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="text-4xl xs:text-3xl mb-3">{service.icon}</div>
                <h3 className="font-playfair text-lg xs:text-base sm:text-xl font-semibold text-primary mb-2">{service.title}</h3>
                <p className="font-inter text-gray-600 xs:text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Gallery Section - Masonry Layout */}
      <section className="py-12 xs:py-8 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 xs:mb-8 sm:mb-16">
            <h2 className="font-playfair text-3xl xs:text-2xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Creative Gallery
            </h2>
            <p className="font-inter text-base xs:text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our stunning collection of captured moments that tell unique stories
            </p>
          </div>

          {/* Masonry Grid Layout */}
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 auto-rows-[150px] xs:auto-rows-[120px] gap-3 xs:gap-2">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className={`relative group overflow-hidden rounded-lg xs:rounded-md shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:z-10 ${image.span}`}
              >
                <img 
                  src={image.src} 
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Optional: Image number overlay on hover */}
                <div className="absolute bottom-3 left-3 text-white font-playfair text-xs xs:text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Centered Book Now Button */}
          <div className="flex justify-center mt-12 xs:mt-8">
            <Link 
              to="/contact" 
              className="px-6 xs:px-4 py-3 xs:py-2 bg-gradient-to-r from-gold-600 to-yellow-500 text-primary-900 font-bold text-base xs:text-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-playfair"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PhotoVideoPage;