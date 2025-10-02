import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { useAuth } from '../../context/AuthContext'; // importa el contexto

// ==================== MODALES LEGALES ====================
const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b-2">
          <h2 className="text-2xl font-bold text-gray-800">Aviso de Privacidad</h2>
          <button onClick={onClose} className="w-10 h-10 bg-red-400 text-white rounded-full text-xl font-bold hover:bg-red-500 transition-all">×</button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4 text-sm">
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">1. Responsable:</h3>
            <p className="text-gray-600 leading-relaxed">ModaStyle S.A. de C.V., con domicilio en Av. Reforma 123, Ciudad de México, México, es responsable del tratamiento de sus datos personales.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">2. Datos que se tratan:</h3>
            <p className="text-gray-600 leading-relaxed">Recabamos: nombre, correo electrónico, teléfono, domicilio, datos de pago y RFC para facturación.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">3. Finalidades:</h3>
            <p className="text-gray-600 leading-relaxed">Procesar compras, enviar productos, emitir CFDI, atender consultas y cumplir disposiciones legales.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">4. Derechos ARCO:</h3>
            <p className="text-gray-600 leading-relaxed">Puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición contactando a: privacidad@modastyle.com o +52 (55) 5555 5555</p>
          </div>
          <p className="text-gray-500 text-xs pt-4 border-t">Última actualización: 24/09/2025</p>
        </div>
      </div>
    </div>
  );
};

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b-2">
          <h2 className="text-2xl font-bold text-gray-800">Términos y Condiciones</h2>
          <button onClick={onClose} className="w-10 h-10 bg-red-400 text-white rounded-full text-xl font-bold hover:bg-red-500 transition-all">×</button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4 text-sm">
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">1. Aceptación de Términos</h3>
            <p className="text-gray-600 leading-relaxed">Al acceder y utilizar MODA STYLE, usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe usar nuestros servicios.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">2. Uso del Sitio</h3>
            <p className="text-gray-600 leading-relaxed">Usted se compromete a utilizar el sitio únicamente para fines legales. Queda prohibido: publicar contenido ofensivo, intentar vulnerar la seguridad del sitio, copiar o distribuir contenido sin autorización, o usar el sitio para actividades fraudulentas.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">3. Cuenta de Usuario</h3>
            <p className="text-gray-600 leading-relaxed">Es responsable de mantener la confidencialidad de su contraseña. Cualquier actividad realizada bajo su cuenta será su responsabilidad. Debe notificarnos inmediatamente sobre cualquier uso no autorizado.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">4. Productos y Precios</h3>
            <p className="text-gray-600 leading-relaxed">Nos esforzamos por mostrar información precisa de productos y precios. Los precios pueden cambiar sin previo aviso. Nos reservamos el derecho de cancelar pedidos por errores en precios o disponibilidad.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">5. Política de Envíos</h3>
            <p className="text-gray-600 leading-relaxed">Los tiempos de entrega son estimados. No somos responsables por retrasos causados por la paquetería. Debe verificar el paquete al recibirlo y reportar daños dentro de 48 horas.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">6. Devoluciones y Cambios</h3>
            <p className="text-gray-600 leading-relaxed">Aceptamos devoluciones dentro de 30 días posteriores a la compra. Los productos deben estar sin usar, con etiquetas originales. Los gastos de envío de devolución corren por cuenta del cliente, excepto en caso de producto defectuoso.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">7. Propiedad Intelectual</h3>
            <p className="text-gray-600 leading-relaxed">Todo el contenido del sitio (textos, imágenes, logos, diseños) es propiedad de MODA STYLE y está protegido por leyes de propiedad intelectual. Queda prohibida su reproducción sin autorización escrita.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">8. Limitación de Responsabilidad</h3>
            <p className="text-gray-600 leading-relaxed">MODA STYLE no será responsable por daños indirectos, incidentales o consecuentes derivados del uso del sitio o productos. Nuestra responsabilidad máxima se limita al valor de la compra.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">9. Modificaciones</h3>
            <p className="text-gray-600 leading-relaxed">Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos al publicarse en el sitio. El uso continuado constituye aceptación de los nuevos términos.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">10. Jurisdicción</h3>
            <p className="text-gray-600 leading-relaxed">Estos términos se rigen por las leyes de México. Cualquier disputa será resuelta en los tribunales de Ciudad de México.</p>
          </div>
          <p className="text-gray-500 text-xs pt-4 border-t">Última actualización: 01/10/2025</p>
        </div>
      </div>
    </div>
  );
};

const DisclaimerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b-2">
          <h2 className="text-2xl font-bold text-gray-800">Deslinde de Responsabilidad</h2>
          <button onClick={onClose} className="w-10 h-10 bg-red-400 text-white rounded-full text-xl font-bold hover:bg-red-500 transition-all">×</button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4 text-sm">
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">1. Uso del Software</h3>
            <p className="text-gray-600 leading-relaxed">Este sitio web y su software asociado se proporcionan "tal cual", sin garantías de ningún tipo, expresas o implícitas. El uso del sitio es bajo su propio riesgo.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">2. Disponibilidad del Servicio</h3>
            <p className="text-gray-600 leading-relaxed">No garantizamos que el sitio esté disponible de forma ininterrumpida o libre de errores. Podemos suspender, retirar o modificar el servicio sin previo aviso por mantenimiento, actualizaciones o cualquier otra razón.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">3. Seguridad de la Información</h3>
            <p className="text-gray-600 leading-relaxed">Aunque implementamos medidas de seguridad razonables, no podemos garantizar la seguridad absoluta de la información transmitida a través de Internet. Usted acepta que la transmisión de información es bajo su propio riesgo.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">4. Contenido de Terceros</h3>
            <p className="text-gray-600 leading-relaxed">El sitio puede contener enlaces a sitios web de terceros. No somos responsables del contenido, políticas de privacidad o prácticas de estos sitios externos. El acceso a sitios de terceros es bajo su propio riesgo.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">5. Exactitud de la Información</h3>
            <p className="text-gray-600 leading-relaxed">Nos esforzamos por proporcionar información precisa, pero no garantizamos que toda la información del sitio sea exacta, completa o actualizada. Los errores tipográficos, inexactitudes u omisiones pueden ocurrir.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">6. Virus y Software Malicioso</h3>
            <p className="text-gray-600 leading-relaxed">No garantizamos que el sitio esté libre de virus u otros componentes dañinos. Es su responsabilidad implementar medidas de seguridad adecuadas y mantener su sistema actualizado.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">7. Transacciones Financieras</h3>
            <p className="text-gray-600 leading-relaxed">Las transacciones financieras son procesadas por proveedores de pago externos. No almacenamos información completa de tarjetas de crédito en nuestros servidores. No somos responsables por problemas con procesadores de pago externos.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">8. Uso Educativo</h3>
            <p className="text-gray-600 leading-relaxed">Este software fue desarrollado con fines educativos y de demostración de prácticas de seguridad informática. Aunque implementamos medidas de seguridad estándar, debe considerar esto al decidir qué información compartir.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">9. Limitación de Daños</h3>
            <p className="text-gray-600 leading-relaxed">En ningún caso MODA STYLE será responsable por daños directos, indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pérdida de beneficios, datos o uso, derivados del acceso o uso del sitio.</p>
          </div>
          <div>
            <h3 className="text-purple-600 text-lg font-bold mb-2">10. Indemnización</h3>
            <p className="text-gray-600 leading-relaxed">Usted acepta indemnizar y mantener indemne a MODA STYLE de cualquier reclamo, daño, obligación, pérdida, responsabilidad, costo o deuda derivados de su uso del sitio o violación de estos términos.</p>
          </div>
          <p className="text-gray-500 text-xs pt-4 border-t">Última actualización: 01/10/2025</p>
        </div>
      </div>
    </div>
  );
};



const AuthContainer = ({ initialView = 'login', onClose }) => {
  const [currentView, setCurrentView] = useState(initialView);
  const { login } = useAuth(); // usa el login global

  const handleLoginSuccess = (authToken, userData) => {
    login(authToken, userData); // actualiza el contexto global
    onClose(); // cierra modal
  };

  if (currentView === 'login') {
    return (
      <Login
        onSwitchToRegister={() => setCurrentView('register')}
        onClose={onClose}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <Register
      onSwitchToLogin={() => setCurrentView('login')}
      onClose={onClose}
    />
  );
};

export { PrivacyModal, TermsModal, DisclaimerModal };
export default AuthContainer;

