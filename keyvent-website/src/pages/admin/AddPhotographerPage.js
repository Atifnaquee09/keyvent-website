import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImages } from '../../utils/uploadImages';

const AddPhotographerPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [photographerData, setPhotographerData] = useState({
    name: '',
    images: []
  });

  // Store actual file objects for upload
  const [imageFiles, setImageFiles] = useState([]);

  // Check if user is logged in
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPhotographerData({
      ...photographerData,
      [name]: value
    });
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setPhotographerData({
      ...photographerData,
      images: files.map((file) => URL.createObjectURL(file))
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      console.log('Submitting photographer data:', photographerData);
      console.log('Image files:', imageFiles);
      
      const imageUrls = await uploadImages(imageFiles);
      
      // Then, save the photographer data
      const photographerPayload = {
        name: photographerData.name,
        images: imageUrls
      };
      
      console.log('Saving photographer with payload:', photographerPayload);
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}/api/photographers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(photographerPayload),
      }).catch(err => {
        console.error('Network error during save:', err);
        throw new Error(`Network error during photographer save: ${err.message}`);
      });
      
      console.log('Save response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Save failed with status:', response.status, 'and body:', errorText);
        throw new Error(`Failed to save photographer: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Save result:', result);
      
      setSuccess(true);
      setError('Photographer added successfully!');
      
      // Reset form
      setPhotographerData({
        name: '',
        images: []
      });
      setImageFiles([]);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Error saving photographer:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
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
          <h1 className="text-3xl font-bold font-playfair text-primary">Add New Photographer</h1>
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
              {error || 'Photographer added successfully!'}
            </div>
          </div>
        )}

        {error && !success && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">
              {error}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold font-playfair text-primary mb-4">Photographer Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photographer Name</label>
                <input
                  type="text"
                  name="name"
                  value={photographerData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photographer Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {photographerData.images.map((img, index) => (
                    <div key={index} className="w-24 h-24 rounded-md overflow-hidden border">
                      <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-500">Upload images that showcase the photographer's work</p>
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
              {loading ? 'Adding Photographer...' : 'Add Photographer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPhotographerPage;