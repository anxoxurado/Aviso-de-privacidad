import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthContainer from '../Auth/AuthContainer';
import UserProfile from '../../pages/UserProfile';

const Header = ({ onOpenPrivacy, onOpenAuth, onOpenProfile }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [cartCount] = useState(0);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="bg-black text-white text-center py-2 text-sm">
        🎉 ENVÍO GRATIS en pedidos superiores a $50 | 30% OFF en toda la colección de verano
      </div>

      <nav className="flex justify-between items-center px-8 md:px-12 py-4 bg-white">
        <div
          className="text-2xl md:text-3xl font-bold cursor-pointer"
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          MODA STYLE
        </div>

        <ul className="hidden md:flex gap-8 list-none">
          {['Mujer', 'Hombre', 'Accesorios', 'Ofertas', 'Nuevo'].map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-800 font-medium hover:text-red-400 transition-colors duration-300 bg-transparent border-0 cursor-pointer"
              >
                {item}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={onOpenPrivacy}
              className="text-gray-800 font-medium hover:text-red-400 transition-colors duration-300 bg-transparent border-0 cursor-pointer"
            >
              Privacidad
            </button>
          </li>
        </ul>

        <div className="flex gap-5 text-xl">

          <div className="flex gap-5 text-xl">
            <span className="cursor-pointer hover:scale-110 transition-transform">🔍</span>

            {isAuthenticated ? (
              <div className="relative group">
                <span className="cursor-pointer hover:scale-110 transition-transform">👤</span>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-4">
                    <p className="font-semibold text-gray-800">{user?.nombre}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>

                    {/**Abrir perfil/ */}
                    <button
                      onClick={() => {
                        console.log('Profile button clicked');
                        onOpenProfile();
                      }}
                      className="mt-3 w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Mi Perfil
                    </button>

                    {/**Cerrar sesión */}
                    <button
                      onClick={() => {
                        logout();
                        console.log('Logout button clicked');
                      }}
                      className="mt-2 w-full py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <span
                onClick={onOpenAuth}
                className="cursor-pointer hover:scale-110 transition-transform"
              >
                👤
              </span>
            )}

            <span className="relative cursor-pointer hover:scale-110 transition-transform">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </span>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Header;