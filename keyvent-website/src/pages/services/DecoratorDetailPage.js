import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const DecoratorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decorator, setDecorator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDecorator = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Use the Node.js/Express API endpoint to fetch specific decorator by ID
        const apiUrl = process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in';
        const response = await fetch(`${apiUrl}/api/decorators/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Decorator not found');
          }
          throw new Error(`Failed to fetch decorator: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('API Response:', result); // Debug log
        
        if (result.success && result.decorator) {
          setDecorator(result.decorator);
          console.log('Decorator Data:', result.decorator); // Debug log
          console.log('Images Array:', result.decorator.images); // Debug log
        } else {
          throw new Error('Decorator data not found');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching decorator:', error);
        setError(error.message || 'Failed to load decorator details');
        setLoading(false);
      }
    };

    if (id) {
      fetchDecorator();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Loading decorator details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-red-50 p-8 rounded-lg">
          <p className="text-lg font-medium text-red-700">Error: {error}</p>
          <button 
            onClick={() => navigate('/services/decorators')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Back to Decorators
          </button>
        </div>
      </div>
    );
  }

  if (!decorator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Decorator not found</p>
          <button 
            onClick={() => navigate('/services/decorators')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Back to Decorators
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/services/decorators" 
            className="inline-flex items-center text-primary hover:text-purple-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Decorators
          </Link>
        </div>

        {/* Decorator Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-primary mb-4">
            {decorator.name}
          </h1>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the stunning portfolio of {decorator.name}, transforming spaces with artistic vision and technical excellence.
          </p>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-12">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-pink-200 shadow-xl">
            <img 
              src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${decorator.profileImage}`} 
              alt={decorator.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log('Profile image load error for:', decorator.profileImage); // Debug log
                e.target.src = 'https://placehold.co/400x400/4a9b8f/white?text=No+Image';
              }}
              onLoad={(e) => {
                console.log('Profile image loaded successfully:', decorator.profileImage); // Debug log
              }}
            />
          </div>
        </div>

        {/* Portfolio Gallery */}
        <div className="mb-16">
          <h2 className="font-playfair text-3xl font-bold text-primary mb-8 text-center">
            Portfolio Gallery
          </h2>
          
          {decorator.images && Array.isArray(decorator.images) && decorator.images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {decorator.images.map((image, index) => (
                <div 
                  key={index}
                  className="relative group overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <img 
                    src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${image}`} 
                    alt={`${decorator.name} - Image ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      console.log('Image load error for:', image); // Debug log
                      console.log('Trying fallback URL'); // Debug log
                      e.target.src = 'https://placehold.co/800x600/4a9b8f/white?text=Image+Not+Available';
                    }}
                    onLoad={(e) => {
                      console.log('Image loaded successfully:', image); // Debug log
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Image number overlay on hover */}
                  <div className="absolute bottom-3 left-3 text-white font-playfair text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-medium text-gray-700">No portfolio images available</p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="font-playfair text-3xl font-bold text-primary mb-6">
            Interested in Booking {decorator.name}?
          </h2>
          <p className="font-inter text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us to discuss your decoration needs and schedule a consultation with {decorator.name}.
          </p>
          <Link 
            to="/contact" 
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-playfair inline-block"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DecoratorDetailPage;