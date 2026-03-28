import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdLocationOn, MdPhone, MdEmail, MdShare, MdFavoriteBorder, MdFavorite, MdEventNote, MdChat } from "react-icons/md";
import { FaCheck, FaStar, FaStarHalfAlt, FaRulerCombined } from "react-icons/fa";
import { getImageUrl } from "../utils/imageUtils";

// Mini-component for Hall Cards with Auto-Carousel
const HallCard = ({ 
  hall, 
  isActive, 
  onClick, 
  onImageClick, 
  getImageUrl 
}) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (hall.images && hall.images.length > 1) {
      const timer = setInterval(() => {
        setImgIndex(prev => (prev + 1) % hall.images.length);
      }, 3000); // Change image every 3 seconds
      return () => clearInterval(timer);
    }
  }, [hall.images]);

  return (
    <div 
      onClick={onClick}
      className={`hall-card ${isActive ? 'active' : ''}`}
    >
      <div className="hall-name">{hall.name}</div>
      
      <div className="hall-price-summary">
        ₹{hall.pricing?.price_per_plate_veg?.amount || 'N/A'}/plate
      </div>

      <div className="hall-details-box">
        {/* Capacity */}
        <div className="hall-info-row">
          <div className="hall-icon-symbol">L</div>
          <div className="hall-label-stack">
            <div className="hall-label-title">Capacity</div>
            <div className="hall-label-value">{hall.capacity?.min} - {hall.capacity?.max}</div>
          </div>
        </div>

        {/* Veg */}
        <div className="hall-info-row">
          <div className="hall-icon-wrapper">
            <MdEventNote />
          </div>
          <div className="hall-label-stack">
            <div className="hall-label-title">Veg</div>
            <div className="hall-label-value">₹{hall.pricing?.price_per_plate_veg?.amount || 'N/A'}</div>
          </div>
        </div>

        {/* Non-Veg */}
        <div className="hall-info-row">
          <div className="hall-label-stack">
            <div className="hall-label-title">Non-Veg</div>
            <div className="hall-label-value">
              {hall.pricing?.price_per_plate_non_veg ? `₹${hall.pricing.price_per_plate_non_veg.amount}` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      <div className="hall-footer-section">
        <div className="hall-footer-item">
          <span className="hall-footer-dot"></span>
          <span>Veg ₹{hall.pricing?.price_per_plate_veg?.amount || 'N/A'}</span>
        </div>
        <div className="hall-footer-item">
          <span className="hall-footer-dot"></span>
          <span>Non-Veg {hall.pricing?.price_per_plate_non_veg ? `₹${hall.pricing.price_per_plate_non_veg.amount}` : 'N/A'}</span>
        </div>
      </div>

      {/* Hall Card Gallery - Auto Carousel */}
      {hall.images && hall.images.length > 0 && (
        <div className="hall-card-gallery-v2">
          <img 
            src={getImageUrl(hall.images[imgIndex])}
            alt={`${hall.name} - View ${imgIndex + 1}`}
            className="hall-card-main-img"
            onClick={(e) => {
              e.stopPropagation();
              onImageClick(getImageUrl(hall.images[imgIndex]));
            }}
            onError={(e) => {
              e.target.src = `https://placehold.co/400x200/f8f9fa/adb5bd?text=Hall+Image`;
            }}
          />
          {hall.images.length > 1 && (
            <div className="hall-img-dots">
              {hall.images.map((_, i) => (
                <div key={i} className={`hall-img-dot ${i === imgIndex ? 'active' : ''}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const VenueDetailPage = () => {
  // Inject CSS styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .cta-button-component {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 18px 36px;
        min-width: fit-content;
        width: auto;
        margin: 6px;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        letter-spacing: 0.025em;
        text-align: center;
        text-decoration: none;
        white-space: nowrap;
        background: linear-gradient(135deg, #C5AA7B, #D4B587, #F3E2BC, #D4B587, #C5AA7B);
        background-size: 200% 200%;
        color: #3F1F4F;
        border: none;
        border-radius: 50px;
        box-shadow: 0 8px 25px rgba(197, 170, 123, 0.3);
        cursor: pointer;
        overflow: hidden;
        animation: goldShimmer 3s ease-in-out infinite;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .cta-button-content {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      
      .cta-button-shimmer {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.6s ease;
        z-index: 1;
      }
      
      .cta-button-component:hover {
        transform: scale(1.05) translateY(-2px);
        box-shadow: 0 12px 35px rgba(197, 170, 123, 0.4);
        background-size: 150% 150%;
        animation: goldShimmer 1.5s ease-in-out infinite;
      }
      
      .cta-button-component:hover .cta-button-shimmer {
        left: 100%;
      }
      
      .cta-button-component:active {
        transform: scale(0.98) translateY(0px);
      }
      
      @keyframes goldShimmer {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      
      /* Custom dropdown styles */
      .custom-select-wrapper {
        position: relative;
      }
      
      .custom-select-wrapper::after {
        content: "▼";
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
        pointer-events: none;
        font-size: 0.8rem;
        color: #9CA3AF;
      }

      /* Hall Card Styles */
      .hall-row-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
        padding-bottom: 24px;
      }

      .hall-row-container::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
      }

      .hall-card {
        flex-shrink: 0;
        width: 100%;
        background: #FFFFFF;
        border: 1.5px solid #F3F4F6;
        border-radius: 20px;
        padding: 24px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .hall-card.active {
        border-color: #C5AA7B;
        background: #FFFBEB;
        box-shadow: 0 4px 15px rgba(197, 170, 123, 0.15);
        outline: 4px solid rgba(254, 243, 199, 0.5);
      }

      .hall-name {
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 1.35rem;
        color: #111827;
        margin: 0;
      }

      .hall-price-summary {
        font-size: 1.15rem;
        font-weight: 600;
        color: #374151;
      }

      .hall-details-box {
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding-top: 8px;
        padding-bottom: 8px;
      }

      .hall-info-row {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .hall-icon-symbol {
        font-weight: 900;
        font-size: 1.2rem;
        color: #111827;
        width: 18px;
        display: flex;
        justify-content: center;
      }

      .hall-icon-wrapper {
        color: #374151;
        font-size: 1.1rem;
        width: 18px;
        display: flex;
        justify-content: center;
      }

      .hall-label-stack {
        display: flex;
        flex-direction: column;
      }

      .hall-label-title {
        font-size: 0.95rem;
        font-weight: 700;
        color: #111827;
      }

      .hall-label-value {
        font-size: 1rem;
        font-weight: 500;
        color: #4B5563;
      }

      .hall-footer-section {
        border-top: 1px solid rgba(197, 170, 123, 0.2);
        padding-top: 16px;
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .hall-footer-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.95rem;
        color: #4B5563;
        font-weight: 500;
      }

      .hall-footer-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #C5AA7B;
      }

      .venue-main-layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 32px;
        width: 100%;
      }

      @media (min-width: 1024px) {
        .venue-main-layout {
          grid-template-columns: 2fr 1fr;
        }
      }

      .content-column {
        display: flex;
        flex-direction: column;
        gap: 32px;
        min-width: 0; /* Prevents flex/grid items from overflowing */
      }

      .sidebar-column {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .hall-card-gallery-v2 {
        margin-top: 16px;
        position: relative;
        height: 180px;
        border-radius: 12px;
        overflow: hidden;
      }

      .hall-card-main-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.5s ease-in-out;
      }

      .hall-img-dots {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 6px;
      }

      .hall-img-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
      }

      .hall-img-dot.active {
        background: white;
        width: 12px;
        border-radius: 3px;
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup function to remove the style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [selectedHallIndex, setSelectedHallIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guests: "",
    message: ""
  });

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoSliding || !venue || !venue.images || venue.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => 
        prevIndex === venue.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoSliding, venue]);

  // Fetch venue details from Node.js/Express backend
  useEffect(() => {
    // Validate ID before making API call
    if (!id || id === 'undefined' || id === 'null') {
      setError('Invalid venue ID');
      setLoading(false);
      return;
    }
    
    const fetchVenue = async () => {
      try {
        setLoading(true);
        // Use the Node.js/Express API endpoint
        const apiUrl = process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in';
        const response = await fetch(`${apiUrl}/api/venues/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch venue details: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        
        // Handle different response formats
        if (result.success && result.data && result.data.venue) {
          setVenue(result.data.venue);
        } else if (result.venue) {
          setVenue(result.venue);
        } else if (result) {
          setVenue(result);
        } else {
          throw new Error('Venue not found');
        }
      } catch (err) {
        setError(`Error loading venue: ${err.message}`);
        console.error('Error fetching venue from Node.js API:', err);
        // No fallback to static data - only use API
        setVenue(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);
  
  const handleCallClick = (e) => {
    e.preventDefault();
    setShowPhoneNumber(true);
    
    // Hide the phone number after 5 seconds
    setTimeout(() => {
      setShowPhoneNumber(false);
    }, 5000);
  };
  
  const handleEmailClick = (e) => {
    e.preventDefault();
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=keyvent.in@gmail.com", "_blank");
  };
  
  const handleChatClick = (e) => {
    e.preventDefault();
    window.open("https://wa.me/918595159090", "_blank");
  };
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Use the Node.js/Express API endpoint for contact
      const apiUrl = process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          venueId: venue._id || venue.id,
          venueName: venue.name
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to send inquiry: ${response.status} ${response.statusText}`);
      }
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        guests: "",
        message: ""
      });
      
      // Show success message (you might want to implement a proper notification system)
      alert("Your inquiry has been sent successfully!");
    } catch (err) {
      console.error('Error sending inquiry:', err);
      alert("Failed to send your inquiry. Please try again.");
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-purple-600">Loading venue details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Venue</h2>
          <p className="text-purple-700 mb-4">{error}</p>
          <div className="mb-4 p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-800">
              Debug info: Received ID parameter was: "{id}"
            </p>
          </div>
          <button 
            onClick={() => navigate('/venues')}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg"
          >
            Back to Venues
          </button>
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-amber-600 mb-4">Venue Not Found</h2>
          <button 
            onClick={() => navigate('/venues')}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg"
          >
            Back to Venues
          </button>
        </div>
      </div>
    );
  }

  // Render star ratings
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-amber-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-amber-400" />);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-purple-200" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen  w-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50   w-full">
        <div className="w-full px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/venues')}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-purple-600">Back to Venues</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center gap-1 text-purple-600 hover:text-red-500 transition-colors"
              >
                {isFavorite ? (
                  <MdFavorite className="text-red-500 text-xl" />
                ) : (
                  <MdFavoriteBorder className="text-xl" />
                )}
                <span className="text-purple-600">Save</span>
              </button>
              
              <button className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors">
                <MdShare className="text-xl" />
                <span className="text-purple-600">Share</span>
              </button>
              
              <button className="cta-button-component medium">
                <span className="cta-button-content">Contact</span>
                <div className="cta-button-shimmer"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-8">
        {/* Venue Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">{venue.name}</h1>
              <div className="flex items-center gap-2 text-purple-600 mb-3">
                <MdLocationOn className="text-amber-500" />
                <span className="text-purple-600">{venue.location?.area}, {venue.location?.address}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {renderRatingStars(venue.rating?.score || 0)}
                  <span className="ml-2 font-semibold text-amber-600">{venue.rating?.score || 0}</span>
                  <span className="text-purple-500">({venue.rating?.total_guests || 0} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            {venue.images && venue.images.length > 0 && (
              <>
                <div className="relative" style={{ height: '80vh' }}>
                  <img 
                    src={getImageUrl(venue.images[currentImageIndex])}
                    alt={`${venue.name} - View ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    style={{ height: '80vh' }}
                    onError={(e) => {
                      // Handle broken image URLs including blob URLs by using a placeholder
                      if (venue.images[currentImageIndex] && venue.images[currentImageIndex].startsWith('blob:')) {
                        e.target.src = `https://placehold.co/1200x600/4a9b8f/white?text=${encodeURIComponent(venue.name + ' - Image Unavailable')}`;
                      } else {
                        e.target.src = `https://placehold.co/1200x600/4a9b8f/white?text=${encodeURIComponent(venue.name + ' - View ' + (currentImageIndex + 1))}`;
                      }
                    }}
                  />
                  
                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-purple-900 bg-opacity-50 text-amber-400 px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {venue.images.length}
                  </div>
                  
                  {/* Navigation Arrows */}
                  {venue.images.length > 1 && (
                    <>
                      <button 
                        onClick={() => {
                          setIsAutoSliding(false);
                          setCurrentImageIndex(prev => 
                            prev === 0 ? venue.images.length - 1 : prev - 1
                          );
                        }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-purple-800 p-3 rounded-full transition-all duration-300 shadow-lg"
                        aria-label="Previous image"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setIsAutoSliding(false);
                          setCurrentImageIndex(prev => 
                            prev === venue.images.length - 1 ? 0 : prev + 1
                          );
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-purple-800 p-3 rounded-full transition-all duration-300 shadow-lg"
                        aria-label="Next image"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                
                {/* Thumbnails */}
                {venue.images.length > 1 && (
                  <div className="bg-purple-50 p-4">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {venue.images.map((image, index) => (
                        <div 
                          key={index}
                          onClick={() => {
                            setIsAutoSliding(false);
                            setCurrentImageIndex(index);
                          }}
                          className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 border-2 transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'border-amber-500' 
                              : 'border-purple-300 hover:border-amber-300'
                          }`}
                        >
                          <img 
                            src={getImageUrl(image)}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Handle broken image URLs including blob URLs by using a placeholder
                              if (image && image.startsWith('blob:')) {
                                e.target.src = `https://placehold.co/200x200/4a9b8f/white?text=Image+Unavailable`;
                              } else {
                                e.target.src = `https://placehold.co/200x200/4a9b8f/white?text=Thumb+${index + 1}`;
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="venue-main-layout">
          {/* Left Column - Main Content */}
          <div className="content-column">
            {/* About Section */}
            <div className="bg-white border border-purple-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-amber-600 mb-5 mt-4">About the Venue</h2>
              <p className="text-purple-700 leading-relaxed">
                {venue.description || "No description available for this venue."}
              </p>
            </div>

            {/* Event Spaces */}
            <div className="bg-white border border-purple-100 rounded-3xl p-8 shadow-sm overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 font-inter">Event Spaces</h2>
              
              <div className="hall-row-container">
                {venue.halls && venue.halls.map((hall, index) => (
                  <HallCard 
                    key={index}
                    hall={hall}
                    isActive={selectedHallIndex === index}
                    onClick={() => setSelectedHallIndex(index)}
                    onImageClick={(url) => setFullscreenImage(url)}
                    getImageUrl={getImageUrl}
                  />
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white border border-purple-200 rounded-xl p-6 shadow-sm w-full">
              <h2 className="text-2xl font-bold text-amber-600 mb-6">Amenities & Features</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {venue.special_features && venue.special_features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <FaCheck className="text-amber-500" />
                    <span className="text-purple-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white border border-purple-200 rounded-xl p-6 shadow-sm w-full">
              <h2 className="text-2xl font-bold text-amber-600 mb-6">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {venue.Gallery && venue.Gallery.map((image, index) => (
                  <div 
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setFullscreenImage(getImageUrl(image));
                    }}
                    className="relative rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 aspect-square w-full"
                  >
                    <img 
                      src={getImageUrl(image)}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="sidebar-column">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-purple-50 to-amber-50 border border-purple-200 rounded-2xl p-8 shadow-lg sticky top-24 w-full">
              <h3 className="text-xl font-bold text-amber-600 mb-4">Contact Venue</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-purple-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-purple-800 bg-white"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-purple-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-purple-800 bg-white"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-purple-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-purple-800 bg-white"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-purple-700 mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-purple-800 bg-white"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-purple-700 mb-1">
                    Number of Guests
                  </label>
                  <div className="custom-select-wrapper">
                    <input
                      type="text"
                      id="guests"
                      className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-purple-800 bg-white appearance-none"
                      placeholder="Enter number of guests or select from options"
                      value={formData.guests}
                      onChange={handleInputChange}
                      list="guestOptions"
                    />
                    <datalist id="guestOptions">
                      <option value="50-100">50-100 guests</option>
                      <option value="100-200">100-200 guests</option>
                      <option value="200-300">200-300 guests</option>
                      <option value="300-500">300-500 guests</option>
                      <option value="500+">500+ guests</option>
                    </datalist>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-purple-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="3"
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-purple-800 bg-white"
                    placeholder="Tell us about your event..."
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="cta-button-component large w-full"
                >
                  <span className="cta-button-content">Send Inquiry</span>
                  <div className="cta-button-shimmer"></div>
                </button>
              </form>
            </div>

            {/* Existing Contact Card - Converted to Quick Actions */}
            <div className="bg-white border border-purple-200 rounded-xl p-6 shadow-sm w-full">
              <h3 className="text-xl font-bold text-amber-600 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  className="cta-button-component medium w-full flex items-center justify-center gap-3"
                  onClick={handleCallClick}
                >
                  <MdPhone className="text-xl" />
                  <span>{showPhoneNumber ? "+91 85 95 15 90 90" : "Call Venue"}</span>
                  <div className="cta-button-shimmer"></div>
                </button>

                <button 
                  className="cta-button-component medium w-full flex items-center justify-center gap-3"
                  onClick={handleEmailClick}
                >
                  <MdEmail className="text-xl" />
                  <span>Email Venue</span>
                  <div className="cta-button-shimmer"></div>
                </button>

                <button 
                  className="cta-button-component medium w-full flex items-center justify-center gap-3"
                  onClick={handleChatClick}
                >
                  <MdChat className="text-xl" />
                  <span>Chat Now</span>
                  <div className="cta-button-shimmer"></div>
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white border border-purple-200 rounded-xl p-6 shadow-sm w-full">
              <h3 className="text-xl font-bold text-amber-600 mb-4">Location</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MdLocationOn className="text-amber-500 mt-0.5" />
                  <div>
                    <div className="text-purple-800 font-medium">Address</div>
                    <div className="text-purple-600 text-sm">{venue.location?.address}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FaRulerCombined className="text-amber-500 mt-0.5" />
                  <div>
                    <div className="text-purple-800 font-medium">Area</div>
                    <div className="text-purple-600 text-sm">{venue.location?.area}</div>
                  </div>
                </div>
                
                <button 
                  className="cta-button-component medium w-full"
                  onClick={() => {
                    if (venue.map_link) {
                      window.open(venue.map_link, '_blank');
                    } else {
                      alert('Map link not available for this venue');
                    }
                  }}
                >
                  <span className="cta-button-content">View on Map</span>
                  <div className="cta-button-shimmer"></div>
                </button>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white border border-purple-200 rounded-xl p-6 shadow-sm w-full">
              <h3 className="text-xl font-bold text-amber-600 mb-4">Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaCheck className="text-amber-500" />
                  <span className="text-purple-800">Parking Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheck className="text-amber-500" />
                  <span className="text-purple-800">Air Conditioning</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheck className="text-amber-500" />
                  <span className="text-purple-800">Stage Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheck className="text-amber-500" />
                  <span className="text-purple-800">In-house Catering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 bg-purple-900 bg-opacity-95 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button 
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 text-white bg-purple-800 bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 transition-all duration-300 hover:scale-110 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <img 
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              // Handle broken image URLs including blob URLs by using a placeholder
              if (fullscreenImage && fullscreenImage.startsWith('blob:')) {
                e.target.src = `https://placehold.co/800x600/4a9b8f/white?text=Image+Unavailable`;
              } else {
                e.target.src = `https://placehold.co/800x600/4a9b8f/white?text=Fullscreen+View`;
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VenueDetailPage;