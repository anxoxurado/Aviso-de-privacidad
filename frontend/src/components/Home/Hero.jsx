import React from 'react';
const Hero = () => {
  return (
    <section 
      className="mt-24 h-[600px] flex items-center justify-center text-center text-white relative"
      style={{
        background: 'linear-gradient(135deg, rgba(255,107,107,0.9), rgba(78,205,196,0.9))'
      }}
    >
      <div className="z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-5 drop-shadow-lg">
          Nueva Colección 2025
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Descubre las últimas tendencias en moda
        </p>
        <button
          onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-block px-10 py-4 bg-white text-gray-800 rounded-full font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          COMPRAR AHORA
        </button>
      </div>
    </section>
  );
};


export default Hero;