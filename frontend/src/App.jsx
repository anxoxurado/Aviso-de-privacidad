import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import AuthContainer from './components/Auth/AuthContainer';
import UserProfile from './pages/UserProfile';
import Hero from './components/Home/Hero.jsx';
import Categories from './components/Home/Categories.jsx';
import FeaturedProducts from './components/Home/FeaturedProducts.jsx';
import Newsletter from './components/Layout/Newsletter.jsx';
import Footer from './components/Layout/Footer.jsx';
import Header from './components/Layout/Header.jsx';
import PrivacyModal from './components/Legal/PrivacyModal.jsx';
import CookieBanner from './components/Legal/CookieBanner.jsx';

const App = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { login } = useAuth();
  const { user, token, isAuthenticated, logout } = useAuth();

  const handleLoginSuccess = (token, userData) => {
    console.log('handleLoginSuccess:', token, userData);
    login(token, userData);
    setIsAuthOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Header
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <CookieBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {isAuthOpen && (
        <div className="fixed inset-0 z-50">
          <AuthContainer
            initialView="login"
            onClose={() => setIsAuthOpen(false)}
          />

        </div>
      )}

      {isProfileOpen && (
        <div className="fixed inset-0 z-50 overflow-auto">
          <UserProfile
            user={user}
            token={token}
            isAuthenticated={isAuthenticated}
            onLogout={logout}
            onClose={() => setIsProfileOpen(false)}
            onOpenAuth={() => {
              setIsProfileOpen(false);
              // Aquí abres tu modal de login
            }}
          />
        </div>
      )}

    </div>
  );
};

export default App;