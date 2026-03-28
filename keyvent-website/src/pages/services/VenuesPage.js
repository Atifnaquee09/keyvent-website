// src/pages/VenuesPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "../../components/FilterDropdown";
import OptimizedImage from "../../components/OptimizedImage";
import { useRenderTime, useThrottledScroll } from "../../hooks/usePerformance";

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  useEffect(() => {
    if (!isHovered && venue.images && venue.images.length > 1) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
          setIsTransitioning(false);
      }, 600); // Duration matches CSS transition
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, venue.images]);

  const handleCardClick = () => {
    // Log the venue object for debugging
    console.log('Venue object in handleCardClick:', venue);
    
    // Try multiple ways to get the venue ID
    let venueId = null;
    
    // Method 1: Direct properties
    if (venue._id && venue._id !== 'undefined' && venue._id !== 'null') {
      venueId = venue._id;
    } else if (venue.id && venue.id !== 'undefined' && venue.id !== 'null') {
      venueId = venue.id;
    }
    
    // Method 2: Nested properties
    if (!venueId && venue.venueId && venue.venueId !== 'undefined' && venue.venueId !== 'null') {
      venueId = venue.venueId;
    }
    
    // Method 3: Check if it's a string representation of an object
    if (!venueId && typeof venue === 'object' && venue !== null) {
      // Try to find any property that looks like an ID
      const keys = Object.keys(venue);
      for (const key of keys) {
        if ((key.includes('id') || key.includes('Id')) && 
            venue[key] && 
            typeof venue[key] === 'string' && 
            venue[key] !== 'undefined' && 
            venue[key] !== 'null' &&
            venue[key].length > 5) {  // MongoDB IDs are typically longer
          venueId = venue[key];
          break;
        }
      }
    }
    
    console.log('Determined venueId:', venueId);
    
    if (venueId) {
      navigate(`/venue/${venueId}`);
    } else {
      console.error('Could not determine valid venue ID from venue object:', venue);
      // Show an error to the user
      alert('Sorry, there was an error accessing this venue. Please try again.');
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
        setIsTransitioning(false);
      }, 600);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(
          (prev) => (prev - 1 + venue.images.length) % venue.images.length
        );
        setIsTransitioning(false);
      }, 600);
    }
  };

  const handleCallClick = (e) => {
    e.stopPropagation();
    setShowPhoneNumber(true);
    
    // Hide the phone number after 5 seconds
    setTimeout(() => {
      setShowPhoneNumber(false);
    }, 5000);
  };

  return (
    <div
      className="venue-card bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer w-full flex flex-col relative group"
      style={{
        border: "3px solid #C5AA7B",
        boxShadow:
          "0 8px 25px rgba(197, 170, 123, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)",
        background:
          "linear-gradient(145deg, #ffffff 0%, #fefefe 50%, #f8f9fa 100%)",
      }}
      onClick={handleCardClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderImage =
          "linear-gradient(135deg, #D4B587, #F3E2BC, #C5AA7B) 1";
        e.currentTarget.style.boxShadow =
          "0 15px 40px rgba(197, 170, 123, 0.3), 0 8px 20px rgba(0, 0, 0, 0.15)";
        e.currentTarget.style.transform = "translateY(-8px) rotateX(2deg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderImage = "none";
        e.currentTarget.style.border = "3px solid #C5AA7B";
        e.currentTarget.style.boxShadow =
          "0 8px 25px rgba(197, 170, 123, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.transform = "translateY(0) rotateX(0deg)";
      }}
      role="article"
      aria-label={`Venue: ${venue.name}`}
    >
      {/* Top Badge/Label */}
      <div className="absolute top-4 left-4 z-10 transform group-hover:scale-110 transition-transform duration-300">
        <span
          className="px-4 py-2 rounded-full text-sm font-bold text-white shadow-xl backdrop-blur-sm border border-white border-opacity-20"
          style={{
            background:
              "linear-gradient(135deg, rgba(63, 31, 79, 0.95), rgba(139, 74, 107, 0.9))",
            boxShadow: "0 4px 15px rgba(63, 31, 79, 0.4)",
          }}
        >
          {/* <span className="text-yellow-300">⭐</span> FEATURED */}
        </span>
      </div>

      {/* Price Badge - Top Right */}
      <div className="absolute top-4 right-4 z-10 transform group-hover:scale-110 transition-transform duration-300">
        <span
          className="px-4 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm border border-white border-opacity-30"
          style={{
            background:
              "linear-gradient(135deg, #C5AA7B, #D4B587, #F3E2BC, #D4B587, #C5AA7B)",
            backgroundSize: "200% 200%",
            animation: "goldShimmer 3s ease-in-out infinite",
            color: "#3F1F4F",
            boxShadow: "0 4px 15px rgba(197, 170, 123, 0.4)",
          }}
        >
          <span className="text-green-600 font-extrabold">₹</span>50K+
        </span>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5">
        <div className="flex space-x-2 text-yellow-400">
          <span className="animate-pulse text-lg" aria-hidden="true">✨</span>
          <span
            className="animate-bounce text-lg"
            style={{ animationDelay: "0.5s" }}
            aria-hidden="true"
          >
            ⭐
          </span>
          <span
            className="animate-pulse text-lg"
            style={{ animationDelay: "1s" }}
            aria-hidden="true"
          >
            ✨
          </span>
        </div>
      </div>

      <div
        className="relative h-60 bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:h-64 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-50% to-transparent to-100% opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>

        {/* Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-50% to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 z-20"></div>
        {venue.images && venue.images.length > 0 ? (
          <>
            {/* Sliding Images Container */}
            <div
              className="flex transition-transform duration-600 ease-in-out w-full h-full select-none"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
              role="img"
              aria-label={`Images of ${venue.name}`}
            >
              {venue.images.map((image, index) => {
                console.log('Venue image:', image);
                return (
                  <OptimizedImage
                    key={index}
                    src={image}
                    alt={`${venue.name} - View ${index + 1}`}
                    className="w-full h-full object-cover flex-shrink-0 outline-none focus:outline-none select-none"
                    loading="lazy"
                    draggable={false}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <img
              src="/assets/logo.png"
              alt={`${venue.name} - No images available`}
              className="w-3/4 h-3/4 object-contain opacity-70"
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Title Section */}
        <div
          className="px-5 py-4 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #3F1F4F 0%, #5D2E6B 50%, #3F1F4F 100%)",
            backgroundSize: "200% 200%",
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold-600 from-0% to-transparent to-70% opacity-20 rounded-full transform translate-x-10 -translate-y-10"></div>

          <h3 className="px-4 text-xl font-bold text-white mb-2 xs:mb-1 sm:mb-3 text-center font-playfair">
            {venue.name}
          </h3>

          {/* <div className="flex items-center justify-between px-4">
            <div className="flex items-center px-4">
              <div className="flex text-yellow-400 text-sm mr-2 px-2">
                <span className="drop-shadow-sm">⭐</span>
                <span className="drop-shadow-sm">⭐</span>
                <span className="drop-shadow-sm">⭐</span>
                <span className="drop-shadow-sm">⭐</span>
                <span className="drop-shadow-sm">⭐</span>
              </div>
              <span className="text-yellow-400 text-sm font-semibold px-2">
                (4.8)
              </span>
            </div>
          </div> */}
        </div>

        {/* Location & Details */}
        <div
          className="px-4 py-4 flex-grow"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          {/* Address Section */}
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-800 leading-relaxed mb-1">
              {venue.location.address}
            </p>
            <p className="text-xs text-gray-600">
              {venue.location.area}
            </p>
          </div>

          {/* Capacity Info */}
          <div className="flex items-center space-x-4 text-xs text-gray-700">
            <div className="flex items-center space-x-1">
              <span className="text-blue-600" aria-hidden="true">👥</span>
              <span className="font-medium">200-500</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-purple-600" aria-hidden="true">🏢</span>
              <span className="font-medium">3 Halls</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-red-600" aria-hidden="true">🚗</span>
              <span className="font-medium">Parking</span>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, #C5AA7B, #D4B587, #F3E2BC)",
          }}
        >
          <div className="flex items-center space-x-3">
            <button
              className="text-sm font-bold px-8 py-3 rounded-full text-white hover:text-primary-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              style={{
                backgroundColor: "#3F1F4F",
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 12px rgba(63, 31, 79, 0.3)",
              }}
              onClick={handleCallClick}
              aria-label={`Call for ${venue.name}`}
            >
              <span className="text-base" aria-hidden="true">
                {showPhoneNumber ? "+91 85 95 15 90 90" : "📞"}
              </span> {showPhoneNumber ? "" : "Call"}
            </button>
            <button
              className="text-sm font-bold px-8 py-3 rounded-full text-white hover:bg-opacity-95 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                backgroundColor: "#3F1F4F",
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 12px rgba(63, 31, 79, 0.3)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                // Handle view details
              }}
              aria-label={`View details for ${venue.name}`}
            >
              <span className="text-base" aria-hidden="true"></span> View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VenuesPage = () => {
  // Measure render time
  useRenderTime('VenuesPage');
  
  const [filters, setFilters] = useState({
    eventType: "All events",
    rentalPolicy: "",
    foodPolicy: "",
    capacity: "",
    location: "",
    spaceType: "",
    specialFeatures: "",
    budget: "",
    sortBy: "",
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [showOnMap, setShowOnMap] = useState(false);
  const [isFiltersSticky, setIsFiltersSticky] = useState(false);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch venues from Node.js/Express API
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        // Use the Node.js/Express API endpoint
        const apiUrl = process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in';
        const response = await fetch(`${apiUrl}/api/venues`);
        if (!response.ok) {
          throw new Error(`Failed to fetch venues: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        
        // Handle different response formats
        let venuesData = [];
        if (result.success && result.data && result.data.venues) {
          venuesData = result.data.venues;
        } else if (result.venues) {
          venuesData = result.venues;
        } else if (Array.isArray(result)) {
          venuesData = result;
        } else {
          throw new Error('Unexpected response format from venues API');
        }
        
        // Validate that each venue has a valid ID
        const validVenues = venuesData.filter(venue => {
          const venueId = venue._id || venue.id;
          return venueId && venueId !== 'undefined' && venueId !== 'null';
        });
        
        setVenues(validVenues);
      } catch (err) {
        setError(`Failed to connect to the server: ${err.message}`);
        console.error('Error fetching venues:', err);
        // No fallback to static data - only use API
        setVenues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  // Handle scroll to detect when filters should stick
  useThrottledScroll(() => {
    const headerHeight = 200; // Approximate header section height
    setIsFiltersSticky(window.scrollY > headerHeight);
  }, 100);

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      if (
        filters.location &&
        !venue.location.area
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      ) {
        return false;
      }
      if (filters.capacity) {
        const capacityNum = parseInt(filters.capacity, 10);
        const hasMatchingHall = venue.halls.some(
          (hall) =>
            hall.capacity.min <= capacityNum && hall.capacity.max >= capacityNum
        );
        if (!hasMatchingHall) return false;
      }
      if (
        filters.specialFeatures &&
        !venue.special_features.some((feature) =>
          feature.toLowerCase().includes(filters.specialFeatures.toLowerCase())
        )
      ) {
        return false;
      }
      return true;
    });
  }, [venues, filters]);

  const handleFilterChange = (filterType, value) =>
    setFilters((prev) => ({ ...prev, [filterType]: value }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8f4ff", paddingTop: "88px" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading venues...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8f4ff", paddingTop: "88px" }}>
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-5xl mb-4" aria-hidden="true">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 xs:mb-1 sm:mb-3">Error Loading Venues</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gold-600 text-white rounded-full hover:bg-gold-500 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="min-h-screen"
        style={{ backgroundColor: "#f8f4ff", paddingTop: "88px" }}
      >
        {/* Header */}
        <div style={{ backgroundColor: "#3F1F4F" }} className="border-b py-6 xs:py-4 sm:py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-xl xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 xs:mb-1 sm:mb-3 text-center font-playfair">
              Wedding Venues in Delhi NCR
            </h1>
            <p
              className="text-center max-w-4xl mx-auto text-xs xs:text-[10px] sm:text-sm md:text-base"
              style={{ color: "#e5d3f3" }}
            >
              Find the perfect banquet halls, wedding resorts, and venues in Delhi, Gurgaon, and Noida for your special day.
            </p>
          </div>
        </div>

        {/* Filters - Sticky/Fixed */}
        <div
          className={`${
            isFiltersSticky ? "fixed" : "relative"
          } border-b shadow-sm w-full transition-all duration-200`}
          style={{
            top: isFiltersSticky ? "88px" : "auto",
            backgroundColor: isFiltersSticky
              ? "rgba(248, 244, 255, 0.95)"
              : "#f8f4ff",
            borderColor: "#e5d3f3",
            backdropFilter: isFiltersSticky ? "blur(8px)" : "none",
            zIndex: isFiltersSticky ? 45 : "auto",
          }}
        >
          <div className="w-full px-2 xs:px-1 sm:px-4 py-2 xs:py-1 sm:py-3">
            <div className="flex flex-col xs:flex-col sm:flex-row items-start sm:items-center justify-between gap-3 xs:gap-2 sm:gap-4">
              <div
                className="flex flex-wrap items-center gap-2 xs:gap-1 sm:gap-4 w-full sm:w-auto overflow-x-auto"
                style={{ width: "100%" }}
              >
                <FilterDropdown
                  label="All Events"
                  value={filters.eventType}
                  onChange={(value) => handleFilterChange("eventType", value)}
                  variant="primary"
                  isActive={filters.eventType !== "All events"}
                  options={[
                    { value: "All events", label: "All Events" },
                    { value: "wedding", label: "Wedding" },
                    { value: "corporate", label: "Corporate" },
                    { value: "birthday", label: "Birthday" },
                    { value: "anniversary", label: "Anniversary" },
                  ]}
                />

                <FilterDropdown
                  label="Location"
                  value={filters.location}
                  onChange={(value) => handleFilterChange("location", value)}
                  isActive={!!filters.location}
                  options={[
                    { value: "delhi", label: "Delhi" },
                    { value: "gurgaon", label: "Gurgaon" },
                    { value: "noida", label: "Noida" },
                    { value: "faridabad", label: "Faridabad" },
                    { value: "ghaziabad", label: "Ghaziabad" },
                  ]}
                />

                <FilterDropdown
                  label="Capacity"
                  value={filters.capacity}
                  onChange={(value) => handleFilterChange("capacity", value)}
                  isActive={!!filters.capacity}
                  options={[
                    { value: "200", label: "100-300 Guests" },
                    { value: "400", label: "300-500 Guests" },
                    { value: "750", label: "500-1000 Guests" },
                    { value: "1500", label: "1000+ Guests" },
                  ]}
                />

                <FilterDropdown
                  label="Special Features"
                  value={filters.specialFeatures}
                  onChange={(value) =>
                    handleFilterChange("specialFeatures", value)
                  }
                  isActive={!!filters.specialFeatures}
                  options={[
                    { value: "parking", label: "🚗 Parking Available" },
                    { value: "air conditioning", label: "❄️ Air Conditioning" },
                    { value: "stage", label: "🎭 Stage Available" },
                    { value: "dj", label: "🎵 DJ Setup" },
                    { value: "catering", label: "🍽️ In-house Catering" },
                    { value: "decoration", label: "🎨 Decoration Services" },
                  ]}
                />

                <FilterDropdown
                  label="Budget Range"
                  value={filters.budget}
                  onChange={(value) => handleFilterChange("budget", value)}
                  isActive={!!filters.budget}
                  variant="compact"
                  options={[
                    { value: "budget", label: "💰 Under ₹2L" },
                    { value: "mid-range", label: "💳 ₹2L - ₹5L" },
                    { value: "premium", label: "💎 ₹5L - ₹15L" },
                    { value: "luxury", label: "👑 Above ₹15L" },
                  ]}
                />
              </div>

              <button
                onClick={() => setShowOnMap(!showOnMap)}
                className="flex items-center gap-1 xs:gap-1 sm:gap-2 px-2 xs:px-2 sm:px-4 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer hover:shadow-lg bg-yellow-400 flex-shrink-0"
                style={{
                  background: showOnMap
                    ? "linear-gradient(135deg, #C5AA7B, #D4B587, #F3E2BC)"
                    : "#C5AA7B",
                  color: showOnMap ? "#C5AA7B" : "white",
                  transform: showOnMap ? "scale(1.02)" : "scale(1)",
                }}
                aria-pressed={showOnMap}
              >
                📍 <span className="hidden xs:hidden sm:inline">{showOnMap ? "Hide Map" : "Show on Map"}</span><span className="sm:hidden">{showOnMap ? "Map" : "Map"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Spacer when filters are sticky */}
        {isFiltersSticky && <div style={{ height: "76px" }}></div>}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 xs:py-4">
        {/* Results Summary */}
        <div className="mb-6 xs:mb-4">
          <div className="flex flex-col xs:flex-col sm:flex-row items-start sm:items-center justify-between gap-3 xs:gap-2 sm:gap-4 mb-3 xs:mb-2">
            <div className="flex flex-col xs:flex-col sm:flex-row items-start sm:items-center gap-2 xs:gap-1 sm:gap-4 w-full sm:w-auto">
              <h2 className="text-lg xs:text-base sm:text-xl md:text-2xl font-bold text-primary-900 font-playfair">
                Wedding Venues
              </h2>
              <span
                className="inline-block px-3 xs:px-2 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-semibold"
                style={{
                  background: "linear-gradient(135deg, #C5AA7B, #D4B587)",
                  color: "#3F1F4F",
                  lineHeight: "1.5",
                }}
              >
                {filteredVenues.length} venues
              </span>
            </div>

            {/* Sort Options */}
            <div className="w-full xs:w-full sm:w-auto">
              <FilterDropdown
                label="Sort by"
                value={filters.sortBy || ""}
                onChange={(value) => handleFilterChange("sortBy", value)}
                variant="compact"
                options={[
                  { value: "popularity", label: "⭐ Most Popular" },
                  { value: "price-low", label: "💰 Price: Low to High" },
                  { value: "price-high", label: "💎 Price: High to Low" },
                  { value: "rating", label: "🌟 Highest Rated" },
                  { value: "newest", label: "🆕 Newest First" },
                ]}
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.location ||
            filters.capacity ||
            filters.specialFeatures ||
            filters.budget) && (
            <div className="flex flex-wrap items-center space-x-2 mb-3 xs:mb-2">
              <span className="text-xs xs:text-[10px] text-gray-600 font-medium">
                Active filters:
              </span>
              {filters.location && (
                <span className="px-2 xs:px-1.5 py-0.5 xs:py-0 rounded-full text-[10px] xs:text-[8px] font-medium bg-purple-100 text-purple-800 flex items-center space-x-1">
                  <span>📍 {filters.location}</span>
                  <button
                    onClick={() => handleFilterChange("location", "")}
                    className="text-purple-600 hover:text-purple-800 ml-1"
                    aria-label={`Remove ${filters.location} filter`}
                  >
                    ✕
                  </button>
                </span>
              )}
              {filters.capacity && (
                <span className="px-2 xs:px-1.5 py-0.5 xs:py-0 rounded-full text-[10px] xs:text-[8px] font-medium bg-blue-100 text-blue-800 flex items-center space-x-1">
                  <span>
                    👥{" "}
                    {filters.capacity === "200"
                      ? "100-300"
                      : filters.capacity === "400"
                      ? "300-500"
                      : filters.capacity === "750"
                      ? "500-1000"
                      : "1000+"}{" "}
                    guests
                  </span>
                  <button
                    onClick={() => handleFilterChange("capacity", "")}
                    className="text-blue-600 hover:text-blue-800 ml-1"
                    aria-label={`Remove capacity filter`}
                  >
                    ✕
                  </button>
                </span>
              )}
              {filters.specialFeatures && (
                <span className="px-2 xs:px-1.5 py-0.5 xs:py-0 rounded-full text-[10px] xs:text-[8px] font-medium bg-green-100 text-green-800 flex items-center space-x-1">
                  <span>{filters.specialFeatures}</span>
                  <button
                    onClick={() => handleFilterChange("specialFeatures", "")}
                    className="text-green-600 hover:text-green-800 ml-1"
                    aria-label={`Remove ${filters.specialFeatures} filter`}
                  >
                    ✕
                  </button>
                </span>
              )}
              {filters.budget && (
                <span className="px-2 xs:px-1.5 py-0.5 xs:py-0 rounded-full text-[10px] xs:text-[8px] font-medium bg-gold-100 text-primary-900 flex items-center space-x-1">
                  <span>{filters.budget}</span>
                  <button
                    onClick={() => handleFilterChange("budget", "")}
                    className="text-primary-900 hover:text-primary-700 ml-1"
                    aria-label={`Remove ${filters.budget} filter`}
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-3 sm:gap-6">
            {filteredVenues.map((venue, index) => {
              // Ensure we have a valid key
              const key = venue._id || venue.id || `venue-${index}`;
              return (
                <VenueCard key={key} venue={venue} />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 xs:py-6">
            <div className="max-w-md mx-auto">
              <div className="text-5xl xs:text-4xl mb-3" aria-hidden="true">🔍</div>
              <h3 className="text-lg xs:text-base font-semibold text-gray-700 mb-2">
                No venues found
              </h3>
              <p className="text-gray-500 text-sm xs:text-xs mb-3">
                Try adjusting your filters to see more results
              </p>
              <button
                onClick={() =>
                  setFilters({
                    eventType: "All events",
                    rentalPolicy: "",
                    foodPolicy: "",
                    capacity: "",
                    location: "",
                    spaceType: "",
                    specialFeatures: "",
                    budget: "",
                    sortBy: "",
                  })
                }
                className="px-4 xs:px-3 py-2 xs:py-1 rounded-full bg-gold-600 text-primary-900 text-sm xs:text-xs font-semibold hover:bg-gold-500 transition-colors duration-200"
                aria-label="Clear all filters"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VenuesPage;