import React from 'react';

const TestVenueSimple = () => {
  // Test data to ensure component works
  const testVenue = {
    id: 1,
    name: "Test Venue",
    location: {
      address: "123 Test Street",
      area: "Test Area"
    },
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400"
    ]
  };

  const SimpleVenueCard = ({ venue }) => {
    console.log('Rendering venue:', venue);
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-4 border-yellow-400 w-full max-w-sm mx-auto">
        {/* Carousel Images Section */}
        <div className="relative w-full h-48 bg-teal-600 overflow-hidden">
          {venue.images && venue.images.length > 0 ? (
            <img 
              src={venue.images[0]} 
              alt={venue.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                console.log('Image error:', e);
                e.target.src = `https://via.placeholder.com/400x192/4a9b8f/white?text=Test+Image`;
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
              Carousel Images
            </div>
          )}
        </div>
        
        {/* Venue Name Section */}
        <div className="bg-blue-600 text-white px-4 py-3">
          <h3 className="text-lg font-semibold truncate">{venue.name}</h3>
        </div>
        
        {/* Venue Location Section */}
        <div className="bg-red-800 text-white px-4 py-3">
          <p className="text-sm truncate">{venue.location.address}</p>
          <p className="text-xs opacity-90 mt-1 truncate">{venue.location.area}</p>
        </div>
      </div>
    );
  };

  console.log('TestVenueSimple rendered');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Test Venue Card</h1>
      <div className="flex justify-center">
        <SimpleVenueCard venue={testVenue} />
      </div>
      <div className="text-center mt-4">
        <p>Check browser console for debug info</p>
      </div>
    </div>
  );
};

export default TestVenueSimple;