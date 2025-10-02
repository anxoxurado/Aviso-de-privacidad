import React from 'react';

const Categories = () => {
  const categories = [
    { name: 'Ropa de Mujer', gradient: 'linear-gradient(45deg, #ff9a9e, #fecfef)' },
    { name: 'Ropa de Hombre', gradient: 'linear-gradient(45deg, #a8edea, #fed6e3)' },
    { name: 'Accesorios', gradient: 'linear-gradient(45deg, #ffecd2, #fcb69f)' },
    { name: 'Calzado', gradient: 'linear-gradient(45deg, #a1c4fd, #c2e9fb)' }
  ];

  return (
    <section className="py-20 px-8 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12 relative pb-4">
        Comprar por Categoría
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-red-400 to-teal-400"></span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mt-12">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative h-[350px] rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
          >
            <div 
              className="w-full h-full"
              style={{ background: category.gradient }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
            <h3 className="absolute bottom-5 left-5 text-white text-2xl font-bold z-10">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;