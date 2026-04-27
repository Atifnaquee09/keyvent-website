import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImages } from '../../utils/uploadImages';

const AddReturnGiftPage = () => {
  const navigate = useNavigate();
  const [returnGiftData, setReturnGiftData] = useState({
    name: '',
    profileImage: '',
    gifts: [{ name: '', image: '', price: '' }]
  });
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [giftImagePreviews, setGiftImagePreviews] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReturnGiftData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGiftChange = (index, field, value) => {
    const updatedGifts = [...returnGiftData.gifts];
    updatedGifts[index][field] = value;
    setReturnGiftData(prev => ({
      ...prev,
      gifts: updatedGifts
    }));

    // Update preview if it's an image field
    if (field === 'image') {
      const updatedPreviews = [...giftImagePreviews];
      updatedPreviews[index] = value;
      setGiftImagePreviews(updatedPreviews);
    }
  };

  const addGiftField = () => {
    setReturnGiftData(prev => ({
      ...prev,
      gifts: [...prev.gifts, { name: '', image: '' }]
    }));
    setGiftImagePreviews(prev => [...prev, '']);
  };

  const removeGiftField = (index) => {
    if (returnGiftData.gifts.length <= 1) return;
    
    const updatedGifts = [...returnGiftData.gifts];
    updatedGifts.splice(index, 1);
    setReturnGiftData(prev => ({
      ...prev,
      gifts: updatedGifts
    }));

    const updatedPreviews = [...giftImagePreviews];
    updatedPreviews.splice(index, 1);
    setGiftImagePreviews(updatedPreviews);
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const urls = await uploadImages([file]);
      if (urls.length === 0) throw new Error('Server returned no image URL');
      setReturnGiftData(prev => ({
        ...prev,
        profileImage: urls[0]
      }));
      setProfileImagePreview(URL.createObjectURL(file));
    } catch (error) {
      console.error('Error uploading profile image:', error);
      setError(`Error uploading profile image: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGiftImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const urls = await uploadImages([file]);
      if (urls.length === 0) throw new Error('Server returned no image URL');
      handleGiftChange(index, 'image', urls[0]);
      const updatedPreviews = [...giftImagePreviews];
      updatedPreviews[index] = URL.createObjectURL(file);
      setGiftImagePreviews(updatedPreviews);
    } catch (error) {
      console.error('Error uploading gift image:', error);
      setError(`Error uploading gift image: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!returnGiftData.name.trim()) {
        throw new Error('Return gift name is required');
      }

      if (!returnGiftData.profileImage) {
        throw new Error('Profile image is required');
      }

      // Validate that each gift has a name and image
      for (let i = 0; i < returnGiftData.gifts.length; i++) {
        const gift = returnGiftData.gifts[i];
        if (!gift.name.trim()) {
          throw new Error(`Gift name is required for gift #${i + 1}`);
        }
        if (!gift.image) {
          throw new Error(`Gift image is required for gift #${i + 1}`);
        }
      }

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}/api/return-gifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnGiftData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to add return gift: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Return gift added successfully:', result);
      
      // Navigate back to admin dashboard
      navigate('/admin');
    } catch (error) {
      console.error('Error adding return gift:', error);
      setError(error.message || 'Failed to add return gift');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="inline-flex items-center text-primary hover:text-purple-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Admin Dashboard
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-8 sm:px-10">
            <h1 className="text-3xl font-bold font-playfair text-white">Add New Return Gift</h1>
            <p className="mt-2 text-purple-100">Create a new return gift profile with multiple gift items</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-10">
            {/* Basic Information */}
            <div className="bg-purple-50 p-6 rounded-2xl shadow-lg border border-purple-100">
              <h2 className="text-xl font-bold font-playfair text-primary mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Gift Name</label>
                  <input
                    type="text"
                    name="name"
                    value={returnGiftData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Enter return gift name"
                    required
                  />
                </div>
                
                {/* Profile Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                  {profileImagePreview && (
                    <div className="mt-2 w-32 h-32 rounded-md overflow-hidden border">
                      <img 
                        src={profileImagePreview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {returnGiftData.profileImage && !profileImagePreview && (
                    <div className="mt-2 w-32 h-32 rounded-md overflow-hidden border">
                      <img 
                        src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${returnGiftData.profileImage}`} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className="mt-1 text-sm text-gray-500">Upload a profile image for this return gift</p>
                </div>
              </div>
            </div>

            {/* Gift Items */}
            <div className="bg-pink-50 p-6 rounded-2xl shadow-lg border border-pink-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold font-playfair text-primary">Gift Items</h2>
                <button
                  type="button"
                  onClick={addGiftField}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Gift
                </button>
              </div>
              
              <div className="space-y-6">
                {returnGiftData.gifts.map((gift, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-medium text-gray-900">Gift Item #{index + 1}</h3>
                      {returnGiftData.gifts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeGiftField(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gift Name</label>
                        <input
                          type="text"
                          value={gift.name}
                          onChange={(e) => handleGiftChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                          placeholder="Enter gift name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input
                          type="number"
                          value={gift.price}
                          onChange={(e) => handleGiftChange(index, 'price', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                          placeholder="Enter price"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gift Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleGiftImageUpload(e, index)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        />
                        {(giftImagePreviews[index] || gift.image) && (
                          <div className="mt-2 w-24 h-24 rounded-md overflow-hidden border">
                            <img 
                              src={giftImagePreviews[index] || `${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${gift.image}`} 
                              alt={`Gift ${index + 1} preview`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all duration-300"
              >
                {loading ? 'Adding Return Gift...' : 'Add Return Gift'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReturnGiftPage;