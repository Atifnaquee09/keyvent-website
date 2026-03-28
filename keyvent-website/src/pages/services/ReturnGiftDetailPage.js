import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ReturnGiftDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [returnGift, setReturnGift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReturnGift = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Use the Node.js/Express API endpoint
        const apiUrl = process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in';
        const response = await fetch(`${apiUrl}/api/return-gifts`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch return gifts: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        
        // Find the return gift with the matching ID
        let returnGifts = [];
        if (result.success && Array.isArray(result.returnGifts)) {
          returnGifts = result.returnGifts;
        }
        
        // Find the return gift with the matching ID
        // Note: The API might return _id instead of id, so we check both
        const foundReturnGift = returnGifts.find(rg => 
          rg.id === id || rg._id === id || rg.id?.toString() === id || rg._id?.toString() === id
        );
        
        if (foundReturnGift) {
          setReturnGift(foundReturnGift);
        } else {
          setError('Return gift not found');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching return gift:', error);
        setError('Failed to load return gift details');
        setLoading(false);
      }
    };

    if (id) {
      fetchReturnGift();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Loading return gift details...</p>
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
            onClick={() => navigate('/services/return-gifts')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Back to Return Gifts
          </button>
        </div>
      </div>
    );
  }

  if (!returnGift) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Return gift not found</p>
          <button 
            onClick={() => navigate('/services/return-gifts')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Back to Return Gifts
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
            to="/services/return-gifts" 
            className="inline-flex items-center text-primary hover:text-purple-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Return Gifts
          </Link>
        </div>

        {/* Return Gift Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-primary mb-4">
            {returnGift.name}
          </h1>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the beautiful collection of {returnGift.name}, perfect for your special occasions.
          </p>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-12">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-pink-200 shadow-xl">
            <img 
              src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${returnGift.profileImage}`} 
              alt={returnGift.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://placehold.co/400x400/4a9b8f/white?text=No+Image';
              }}
            />
          </div>
        </div>

        {/* Gift Items Gallery */}
        <div className="mb-16">
          <h2 className="font-playfair text-3xl font-bold text-primary mb-8 text-center">
            Gift Items Collection
          </h2>
          
          {returnGift.gifts && returnGift.gifts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {returnGift.gifts.map((gift, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="rounded-lg overflow-hidden mb-4 shadow-md">
                    <img 
                      src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${gift.image}`} 
                      alt={gift.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/800x600/4a9b8f/white?text=No+Image';
                      }}
                    />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-primary text-center">
                    {gift.name}
                  </h3>
                  {gift.price && (
                    <p className="text-center text-lg font-bold text-pink-600 mt-2">
                      ₹{parseFloat(gift.price).toFixed(2)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-medium text-gray-700">No gift items available</p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="font-playfair text-3xl font-bold text-primary mb-6">
            Interested in This Collection?
          </h2>
          <p className="font-inter text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us to discuss your event needs and book this beautiful return gift collection.
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

export default ReturnGiftDetailPage;