import React from 'react';

const FeaturedProducts = () => {
  const products = [
    { title: 'Vestido Floral de Verano', price: 39.99, oldPrice: 59.99, badge: 'NUEVO' },
    { title: 'Camisa Casual Premium', price: 45.99, oldPrice: 65.99, badge: '-30%' },
    { title: 'Jeans Slim Fit', price: 59.99, oldPrice: null, badge: null },
    { title: 'Blazer Elegante', price: 89.99, oldPrice: 129.99, badge: 'OFERTA' }
  ];

  return (
    <section id="productos" className="py-20 px-8">
      <h2 className="text-4xl font-bold text-center mb-12 relative pb-4">
        Productos Destacados
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-red-400 to-teal-400"></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mt-12">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 relative"
          >
            {product.badge && (
              <span className="absolute top-3 right-3 bg-red-400 text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                {product.badge}
              </span>
            )}
            
            <div className="w-full h-[350px] bg-gradient-to-br from-gray-200 to-gray-300"></div>
            
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                {product.title}
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-red-400">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                )}
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-red-400 to-teal-400 text-white rounded-lg font-bold hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;