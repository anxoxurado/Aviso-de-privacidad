import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por suscribirte!');
    setEmail('');
  };

  return (
    <section className="py-16 px-8 text-center text-white" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <h2 className="text-4xl font-bold mb-5">Suscríbete a Nuestro Newsletter</h2>
      <p className="text-xl mb-8">Recibe ofertas exclusivas y las últimas novedades</p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          required
          className="flex-1 px-6 py-4 rounded-full text-gray-800 text-lg outline-none"
        />
        <button
          onClick={handleSubmit}
          className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Suscribirse
        </button>
      </div>
    </section>
  );
};

export default Newsletter;