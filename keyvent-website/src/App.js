import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import PerformanceMonitor from './components/PerformanceMonitor';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddVenuePage from './pages/AddVenuePage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import EditVenue from './pages/admin/EditVenue';
import AddPhotographerPage from './pages/admin/AddPhotographerPage';
import AddReturnGiftPage from './pages/admin/AddReturnGiftPage';
import AddMakeoverArtistPage from './pages/admin/AddMakeoverArtistPage';
import AddDecoratorPage from './pages/admin/AddDecoratorPage';

// Service Pages - Lazy loaded
const VenuesPage = React.lazy(() => import('./pages/services/VenuesPage'));
const VenueDetailPage = React.lazy(() => import('./pages/VenueDetailPage'));
const PhotoVideoPage = React.lazy(() => import('./pages/services/PhotoVideoPage'));
const PhotographerDetailPage = React.lazy(() => import('./pages/services/PhotographerDetailPage'));
const DecoratorsPage = React.lazy(() => import('./pages/services/DecoratorsPage'));
const DecoratorDetailPage = React.lazy(() => import('./pages/services/DecoratorDetailPage'));
const MakeoverPage = React.lazy(() => import('./pages/services/MakeoverPage'));
const MakeoverArtistDetailPage = React.lazy(() => import('./pages/services/MakeoverArtistDetailPage'));
const EntertainersPage = React.lazy(() => import('./pages/services/EntertainersPage'));
const ReturnGiftsPage = React.lazy(() => import('./pages/services/ReturnGiftsPage'));
const ReturnGiftDetailPage = React.lazy(() => import('./pages/services/ReturnGiftDetailPage'));
const DestinationPage = React.lazy(() => import('./pages/services/DestinationPage'));
const SpecialsPage = React.lazy(() => import('./pages/services/SpecialsPage'));

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Fixed Contact Number - Right side, golden background, horizontal text */}
        <div
          style={{
            position: "fixed",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: "50",
          }}
        >
          <div
            style={{
              backgroundColor: "#f59e0b", // Direct gold color
              color: "#581c87", // Purple text
              fontWeight: "bold",
              padding: "12px 24px",
              borderRadius: "24px 0 0 24px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              whiteSpace: "nowrap",
            }}
          >
            📞 85 95 15 90 90
          </div>
        </div>

        {/* WhatsApp Chat Button - Fixed in bottom right corner with theme colors */}
        <a
          href="https://wa.me/8595159090"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "100",
            backgroundColor: "#f59e0b", // Golden theme color
            color: "white",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            textDecoration: "none",
            fontSize: "24px",
            border: "2px solid #581c87", // Purple border for contrast
          }}
        >
          <span>💬</span>
        </a>
        
        <Header />
        <main className="flex-grow pt-24 md:pt-28">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/add-venue" element={<AddVenuePage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/add-venue" element={<AddVenuePage />} />
              <Route path="/admin/edit-venue/:id" element={<EditVenue />} />
              <Route path="/admin/add-photographer" element={<AddPhotographerPage />} />
              <Route path="/admin/add-return-gift" element={<AddReturnGiftPage />} />
              <Route path="/admin/add-makeover-artist" element={<AddMakeoverArtistPage />} />
              <Route path="/admin/add-decorator" element={<AddDecoratorPage />} />
              
              {/* Service Routes */}
              <Route path="/services/venues" element={<VenuesPage />} />
              <Route path="/venues" element={<VenuesPage />} />
              <Route path="/venue/:id" element={<VenueDetailPage />} />
              <Route path="/services/photo-video" element={<PhotoVideoPage />} />
              <Route path="/services/photographer/:id" element={<PhotographerDetailPage />} />
              <Route path="/services/decorators" element={<DecoratorsPage />} />
              <Route path="/services/decorator/:id" element={<DecoratorDetailPage />} />
              <Route path="/services/makeover" element={<MakeoverPage />} />
              <Route path="/services/makeover/:id" element={<MakeoverArtistDetailPage />} />
              <Route path="/services/entertainers" element={<EntertainersPage />} />
              <Route path="/services/return-gifts" element={<ReturnGiftsPage />} />
              <Route path="/services/return-gift/:id" element={<ReturnGiftDetailPage />} />
              <Route path="/services/destination" element={<DestinationPage />} />
              <Route path="/services/specials" element={<SpecialsPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <PerformanceMonitor />
      </div>
    </Router>
  );
}

export default App;