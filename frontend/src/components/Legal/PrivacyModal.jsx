import React from 'react';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b-2">
          <h2 className="text-3xl font-bold text-gray-800">Aviso de Privacidad</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-red-400 text-white rounded-full text-xl font-bold hover:bg-red-500 transition-all border-0 cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] space-y-6">
          <div>
            <h3 className="text-purple-600 text-xl font-bold mb-3">1. Responsable:</h3>
            <p className="text-gray-600 leading-relaxed">
              ModaStyle S.A. de C.V., con domicilio en Av. Reforma 123, Ciudad de México, México, es responsable del tratamiento de sus datos personales conforme a lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y sus lineamientos aplicables.
            </p>
          </div>

          <div>
            <h3 className="text-purple-600 text-xl font-bold mb-3">2. Datos que se tratan:</h3>
            <p className="text-gray-600 leading-relaxed">
              En ModaStyle recabamos datos personales de manera directa cuando usted nos los proporciona en tienda física, al realizar compras en línea o al suscribirse a nuestras promociones. Los datos que podemos recabar son: Identificación: nombre completo, correo electrónico, teléfono y domicilio. Pago y facturación: datos de tarjetas de pago, RFC y correo para envío de CFDI.
            </p>
          </div>

          <div>
            <h3 className="text-purple-600 text-xl font-bold mb-3">3. Finalidades primarias:</h3>
            <p className="text-gray-600 leading-relaxed">
              Procesar compras de ropa y accesorios. Enviar productos adquiridos. Emitir comprobantes fiscales digitales (CFDI). Atender consultas y brindar servicio al cliente. Cumplir con disposiciones fiscales y legales vigentes.
            </p>
          </div>

          <div>
            <h3 className="text-purple-600 text-xl font-bold mb-3">4. Finalidades secundarias:</h3>
            <p className="text-gray-600 leading-relaxed">
              Enviar promociones y descuentos. Compartir novedades de ModaStyle. Realizar encuestas de satisfacción y análisis de tendencias de consumo.
            </p>
          </div>

          <div>
            <h3 className="text-purple-600 text-xl font-bold mb-3">5. Transferencias:</h3>
            <p className="text-gray-600 leading-relaxed">
              Sus datos podrán ser compartidos con terceros proveedores de servicios, como empresas de paquetería, plataformas de pago, servicios de facturación CFDI y proveedores de hospedaje en la nube.
            </p>
          </div>

          <div>
            <h3 className="text-purple-600 text-xl font-bold mb-3">6. Derechos ARCO:</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Usted tiene derecho a conocer qué datos personales tenemos, para qué los utilizamos y las condiciones de su uso. También puede solicitar la rectificación de su información, cancelación u oponerse a su tratamiento.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Para ejercer sus derechos ARCO, puede enviar una solicitud al correo: privacidad@modastyle.com o al teléfono +52 (55) 5555 5555.
            </p>
          </div>

          <div>
            <h3 className="text-purple-600 text-xl font-bold mb-3">7. Medidas de seguridad:</h3>
            <p className="text-gray-600 leading-relaxed">
              ModaStyle implementa medidas técnicas, administrativas y físicas para proteger sus datos contra accesos no autorizados, pérdida o alteración indebida.
            </p>
          </div>

          <p className="text-gray-500 text-sm mt-8 pt-4 border-t">
            <strong>Última actualización:</strong> 24/09/2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;