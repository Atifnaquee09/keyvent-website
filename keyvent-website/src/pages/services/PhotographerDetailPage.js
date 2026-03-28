import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PhotographerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPhotographer = async () => {
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
        let photographers = [];
        if (result.success && Array.isArray(result.photographers)) {
          photographers = result.photographers;
        } else if (Array.isArray(result)) {
          photographers = result;
        }
        
        // Find the photographer with the matching ID
        // Note: The API might return _id instead of id, so we check both
        const foundPhotographer = photographers.find(p => 
          p.id === id || p._id === id || p.id?.toString() === id || p._id?.toString() === id
        );
        
        if (foundPhotographer) {
          setPhotographer(foundPhotographer);
        } else {
          setError('Photographer not found');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photographer:', error);
        setError('Failed to load photographer details');
        setLoading(false);
      }
    };

    if (id) {
      fetchPhotographer();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Loading photographer details...</p>
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
            onClick={() => navigate('/services/photo-video')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Back to Photographers
          </button>
        </div>
      </div>
    );
  }

  if (!photographer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Photographer not found</p>
          <button 
            onClick={() => navigate('/services/photo-video')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Back to Photographers
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
            to="/services/photo-video" 
            className="inline-flex items-center text-primary hover:text-purple-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Photographers
          </Link>
        </div>

        {/* Photographer Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-primary mb-4">
            {photographer.name}
          </h1>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the stunning portfolio of {photographer.name}, capturing precious moments with artistic vision and technical excellence.
          </p>
        </div>

        {/* Portfolio Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photographer.images.map((image, index) => (
            <div 
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <img 
                src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${image}`} 
                alt={`${photographer.name} - Image ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/800x600/4a9b8f/white?text=Image+Not+Available';
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

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="font-playfair text-3xl font-bold text-primary mb-6">
            Interested in Booking {photographer.name}?
          </h2>
          <p className="font-inter text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us to discuss your event photography needs and schedule a consultation with {photographer.name}.
          </p>
          <Link 
            to="/contact" 
            className="px-8 py-4 bg-gradient-to-r from-gold-600 to-yellow-500 text-primary-900 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-playfair inline-block"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PhotographerDetailPage;