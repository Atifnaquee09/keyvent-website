import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [returnGifts, setReturnGifts] = useState([]);
  const [makeoverArtists, setMakeoverArtists] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('venues');

  // Check if user is logged in
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch venues, contact submissions, and photographers
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch venues
        const venuesResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/venues`);
        const venuesData = await venuesResponse.json();
        if (venuesData.success) {
          setVenues(venuesData.venues);
        }
        
        // Fetch contact submissions
        const contactResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/contact-submissions`);
        const contactData = await contactResponse.json();
        if (contactData.success) {
          setContactSubmissions(contactData.submissions);
        }
        
        // Fetch photographers
        const photographersResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/photographers`);
        const photographersData = await photographersResponse.json();
        if (photographersData.success) {
          setPhotographers(photographersData.photographers);
        }
              
        // Fetch return gifts
        try {
          const serverUrl = process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in';
          console.log('Fetching return gifts from:', `${serverUrl}/api/return-gifts`);
          const returnGiftsResponse = await fetch(`${serverUrl}/api/return-gifts`);
          console.log('Return gifts response status:', returnGiftsResponse.status);
          const returnGiftsData = await returnGiftsResponse.json();
          console.log('Return gifts data:', returnGiftsData);
          if (returnGiftsData.success) {
            setReturnGifts(returnGiftsData.returnGifts);
            console.log('Set return gifts state:', returnGiftsData.returnGifts);
          }
        } catch (returnGiftsError) {
          console.error('Error fetching return gifts:', returnGiftsError);
        }
        
        // Fetch makeover artists
        try {
          const serverUrl = process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in';
          console.log('Fetching makeover artists from:', `${serverUrl}/api/makeover-artists`);
          const makeoverArtistsResponse = await fetch(`${serverUrl}/api/makeover-artists`);
          console.log('Makeover artists response status:', makeoverArtistsResponse.status);
          const makeoverArtistsData = await makeoverArtistsResponse.json();
          console.log('Makeover artists data:', makeoverArtistsData);
          if (makeoverArtistsData.success) {
            setMakeoverArtists(makeoverArtistsData.makeoverArtists);
            console.log('Set makeover artists state:', makeoverArtistsData.makeoverArtists);
          }
        } catch (makeoverArtistsError) {
          console.error('Error fetching makeover artists:', makeoverArtistsError);
        }
        
        // Fetch decorators
        try {
          const serverUrl = process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in';
          console.log('Fetching decorators from:', `${serverUrl}/api/decorators`);
          const decoratorsResponse = await fetch(`${serverUrl}/api/decorators`);
          console.log('Decorators response status:', decoratorsResponse.status);
          const decoratorsData = await decoratorsResponse.json();
          console.log('Decorators data:', decoratorsData);
          if (decoratorsData.success) {
            setDecorators(decoratorsData.decorators);
            console.log('Set decorators state:', decoratorsData.decorators);
          }
        } catch (decoratorsError) {
          console.error('Error fetching decorators:', decoratorsError);
        }
      } catch (err) {
        setError('Error fetching data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-yellow-400 mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="animate-pulse h-8 w-8 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full"></div>
            </div>
          </div>
          <p className="mt-6 text-xl text-yellow-200 font-medium animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-md bg-purple-900/40 border-b border-yellow-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-3 rounded-2xl shadow-lg transform hover:rotate-6 transition-transform duration-300">
                <svg className="h-8 w-8 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">Admin Dashboard</h1>
                <p className="text-yellow-200 text-sm mt-1">Welcome back! Manage your venues and contacts</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="group relative px-6 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-purple-900 font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/50 transform hover:-translate-y-1"
            >
              <span className="flex items-center space-x-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="rounded-2xl bg-red-500/20 backdrop-blur-md border border-red-400/50 p-4 mb-6 animate-shake">
            <div className="flex items-center space-x-3">
              <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-yellow-100 font-medium">{error}</div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="group relative backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 overflow-hidden shadow-2xl rounded-2xl hover:scale-105 hover:border-yellow-400/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-purple-900/20"></div>
            <div className="relative px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-4 shadow-lg shadow-yellow-500/50 transform group-hover:rotate-12 transition-transform duration-300">
                  <svg className="h-8 w-8 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5 text-right">
                  <dt className="text-sm font-medium text-yellow-300 uppercase tracking-wider mb-2">Total Venues</dt>
                  <dd className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">{venues.length}</dd>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-yellow-500/20">
                <p className="text-xs text-yellow-200/80">Active and ready to book</p>
              </div>
            </div>
          </div>

          <div className="group relative backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 overflow-hidden shadow-2xl rounded-2xl hover:scale-105 hover:border-yellow-400/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-yellow-500/10"></div>
            <div className="relative px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl p-4 shadow-lg shadow-purple-500/50 transform group-hover:rotate-12 transition-transform duration-300">
                  <svg className="h-8 w-8 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 text-right">
                  <dt className="text-sm font-medium text-purple-300 uppercase tracking-wider mb-2">Contact Submissions</dt>
                  <dd className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">{contactSubmissions.length}</dd>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-500/20">
                <p className="text-xs text-purple-200/80">Total inquiries received</p>
              </div>
            </div>
          </div>

          <div className="group relative backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 overflow-hidden shadow-2xl rounded-2xl hover:scale-105 hover:border-yellow-400/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-purple-600/10"></div>
            <div className="relative px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0 bg-gradient-to-br from-yellow-500 via-purple-500 to-purple-600 rounded-2xl p-4 shadow-lg shadow-purple-500/50 transform group-hover:rotate-12 transition-transform duration-300">
                  <svg className="h-8 w-8 text-yellow-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
                  </svg>
                </div>
                <div className="ml-5 text-right">
                  <dt className="text-sm font-medium text-yellow-300 uppercase tracking-wider mb-2">Photographers</dt>
                  <dd className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-purple-300 to-purple-400 bg-clip-text text-transparent">{photographers.length}</dd>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-yellow-500/20">
                <p className="text-xs text-yellow-200/80">Creative professionals</p>
              </div>
            </div>
          </div>

          <div className="group relative backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 overflow-hidden shadow-2xl rounded-2xl hover:scale-105 hover:border-yellow-400/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-yellow-500/10"></div>
            <div className="relative px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl p-4 shadow-lg shadow-purple-500/50 transform group-hover:rotate-12 transition-transform duration-300">
                  <svg className="h-8 w-8 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v11m0 0v3m0-3h3m-3 0H9m12-7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z" />
                  </svg>
                </div>
                <div className="ml-5 text-right">
                  <dt className="text-sm font-medium text-purple-300 uppercase tracking-wider mb-2">Return Gifts</dt>
                  <dd className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">{returnGifts.length}</dd>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-500/20">
                <p className="text-xs text-purple-200/80">Gift collections</p>
              </div>
            </div>
          </div>

          <div className="group relative backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 overflow-hidden shadow-2xl rounded-2xl hover:scale-105 hover:border-yellow-400/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10"></div>
            <div className="relative px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0 bg-gradient-to-br from-pink-500 via-pink-600 to-pink-700 rounded-2xl p-4 shadow-lg shadow-pink-500/50 transform group-hover:rotate-12 transition-transform duration-300">
                  <svg className="h-8 w-8 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-5 text-right">
                  <dt className="text-sm font-medium text-pink-300 uppercase tracking-wider mb-2">Makeover Artists</dt>
                  <dd className="text-4xl font-bold bg-gradient-to-r from-pink-300 to-purple-500 bg-clip-text text-transparent">{makeoverArtists.length}</dd>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-pink-500/20">
                <p className="text-xs text-pink-200/80">Beauty professionals</p>
              </div>
            </div>
          </div>

          <div className="group relative backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 overflow-hidden shadow-2xl rounded-2xl hover:scale-105 hover:border-yellow-400/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-yellow-500/10"></div>
            <div className="relative px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl p-4 shadow-lg shadow-purple-500/50 transform group-hover:rotate-12 transition-transform duration-300">
                  <svg className="h-8 w-8 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-5 text-right">
                  <dt className="text-sm font-medium text-purple-300 uppercase tracking-wider mb-2">Recent Activity</dt>
                  <dd className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                    {contactSubmissions.filter(sub => 
                      new Date(sub.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    ).length}
                  </dd>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-500/20">
                <p className="text-xs text-purple-200/80">Submissions in last 7 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('venues')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'venues'
                ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-purple-900 shadow-lg shadow-yellow-500/50 scale-105'
                : 'backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 text-yellow-200 hover:bg-purple-700/50 hover:border-yellow-400/50'
            }`}
          >
            <span className="flex items-center space-x-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Venues</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('photographers')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'photographers'
                ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-yellow-300 shadow-lg shadow-purple-500/50 scale-105'
                : 'backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 text-yellow-200 hover:bg-purple-700/50 hover:border-yellow-400/50'
            }`}
          >
            <span className="flex items-center space-x-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
              </svg>
              <span>Photographers</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'contacts'
                ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-yellow-300 shadow-lg shadow-purple-500/50 scale-105'
                : 'backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 text-yellow-200 hover:bg-purple-700/50 hover:border-yellow-400/50'
            }`}
          >
            <span className="flex items-center space-x-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact Submissions</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('return-gifts')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'return-gifts'
                ? 'bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 text-yellow-300 shadow-lg shadow-pink-500/50 scale-105'
                : 'backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 text-yellow-200 hover:bg-purple-700/50 hover:border-yellow-400/50'
            }`}
          >
            <span className="flex items-center space-x-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v11m0 0v3m0-3h3m-3 0H9m12-7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z" />
              </svg>
              <span>Return Gifts</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('makeover-artists')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'makeover-artists'
                ? 'bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 text-yellow-300 shadow-lg shadow-pink-500/50 scale-105'
                : 'backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 text-yellow-200 hover:bg-purple-700/50 hover:border-yellow-400/50'
            }`}
          >
            <span className="flex items-center space-x-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Makeover Artists</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('decorators')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'decorators'
                ? 'bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 text-yellow-300 shadow-lg shadow-pink-500/50 scale-105'
                : 'backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 text-yellow-200 hover:bg-purple-700/50 hover:border-yellow-400/50'
            }`}
          >
            <span className="flex items-center space-x-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span>Decorators</span>
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Venues Section */}
          {activeTab === 'venues' && (
            <div className="backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 shadow-2xl overflow-hidden rounded-2xl animate-fadeIn">
              <div className="px-6 py-5 border-b border-yellow-500/30 bg-gradient-to-r from-yellow-500/20 via-purple-600/20 to-transparent">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl leading-6 font-bold text-yellow-300 flex items-center space-x-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>Manage Venues</span>
                    </h2>
                    <p className="text-yellow-200/80 text-sm mt-1">View and manage all venue listings</p>
                  </div>
                  <button
                    onClick={() => navigate('/admin/add-venue')}
                    className="group relative px-6 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-purple-900 font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-500/50 hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add New Venue</span>
                    </span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left bg-green-600 text-white">
                        Venue Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left bg-green-600 text-white">
                        Location
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-right bg-green-600 text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {venues.map((venue, index) => (
                      <tr 
                        key={venue.id} 
                        className="even:bg-gray-100 hover:bg-gray-200"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-md">
                              <span className="text-purple-900 font-bold text-lg">{venue.name.charAt(0)}</span>
                            </div>
                            <div className="font-bold">{venue.name}</div>
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex items-center space-x-2">
                            <span>{venue.location?.area || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right text-sm font-medium">
                          <button
                            onClick={() => navigate(`/admin/edit-venue/${venue.id}`)}
                            className="inline-flex items-center px-4 py-2 bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/30 hover:border-yellow-400/60 rounded-lg mr-2 font-bold transition-all duration-200 hover:scale-105"
                          >
                            <span className="mr-1">Edit</span>
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm('Are you sure you want to delete this venue?')) {
                                try {
                                  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/venues/${venue._id || venue.id}`, {
                                    method: 'DELETE',
                                  });
                                
                                  const result = await response.json();
                                
                                  if (result.success) {
                                    const venuesResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/venues`);
                                    const venuesData = await venuesResponse.json();
                                    if (venuesData.success) {
                                      setVenues(venuesData.venues);
                                    }
                                  } else {
                                    setError(result.message || 'Error deleting venue');
                                  }
                                } catch (err) {
                                  setError('Network error. Please try again.');
                                  console.error('Error deleting venue:', err);
                                }
                              }
                            }}
                            className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 hover:border-red-400/60 rounded-lg font-bold transition-all duration-200 hover:scale-105"
                          >
                            <span className="mr-1">Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {venues.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-700">No venues yet</h3>
                    <p className="mt-2 text-sm text-gray-500">Get started by adding your first venue.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Submissions Section - Table View */}
          {activeTab === 'contacts' && (
            <div className="backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 shadow-2xl overflow-hidden rounded-2xl animate-fadeIn">
              <div className="px-6 py-5 border-b border-yellow-500/30 bg-gradient-to-r from-purple-600/20 via-yellow-500/20 to-transparent">
                <h2 className="text-2xl leading-6 font-bold text-purple-300">
                  Contact Submissions
                </h2>
                <p className="text-purple-200/80 text-sm mt-1">Review customer inquiries and messages</p>
              </div>
              
              {/* Table View for Contact Submissions */}
              <div className="overflow-x-auto">
                {contactSubmissions.length > 0 ? (
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-green-600 text-white">
                          Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-green-600 text-white">
                          Email
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-green-600 text-white">
                          Phone
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-green-600 text-white">
                          Event Date
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-green-600 text-white">
                          Guests
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-green-600 text-white">
                          Venue
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-green-600 text-white">
                          Message
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-green-600 text-white">
                          Submitted
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-500/20">
                      {contactSubmissions.map((submission, index) => (
                        <tr 
                          key={submission.id} 
                          className="even:bg-gray-100 hover:bg-gray-200"
                        >
                          <td className="border border-gray-300 px-4 py-2">
                            {submission.name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {submission.email}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {submission.phone}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {submission.eventDate ? new Date(submission.eventDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }) : 'Not specified'}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {submission.guests || 'Not specified'}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {submission.venueName || 'Not specified'}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <div className="max-w-xs truncate" title={submission.message}>
                              {submission.message || 'No message'}
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {new Date(submission.timestamp).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-700">No submissions yet</h3>
                    <p className="mt-2 text-sm text-gray-500">Contact submissions will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Photographers Section */}
          {activeTab === 'photographers' && (
            <div className="backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 shadow-2xl overflow-hidden rounded-2xl animate-fadeIn">
              <div className="px-6 py-5 border-b border-yellow-500/30 bg-gradient-to-r from-purple-600/20 via-yellow-500/20 to-transparent">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl leading-6 font-bold text-purple-300 flex items-center space-x-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
                      </svg>
                      <span>Manage Photographers</span>
                    </h2>
                    <p className="text-purple-200/80 text-sm mt-1">View and manage all photographers</p>
                  </div>
                  <button
                    onClick={() => navigate('/admin/add-photographer')}
                    className="group relative px-6 py-3 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-yellow-300 font-bold rounded-xl hover:from-purple-600 hover:to-purple-800 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add New Photographer</span>
                    </span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                {photographers.length > 0 ? (
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-green-600 text-white">
                          Photographer Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-green-600 text-white">
                          Images
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right bg-green-600 text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-500/20">
                      {photographers.map((photographer) => (
                        <tr key={photographer._id || photographer.id} className="even:bg-gray-100 hover:bg-gray-200">
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">
                            {photographer.name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <div className="flex flex-wrap gap-2">
                              {photographer.images && photographer.images.length > 0 ? (
                                photographer.images.slice(0, 3).map((image, index) => (
                                  <div key={index} className="w-16 h-16 rounded-md overflow-hidden border">
                                    <img 
                                      src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${image}`} 
                                      alt={`Preview ${index}`} 
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.src = 'https://placehold.co/100x100/4a9b8f/white?text=No+Image';
                                      }}
                                    />
                                  </div>
                                ))
                              ) : (
                                <span className="text-gray-500 text-sm">No images</span>
                              )}
                              {photographer.images && photographer.images.length > 3 && (
                                <div className="w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center border">
                                  <span className="text-gray-700 text-xs font-bold">+{photographer.images.length - 3}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            <button
                              onClick={() => navigate(`/services/photographer/${photographer._id || photographer.id}`)}
                              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-700">No photographers yet</h3>
                    <p className="mt-2 text-sm text-gray-500">Get started by adding your first photographer.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Return Gifts Section */}
          {activeTab === 'return-gifts' && (
            <div className="backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 shadow-2xl overflow-hidden rounded-2xl animate-fadeIn">
              <div className="px-6 py-5 border-b border-yellow-500/30 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-transparent">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl leading-6 font-bold text-purple-300 flex items-center space-x-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v11m0 0v3m0-3h3m-3 0H9m12-7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z" />
                      </svg>
                      <span>Manage Return Gifts</span>
                    </h2>
                    <p className="text-purple-200/80 text-sm mt-1">View and manage all return gift collections</p>
                  </div>
                  <button
                    onClick={() => navigate('/admin/add-return-gift')}
                    className="group relative px-6 py-3 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 text-yellow-300 font-bold rounded-xl hover:from-pink-600 hover:to-pink-800 transition-all duration-300 shadow-lg shadow-pink-500/50 hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add New Return Gift</span>
                    </span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                {returnGifts.length > 0 ? (
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-pink-600 text-white">
                          Return Gift Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-pink-600 text-white">
                          Profile Image
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-pink-600 text-white">
                          Gift Items
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-pink-600 text-white">
                          Prices
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right bg-pink-600 text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-500/20">
                      {returnGifts.map((returnGift) => (
                        <tr key={returnGift._id || returnGift.id} className="even:bg-gray-100 hover:bg-gray-200">
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">
                            {returnGift.name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <div className="w-16 h-16 rounded-md overflow-hidden border">
                              <img 
                                src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${returnGift.profileImage}`} 
                                alt={`${returnGift.name} profile`} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://placehold.co/100x100/4a9b8f/white?text=No+Image';
                                }}
                              />
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <div className="flex flex-wrap gap-2">
                              {returnGift.gifts && returnGift.gifts.length > 0 ? (
                                returnGift.gifts.slice(0, 3).map((gift, index) => (
                                  <div key={index} className="w-16 h-16 rounded-md overflow-hidden border">
                                    <img 
                                      src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${gift.image}`} 
                                      alt={`${gift.name} preview`} 
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.src = 'https://placehold.co/100x100/4a9b8f/white?text=No+Image';
                                      }}
                                    />
                                  </div>
                                ))
                              ) : (
                                <span className="text-gray-500 text-sm">No gifts</span>
                              )}
                              {returnGift.gifts && returnGift.gifts.length > 3 && (
                                <div className="w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center border">
                                  <span className="text-gray-700 text-xs font-bold">+{returnGift.gifts.length - 3}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {returnGift.gifts && returnGift.gifts.map((gift, index) => (
                              <div key={index} className="text-sm">
                                {gift.price ? `₹${parseFloat(gift.price).toFixed(2)}` : 'No price'}
                              </div>
                            ))}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            <button
                              onClick={() => alert('View return gift details (to be implemented)')}
                              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-700">No return gifts yet</h3>
                    <p className="mt-2 text-sm text-gray-500">Get started by adding your first return gift collection.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Makeover Artists Section */}
          {activeTab === 'makeover-artists' && (
            <div className="backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 shadow-2xl overflow-hidden rounded-2xl animate-fadeIn">
              <div className="px-6 py-5 border-b border-yellow-500/30 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-transparent">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl leading-6 font-bold text-purple-300 flex items-center space-x-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Manage Makeover Artists</span>
                    </h2>
                    <p className="text-purple-200/80 text-sm mt-1">View and manage all makeover artists</p>
                  </div>
                  <button
                    onClick={() => navigate('/admin/add-makeover-artist')}
                    className="group relative px-6 py-3 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 text-yellow-300 font-bold rounded-xl hover:from-pink-600 hover:to-pink-800 transition-all duration-300 shadow-lg shadow-pink-500/50 hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add New Makeover Artist</span>
                    </span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                {makeoverArtists.length > 0 ? (
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-pink-600 text-white">
                          Artist Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-pink-600 text-white">
                          Profile Image
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-pink-600 text-white">
                          Images Count
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right bg-pink-600 text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-500/20">
                      {makeoverArtists.map((artist) => (
                        <tr key={artist._id || artist.id} className="even:bg-gray-100 hover:bg-gray-200">
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">
                            {artist.name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <div className="w-16 h-16 rounded-md overflow-hidden border">
                              <img 
                                src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${artist.profileImage}`} 
                                alt={`${artist.name} profile`} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://placehold.co/100x100/4a9b8f/white?text=No+Image';
                                }}
                              />
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
                              {artist.images ? artist.images.length : 0} Images
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            <button
                              onClick={() => alert('View makeover artist details (to be implemented)')}
                              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-700">No makeover artists yet</h3>
                    <p className="mt-2 text-sm text-gray-500">Get started by adding your first makeover artist.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Decorators Section */}
          {activeTab === 'decorators' && (
            <div className="backdrop-blur-md bg-purple-800/40 border border-yellow-500/30 shadow-2xl overflow-hidden rounded-2xl animate-fadeIn">
              <div className="px-6 py-5 border-b border-yellow-500/30 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-transparent">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl leading-6 font-bold text-purple-300 flex items-center space-x-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      <span>Manage Decorators</span>
                    </h2>
                    <p className="text-purple-200/80 text-sm mt-1">View and manage all decorators</p>
                  </div>
                  <button
                    onClick={() => navigate('/admin/add-decorator')}
                    className="group relative px-6 py-3 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 text-yellow-300 font-bold rounded-xl hover:from-pink-600 hover:to-pink-800 transition-all duration-300 shadow-lg shadow-pink-500/50 hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add New Decorator</span>
                    </span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                {decorators.length > 0 ? (
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-pink-600 text-white">
                          Decorator Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-pink-600 text-white">
                          Profile Image
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left bg-pink-600 text-white">
                          Images Count
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right bg-pink-600 text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-500/20">
                      {decorators.map((decorator) => (
                        <tr key={decorator._id || decorator.id} className="even:bg-gray-100 hover:bg-gray-200">
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">
                            {decorator.name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <div className="w-16 h-16 rounded-md overflow-hidden border">
                              <img 
                                src={`${process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in'}${decorator.profileImage}`} 
                                alt={`${decorator.name} profile`} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://placehold.co/100x100/4a9b8f/white?text=No+Image';
                                }}
                              />
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
                              {decorator.images ? decorator.images.length : 0} Images
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            <button
                              onClick={() => alert('View decorator details (to be implemented)')}
                              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-700">No decorators yet</h3>
                    <p className="mt-2 text-sm text-gray-500">Get started by adding your first decorator.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-shake {
          animation: shake 0.5s;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;