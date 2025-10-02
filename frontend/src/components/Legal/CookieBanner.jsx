import React, { useState, useEffect } from 'react';

const CookieBanner = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-4 md:right-auto bg-white border border-gray-300 rounded-xl shadow-2xl p-4 z-40 max-w-md">
      <strong className="block mb-2 text-lg">Uso de datos</strong>
      <p className="text-gray-600 text-sm mb-4">
        Para que estés más informado sobre el uso de tu información te invitamos a que leas nuestro aviso de privacidad.
      </p>
      <div className="flex gap-2">
        <button
          onClick={onOpenPrivacy}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors border-0 cursor-pointer font-medium"
        >
          Leer
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors border-0 cursor-pointer font-medium"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;