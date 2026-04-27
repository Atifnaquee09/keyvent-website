import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImages } from '../../utils/uploadImages';

const AddMakeoverArtistPage = () => {
  const navigate = useNavigate();
  const [makeoverArtistData, setMakeoverArtistData] = useState({
    name: '',
    profileImage: '',
    images: []
  });
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMakeoverArtistData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const urls = await uploadImages([file]);
      if (urls.length === 0) throw new Error('Server returned no image URL');
      setMakeoverArtistData(prev => ({
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

  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setLoading(true);
      const uploadedImages = await uploadImages(files);
      setMakeoverArtistData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    } catch (error) {
      console.error('Error uploading images:', error);
      setError(`Error uploading images: ${error.message}`);
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
      if (!makeoverArtistData.name.trim()) {
        throw new Error('Makeover artist name is required');
      }

      if (!makeoverArtistData.profileImage) {
        throw new Error('Profile image is required');
      }

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}/api/makeover-artists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(makeoverArtistData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to add makeover artist: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Makeover artist added successfully:', result);
      
      // Navigate back to admin dashboard
      navigate('/admin');
    } catch (error) {
      console.error('Error adding makeover artist:', error);
      setError(error.message || 'Failed to add makeover artist');
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
            <h1 className="text-3xl font-bold font-playfair text-white">Add New Makeover Artist</h1>
            <p className="mt-2 text-purple-100">Create a new makeover artist profile with images</p>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Makeover Artist Name</label>
                  <input
                    type="text"
                    name="name"
                    value={makeoverArtistData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Enter makeover artist name"
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
                  {makeoverArtistData.profileImage && !profileImagePreview && (
                    <div className="mt-2 w-32 h-32 rounded-md overflow-hidden border">
                      <img 
                        src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${makeoverArtistData.profileImage}`} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className="mt-1 text-sm text-gray-500">Upload a profile image for this makeover artist</p>
                </div>
              </div>
            </div>

            {/* Collection Images */}
            <div className="bg-pink-50 p-6 rounded-2xl shadow-lg border border-pink-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold font-playfair text-primary">Collection Images</h2>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
                <p className="mt-1 text-sm text-gray-500">Select multiple images to upload for this artist's collection</p>
              </div>

              {makeoverArtistData.images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Images ({makeoverArtistData.images.length})</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {makeoverArtistData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <div className="w-full h-32 rounded-md overflow-hidden border">
                          <img 
                            src={imagePreviews[index] || `${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${image}`} 
                            alt={`Image ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all duration-300"
              >
                {loading ? 'Adding Makeover Artist...' : 'Add Makeover Artist'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMakeoverArtistPage;