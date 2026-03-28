import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DecoratorsPage = () => {
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecorators = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}/api/decorators`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch decorators: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (result.success && Array.isArray(result.decorators)) {
          setDecorators(result.decorators);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching decorators:', error);
        setError('Failed to load decorators. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDecorators();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading decorators...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
          <p className="text-lg font-medium text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      {/* Hero Section */}
      <section className="relative py-16 xs:py-12 sm:py-20 md:py-24 bg-gradient-to-r from-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl xs:text-3xl sm:text-5xl md:text-6xl font-bold mb-6">
            Professional Decorators
          </h1>
          <p className="font-inter text-xl xs:text-lg sm:text-2xl max-w-3xl mx-auto mb-8">
            Discover our talented team of decorators who transform your spaces with creativity and expertise
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {decorators.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {decorators.map((decorator) => (
              <div 
                key={decorator._id || decorator.id}
                className="bg-white rounded-2xl p-6 xs:p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/services/decorator/${decorator._id || decorator.id}`)}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg">
                    <img 
                      src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${decorator.profileImage}`} 
                      alt={decorator.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/400x400/4a9b8f/white?text=No+Image';
                      }}
                    />
                  </div>
                </div>
                <h3 className="font-playfair text-lg xs:text-base sm:text-xl font-semibold text-primary text-center mb-3">
                  {decorator.name}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No decorators available</h3>
            <p className="text-gray-500">Check back later for our talented decorators.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecoratorsPage;