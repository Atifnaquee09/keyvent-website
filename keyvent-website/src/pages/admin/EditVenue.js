import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUtils';

const EditVenue = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [venueData, setVenueData] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [rawInputs, setRawInputs] = useState({
    cuisine_types: '',
    special_features: ''
  });

  // Fetch venue data on component mount
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/venues`);
        const result = await response.json();
        
        if (result.success) {
          const venue = result.venues.find(v => (v._id || v.id).toString() === id);
          if (venue) {
            setVenueData(venue);
            setRawInputs({
              cuisine_types: (venue.cuisine_types || []).join(', '),
              special_features: (venue.special_features || []).join(', ')
            });
          } else {
            setError('Venue not found');
          }
        } else {
          setError(result.message || 'Error fetching venue');
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error('Error fetching venue:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) {
      fetchVenue();
    }
  }, [id]);

  // Handle form input changes
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

  // Handle array changes
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
    } else if (field === 'veg_price') {
      updatedHalls[index].pricing.price_per_plate_veg.amount = parseInt(value) || 0;
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
          name: 'New Hall',
          capacity: { min: 100, max: 500, unit: 'people' },
          payment_model: 'Per plate system',
          pricing: {
            price_per_plate_veg: {
              amount: 2000,
              currency: '₹',
              unit: 'per person',
              note: 'excl. taxes'
            }
          }
        }
      ]
    });
  };

  // Remove a hall
  const removeHall = (index) => {
    if (venueData.halls.length > 1) {
      const updatedHalls = [...venueData.halls];
      updatedHalls.splice(index, 1);
      setVenueData({
        ...venueData,
        halls: updatedHalls
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/venues/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venueData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message || 'Error updating venue');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error updating venue:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle image uploads
  const handleImageUpload = async (e, field) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) {
      setError('No files selected');
      return;
    }
    
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
      
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Update venue data with uploaded image URLs
        if (field === 'images') {
          setVenueData({
            ...venueData,
            images: [...venueData.images, ...result.images]
          });
        } else {
          setVenueData({
            ...venueData,
            Gallery: [...venueData.Gallery, ...result.images]
          });
        }
        setSuccess(true);
      } else {
        setError(result.message || 'Error uploading images');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error uploading images:', err);
    }
  };

  // Handle delete venue
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this venue? This action cannot be undone.')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/venues/${id}`, {
          method: 'DELETE',
        });

        const result = await response.json();

        if (result.success) {
          navigate('/admin');
        } else {
          setError(result.message || 'Error deleting venue');
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error('Error deleting venue:', err);
      }
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-amber-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400 mx-auto"></div>
          <p className="mt-4 text-amber-100 text-lg font-medium">Loading venue...</p>
        </div>
      </div>
    );
  }

  if (error && !venueData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-amber-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-playfair text-white flex items-center">
              <svg className="w-8 h-8 mr-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Venue
            </h1>
            <button
              onClick={() => navigate('/admin')}
              className="px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {error}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!venueData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-amber-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-playfair text-white flex items-center">
              <svg className="w-8 h-8 mr-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Venue
            </h1>
            <button
              onClick={() => navigate('/admin')}
              className="px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Venue not found.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-amber-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-white flex items-center">
            <svg className="w-8 h-8 mr-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Venue
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/admin')}
              className="px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Venue
            </button>
          </div>
        </div>

        {success && (
          <div className="rounded-md bg-green-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Venue updated successfully!
                </h3>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {error}
                </h3>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-purple-200">
            <h2 className="text-xl font-bold font-playfair text-purple-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">Venue Name</label>
                <input
                  type="text"
                  name="name"
                  value={venueData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-purple-900 bg-purple-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">Area</label>
                <input
                  type="text"
                  value={venueData.location?.area || ''}
                  onChange={(e) => handleNestedChange('location', 'area', e.target.value)}
                  className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-purple-900 bg-purple-50"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-purple-700 mb-1">Full Address</label>
                <input
                  type="text"
                  value={venueData.location?.address || ''}
                  onChange={(e) => handleNestedChange('location', 'address', e.target.value)}
                  className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-purple-900 bg-purple-50"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-purple-700 mb-1">Description</label>
                <textarea
                  value={venueData.description || ''}
                  onChange={(e) => handleInputChange({ target: { name: 'description', value: e.target.value } })}
                  rows={4}
                  className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-purple-900 bg-purple-50"
                  required
                />
              </div>
            </div>
          </div>

          {/* Halls Information */}
          <div className="bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold font-playfair text-purple-800 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Halls Information
              </h2>
              <button
                type="button"
                onClick={addHall}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-bold flex items-center transform hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Hall
              </button>
            </div>
            {venueData.halls && venueData.halls.map((hall, index) => (
              <div key={index} className="border border-purple-200 rounded-lg p-4 mb-4 bg-purple-50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-purple-800">Hall {index + 1}</h3>
                  {venueData.halls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHall(index)}
                      className="text-red-600 hover:text-red-800 font-bold flex items-center"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">Hall Name</label>
                    <input
                      type="text"
                      value={hall.name || ''}
                      onChange={(e) => handleHallChange(index, 'name', e.target.value)}
                      className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-purple-900 bg-purple-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">Capacity (Min-Max)</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        value={hall.capacity?.min || 0}
                        onChange={(e) => handleHallChange(index, 'capacity_min', e.target.value)}
                        className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-purple-900 bg-purple-50"
                      />
                      <input
                        type="number"
                        value={hall.capacity?.max || 0}
                        onChange={(e) => handleHallChange(index, 'capacity_max', e.target.value)}
                        className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-purple-900 bg-purple-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">Vegetarian Price (₹)</label>
                    <input
                      type="number"
                      value={hall.pricing?.price_per_plate_veg?.amount || 0}
                      onChange={(e) => handleHallChange(index, 'veg_price', e.target.value)}
                      className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-purple-900 bg-purple-50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Upload Section */}
          <div className="bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-purple-200">
            <h2 className="text-xl font-bold font-playfair text-purple-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Venue Images
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">Cover Images</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-purple-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-purple-600"><span className="font-semibold">Click to upload</span></p>
                      <p className="text-xs text-purple-500">PNG, JPG, GIF (MAX. 10MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      multiple 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, 'images')}
                    />
                  </label>
                </div>
                {venueData.images && venueData.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-purple-700 mb-2">Uploaded Images:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {venueData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={getImageUrl(image)} 
                            alt={`Venue ${index}`} 
                            className="w-full h-20 object-cover rounded-lg border border-purple-200"
                            onError={(e) => {
                              e.target.src = 'https://placehold.co/200x200/4a9b8f/white?text=No+Image';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">Gallery Images</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-purple-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-purple-600"><span className="font-semibold">Click to upload</span></p>
                      <p className="text-xs text-purple-500">PNG, JPG, GIF (MAX. 10MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      multiple 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, 'Gallery')}
                    />
                  </label>
                </div>
                {venueData.Gallery && venueData.Gallery.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-purple-700 mb-2">Gallery Images:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {venueData.Gallery.map((image, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={getImageUrl(image)} 
                            alt={`Gallery ${index}`} 
                            className="w-full h-20 object-cover rounded-lg border border-purple-200"
                            onError={(e) => {
                              e.target.src = 'https://placehold.co/200x200/4a9b8f/white?text=No+Image';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-purple-200">
            <h2 className="text-xl font-bold font-playfair text-purple-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Additional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">Cuisine Types (comma separated)</label>
                <input
                  type="text"
                  value={rawInputs.cuisine_types}
                  onChange={(e) => handleArrayChange('cuisine_types', e.target.value)}
                  className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-purple-900 bg-purple-50"
                  placeholder="e.g., Indian, Chinese, Italian"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">Special Features (comma separated)</label>
                <input
                  type="text"
                  value={rawInputs.special_features}
                  onChange={(e) => handleArrayChange('special_features', e.target.value)}
                  className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-purple-900 bg-purple-50"
                  placeholder="e.g., Parking, Air Conditioning, Stage"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 font-bold flex items-center transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Venue...
                </span>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Venue
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVenue;