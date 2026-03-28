import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddVenuePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [newVenueId, setNewVenueId] = useState(null);
  const [rawInputs, setRawInputs] = useState({
    cuisine: '',
    facilities: '',
    services: '',
    suited_for: ''
  });

  // Form state
  const [venueData, setVenueData] = useState({
    name: '',
    rating: { score: 8.0, status: 'Good', total_guests: 0 },
    location: { address: '', area: '' },
    description: '',
    images: [],
    Gallery: [],
    type: 'Banquet Hall',
    location_type: 'Indoor',
    cuisine: [],
    facilities: [],
    services: [],
    payment_policy: { advance: '50%', cancellation: 'Before 15 days' },
    suited_for: [],
    map_link: '',
    halls: [
      {
        name: 'Main Hall',
        capacity: { min: 100, max: 500 },
        pricing: {
          vegetarian: { min: 2000, max: 3000 },
          non_vegetarian: { min: 2500, max: 3500 }
        },
        images: [],
        imagesPreview: []
      }
    ]
  });

  // State to control visibility of non-vegetarian pricing
  const [showNonVegPricing, setShowNonVegPricing] = useState(true);

  // Store actual file objects for upload
  const [mainImageFiles, setMainImageFiles] = useState([]);
  const [galleryImageFiles, setGalleryImageFiles] = useState([]);
  const [hallImageFiles, setHallImageFiles] = useState([[]]); // Array of arrays for each hall

  // Check if user is logged in
  useEffect(() => {
    const isVenueManager = localStorage.getItem('isVenueManager');
    if (!isVenueManager) {
      navigate('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  // Handle form input changes
  // Handle hall image uploads
  const handleHallImageUpload = (e, index) => {
    const files = Array.from(e.target.files);
    
    // Update files state
    const updatedFiles = [...hallImageFiles];
    updatedFiles[index] = files;
    setHallImageFiles(updatedFiles);
    
    // Update preview state
    const updatedHalls = [...venueData.halls];
    updatedHalls[index].imagesPreview = files.map(file => URL.createObjectURL(file));
    setVenueData({
      ...venueData,
      halls: updatedHalls
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenueData({
      ...venueData,
      [name]: value
    });
  };

  // Handle nested object changes
  const handleNestedChange = (parent, field, value) => {
    setVenueData({
      ...venueData,
      [parent]: {
        ...venueData[parent],
        [field]: value
      }
    });
  };

  // Handle array changes (cuisine, facilities, services, suited_for)
  const handleArrayChange = (field, value) => {
    // Update raw input state for smooth typing
    setRawInputs(prev => ({
      ...prev,
      [field]: value
    }));

    // Parse array for data synchronization (only non-empty items)
    const array = value.split(',').map(item => item.trim()).filter(item => item !== '');
    setVenueData({
      ...venueData,
      [field]: array
    });
  };

  // Handle hall changes
  const handleHallChange = (index, field, value) => {
    const updatedHalls = [...venueData.halls];
    if (field === 'name') {
      updatedHalls[index].name = value;
    } else if (field === 'capacity_min') {
      updatedHalls[index].capacity.min = parseInt(value) || 0;
    } else if (field === 'capacity_max') {
      updatedHalls[index].capacity.max = parseInt(value) || 0;
    } else if (field === 'veg_min') {
      updatedHalls[index].pricing.vegetarian.min = parseInt(value) || 0;
    } else if (field === 'veg_max') {
      updatedHalls[index].pricing.vegetarian.max = parseInt(value) || 0;
    } else if (field === 'non_veg_min') {
      updatedHalls[index].pricing.non_vegetarian.min = parseInt(value) || 0;
    } else if (field === 'non_veg_max') {
      updatedHalls[index].pricing.non_vegetarian.max = parseInt(value) || 0;
    }
    setVenueData({
      ...venueData,
      halls: updatedHalls
    });
  };

  // Add a new hall
  const addHall = () => {
    setVenueData({
      ...venueData,
      halls: [
        ...venueData.halls,
        {
          name: '',
          capacity: { min: 0, max: 0 },
          pricing: { 
            vegetarian: { min: 0, max: 0 }, 
            non_vegetarian: { min: 0, max: 0 } 
          },
          images: [],
          imagesPreview: []
        }
      ]
    });
    setHallImageFiles([...hallImageFiles, []]);
  };

  // Remove a hall
  const removeHall = (index) => {
    const updatedHalls = venueData.halls.filter((_, i) => i !== index);
    setVenueData({ ...venueData, halls: updatedHalls });
    setHallImageFiles(hallImageFiles.filter((_, i) => i !== index));
  };

  // Handle image uploads
  const handleImageUpload = (e, field) => {
    const files = Array.from(e.target.files);

    if (field === 'images') {
      // No limit on main images
      setMainImageFiles(files);
      setMainImageFiles(files);
      setVenueData({
        ...venueData,
        imagesPreview: files.map((file) => URL.createObjectURL(file))
      });
    } else {
      // No limit on gallery images
      setGalleryImageFiles(files);
      setVenueData({
        ...venueData,
        GalleryPreview: files.map((file) => URL.createObjectURL(file))
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setNewVenueId(null);

    try {
      // 1. Upload Main Images
      let mainImageUrls = [];
      if (mainImageFiles.length > 0) {
        const formData = new FormData();
        mainImageFiles.forEach(file => formData.append('images', file));
        
        const uploadResponse = await fetch(`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}/api/upload`, {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) throw new Error('Failed to upload main images');
        const uploadResult = await uploadResponse.json();
        mainImageUrls = uploadResult.images || [];
      }

      // 2. Upload Gallery Images
      let galleryUrls = [];
      if (galleryImageFiles.length > 0) {
        const formData = new FormData();
        galleryImageFiles.forEach(file => formData.append('images', file));
        
        const uploadResponse = await fetch(`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}/api/upload`, {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) throw new Error('Failed to upload gallery images');
        const uploadResult = await uploadResponse.json();
        galleryUrls = uploadResult.images || [];
      }

      // 3. Upload Hall Images
      const hallImageUploadPromises = hallImageFiles.map(async (files, index) => {
        if (files.length === 0) return [];
        
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));
        
        const uploadResponse = await fetch(`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}/api/upload`, {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) throw new Error(`Failed to upload images for hall ${index + 1}`);
        const uploadResult = await uploadResponse.json();
        return uploadResult.images || [];
      });

      const allHallImageUrls = await Promise.all(hallImageUploadPromises);

      // 4. Prepare Final Payload
      const newVenue = {
        name: venueData.name,
        rating: {
          score: venueData.rating.score,
          status: venueData.rating.status,
          total_guests: venueData.rating.total_guests
        },
        location: {
          address: venueData.location.address,
          area: venueData.location.area
        },
        description: venueData.description,
        images: [...mainImageUrls, ...allHallImageUrls.flat()], // Combine venue level and all hall images
        Gallery: galleryUrls,
        cuisine_types: venueData.cuisine,
        special_features: venueData.facilities,
        map_link: venueData.map_link,
        halls: venueData.halls.map((hall, index) => ({
          name: hall.name,
          capacity: {
            min: parseInt(hall.capacity.min) || 0,
            max: parseInt(hall.capacity.max) || 0,
            unit: "people"
          },
          images: allHallImageUrls[index], // Specific images for this hall
          payment_model: "Per plate system",
          pricing: {
            price_per_plate_veg: {
              amount: parseInt(hall.pricing.vegetarian.min) || 0,
              currency: "₹",
              unit: "per person",
              note: "excl. taxes"
            },
            ...(showNonVegPricing && {
              price_per_plate_non_veg: {
                amount: parseInt(hall.pricing.non_vegetarian.min) || 0,
                currency: "₹",
                unit: "per person",
                note: "excl. taxes"
              }
            })
          }
        }))
      };

      // 5. Send data to backend API
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}/api/venues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVenue),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setNewVenueId(result.venue._id);
        
        // Show a success message
        setError('Venue added successfully! It will appear on the venues page shortly.');
        
        // Reset form
        setVenueData({
          name: '',
          rating: { score: 8.0, status: 'Good', total_guests: 0 },
          location: { address: '', area: '' },
          description: '',
          images: [],
          Gallery: [],
          type: 'Banquet Hall',
          location_type: 'Indoor',
          cuisine: [],
          facilities: [],
          services: [],
          payment_policy: { advance: '50%', cancellation: 'Before 15 days' },
          suited_for: [],
          map_link: '',
          halls: [
            {
              name: 'Main Hall',
              capacity: { min: 100, max: 500 },
              pricing: {
                vegetarian: { min: 2000, max: 3000 },
                non_vegetarian: { min: 2500, max: 3500 }
              }
            }
          ]
        });
        setMainImageFiles([]);
        setGalleryImageFiles([]);
        setShowNonVegPricing(true);
        setRawInputs({
          cuisine: '',
          facilities: '',
          services: '',
          suited_for: ''
        });
      } else {
        setError(result.message || 'Failed to add venue. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Error saving venue:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear local storage and navigate to login
    localStorage.removeItem('isVenueManager');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-primary">Add New Venue</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {success && (
          <div className="rounded-md bg-green-50 p-4 mb-6">
            <div className="text-sm text-green-700">
              Venue added successfully! {newVenueId && `Venue ID: ${newVenueId}`}
              The form has been reset for a new entry.
              {newVenueId && (
                <div className="mt-2 text-sm text-green-800">
                  <strong>Next Step:</strong> You can now upload images for this venue.
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">
              {error}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold font-playfair text-primary mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name</label>
                <input
                  type="text"
                  name="name"
                  value={venueData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue Type</label>
                <select
                  id="type"
                  name="type"
                  value={venueData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="Banquet Hall">Banquet Hall</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Resort">Resort</option>
                  <option value="Garden">Garden</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
                <select
                  id="location_type"
                  name="location_type"
                  value={venueData.location_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="Indoor">Indoor</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                <input
                  type="text"
                  value={venueData.location.area}
                  onChange={(e) => handleNestedChange('location', 'area', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                <input
                  type="text"
                  value={venueData.location.address}
                  onChange={(e) => handleNestedChange('location', 'address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={venueData.description}
                  onChange={(e) => handleInputChange({ target: { name: 'description', value: e.target.value } })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              {/* Map Link Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Map Link</label>
                <input
                  type="text"
                  name="map_link"
                  value={venueData.map_link}
                  onChange={handleInputChange}
                  placeholder="https://maps.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
                <p className="mt-1 text-sm text-gray-500">Paste the Google Maps link for this venue</p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold font-playfair text-primary mb-4">Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'images')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {(venueData.imagesPreview || []).map((img, index) => (
                    <div key={index} className="w-24 h-24 rounded-md overflow-hidden border">
                      <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'Gallery')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {(venueData.GalleryPreview || []).map((img, index) => (
                    <div key={index} className="w-24 h-24 rounded-md overflow-hidden border">
                      <img src={img} alt={`Gallery Preview ${index}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Halls */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold font-playfair text-primary">Halls</h2>
              <button
                type="button"
                onClick={addHall}
                className="px-3 py-1 bg-primary text-white rounded-md hover:bg-purple-700 text-sm"
              >
                Add Hall
              </button>
            </div>
            {venueData.halls.map((hall, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Hall {index + 1}</h3>
                  {venueData.halls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHall(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hall Name</label>
                    <input
                      type="text"
                      value={hall.name}
                      onChange={(e) => handleHallChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Min Capacity</label>
                      <input
                        type="number"
                        value={hall.capacity.min}
                        onChange={(e) => handleHallChange(index, 'capacity_min', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
                      <input
                        type="number"
                        value={hall.capacity.max}
                        onChange={(e) => handleHallChange(index, 'capacity_max', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Vegetarian Pricing (₹)</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500">Min</label>
                        <input
                          type="number"
                          value={hall.pricing.vegetarian.min}
                          onChange={(e) => handleHallChange(index, 'veg_min', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Max</label>
                        <input
                          type="number"
                          value={hall.pricing.vegetarian.max}
                          onChange={(e) => handleHallChange(index, 'veg_max', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hall Images</label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleHallImageUpload(e, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(hall.imagesPreview || []).map((img, index) => (
                        <div key={index} className="w-20 h-20 rounded-md overflow-hidden border">
                          <img src={img} alt={`Hall Preview ${index}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Checkbox to toggle Non-Vegetarian Pricing visibility */}
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`show-non-veg-${index}`}
                      checked={showNonVegPricing}
                      onChange={(e) => setShowNonVegPricing(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor={`show-non-veg-${index}`} className="ml-2 block text-sm text-gray-700">
                      Include Non-Vegetarian Pricing
                    </label>
                  </div>
                  {/* Non-Vegetarian Pricing section - conditionally rendered */}
                  {showNonVegPricing && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Non-Vegetarian Pricing (₹)</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-500">Min</label>
                          <input
                            type="number"
                            value={hall.pricing.non_vegetarian.min}
                            onChange={(e) => handleHallChange(index, 'non_veg_min', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500">Max</label>
                          <input
                            type="number"
                            value={hall.pricing.non_vegetarian.max}
                            onChange={(e) => handleHallChange(index, 'non_veg_max', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold font-playfair text-primary mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g., Indian, Chinese, Italian"
                  value={rawInputs.cuisine}
                  onChange={(e) => handleArrayChange('cuisine', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facilities (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g., Wi-Fi, Stage, Parking"
                  value={rawInputs.facilities}
                  onChange={(e) => handleArrayChange('facilities', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Services (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g., Catering, Decoration, Music"
                  value={rawInputs.services}
                  onChange={(e) => handleArrayChange('services', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suited For (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g., Weddings, Birthday Parties"
                  value={rawInputs.suited_for}
                  onChange={(e) => handleArrayChange('suited_for', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all duration-300"
            >
              {loading ? 'Adding Venue...' : 'Add Venue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVenuePage;