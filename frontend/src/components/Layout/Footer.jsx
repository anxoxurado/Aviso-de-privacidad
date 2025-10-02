import React from 'react';

const Footer = ({ onOpenPrivacy }) => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto mb-8">
        <div>
          <h3 className="text-teal-400 text-xl font-bold mb-5">Acerca de Nosotros</h3>
          <p className="text-gray-400 mb-5">
            MODA STYLE es tu destino para las últimas tendencias en moda. Ofrecemos calidad, estilo y precios accesibles.
          </p>
          <div className="flex gap-4">
            {['f', 't', 'i', 'y'].map((icon, i) => (
              <button
                key={i}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-400 hover:scale-110 transition-all duration-300 border-0 cursor-pointer text-white"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-teal-400 text-xl font-bold mb-5">Enlaces Rápidos</h3>
          <ul className="space-y-3 list-none">
            {['Sobre Nosotros', 'Contacto', 'Envíos', 'Devoluciones'].map((link, i) => (
              <li key={i}>
                <button className="text-gray-400 hover:text-teal-400 transition-colors bg-transparent border-0 cursor-pointer text-left p-0">
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-teal-400 text-xl font-bold mb-5">Categorías</h3>
          <ul className="space-y-3 list-none">
            {['Mujer', 'Hombre', 'Accesorios', 'Ofertas'].map((link, i) => (
              <li key={i}>
                <button className="text-gray-400 hover:text-teal-400 transition-colors bg-transparent border-0 cursor-pointer text-left p-0">
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-teal-400 text-xl font-bold mb-5">Atención al Cliente</h3>
          <ul className="space-y-3 text-gray-400 list-none">
            <li>📧 info@modastyle.com</li>
            <li>📞 +1 234 567 890</li>
            <li>🕗 Lun-Vie: 9AM-6PM</li>
            <li>📍 Calle Moda 123, Ciudad</li>
          </ul>
        </div>

        <div>
          <h3 className="text-teal-400 text-xl font-bold mb-5">Privacidad</h3>
          <button
            onClick={onOpenPrivacy}
            className="bg-transparent border-0 text-white text-base cursor-pointer hover:text-teal-400 transition-colors p-0"
          >
            Aviso de privacidad
          </button>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-gray-800 text-gray-500">
        <p>&copy; 2025 MODA STYLE. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;