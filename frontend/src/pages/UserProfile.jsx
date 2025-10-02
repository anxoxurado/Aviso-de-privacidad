import React, { useState } from 'react';
import API_URL from '../config/api';
// Props esperadas:
// - user: objeto con datos del usuario
// - token: token de autenticación
// - isAuthenticated: boolean
// - onLogout: función para cerrar sesión
// - onClose: función para cerrar el perfil
// - onOpenAuth: función para abrir login si no está autenticado

const UserProfile = ({ user, token, isAuthenticated, onLogout, onClose, onOpenAuth }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    direccion: {
      calle: user?.direccion?.calle || '',
      ciudad: user?.direccion?.ciudad || '',
      estado: user?.direccion?.estado || '',
      codigoPostal: user?.direccion?.codigoPostal || ''
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [orders] = useState([
    { id: '001', fecha: '2025-01-15', total: 89.99, estado: 'Entregado' },
    { id: '002', fecha: '2025-01-20', total: 145.50, estado: 'En tránsito' },
    { id: '003', fecha: '2025-01-25', total: 59.99, estado: 'Procesando' }
  ]);

  // Verificar autenticación
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-md">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Acceso Restringido</h2>
          <p className="text-gray-600 mb-6">
            Necesitas iniciar sesión para acceder a esta página
          </p>
          <button
            onClick={onOpenAuth}
            className="px-8 py-3 bg-gradient-to-r from-red-400 to-teal-400 text-white font-bold rounded-xl hover:shadow-xl transition-all"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Perfil actualizado correctamente');
        setIsEditing(false);
      } else {
        alert('Error al actualizar perfil');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (response.ok) {
        alert('Contraseña cambiada exitosamente');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        alert('Error al cambiar contraseña. Verifica tu contraseña actual');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.'
    );

    if (!confirmDelete) return;

    const confirmPassword = prompt('Por seguridad, ingresa tu contraseña:');
    if (!confirmPassword) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password: confirmPassword })
      });

      if (response.ok) {
        alert('Cuenta eliminada exitosamente');
        onLogout();
        onClose();
      } else {
        alert('Error al eliminar cuenta. Verifica tu contraseña');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
          <div className="relative h-40 bg-gradient-to-r from-red-400 to-teal-400">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all"
            >
              ×
            </button>
          </div>
          
          <div className="relative px-8 pb-8">
            <div className="absolute -top-16 left-8">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center text-5xl">
                👤
              </div>
            </div>
            
            <div className="pt-20">
              <h1 className="text-3xl font-bold text-gray-800">{user?.nombre}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <div className="mt-4 flex gap-3">
                <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                  {user?.role === 'cliente' ? 'Cliente' : user?.role}
                </span>
                <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Cuenta Activa
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex border-b">
            {[
              { id: 'info', label: 'Información Personal', icon: '👤' },
              { id: 'orders', label: 'Mis Pedidos', icon: '📦' },
              { id: 'security', label: 'Seguridad', icon: '🔒' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-red-400 to-teal-400 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'info' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Información Personal</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold"
                  >
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Nombre Completo</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border-2 rounded-xl ${
                        isEditing ? 'border-purple-300 focus:ring-2 focus:ring-purple-400' : 'bg-gray-100 border-gray-300'
                      } focus:outline-none transition-all`}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">El email no puede ser modificado</p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border-2 rounded-xl ${
                        isEditing ? 'border-purple-300 focus:ring-2 focus:ring-purple-400' : 'bg-gray-100 border-gray-300'
                      } focus:outline-none transition-all`}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Calle y Número</label>
                    <input
                      type="text"
                      name="direccion.calle"
                      value={formData.direccion.calle}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border-2 rounded-xl ${
                        isEditing ? 'border-purple-300 focus:ring-2 focus:ring-purple-400' : 'bg-gray-100 border-gray-300'
                      } focus:outline-none transition-all`}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Ciudad</label>
                    <input
                      type="text"
                      name="direccion.ciudad"
                      value={formData.direccion.ciudad}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border-2 rounded-xl ${
                        isEditing ? 'border-purple-300 focus:ring-2 focus:ring-purple-400' : 'bg-gray-100 border-gray-300'
                      } focus:outline-none transition-all`}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Estado</label>
                    <input
                      type="text"
                      name="direccion.estado"
                      value={formData.direccion.estado}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border-2 rounded-xl ${
                        isEditing ? 'border-purple-300 focus:ring-2 focus:ring-purple-400' : 'bg-gray-100 border-gray-300'
                      } focus:outline-none transition-all`}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Código Postal</label>
                    <input
                      type="text"
                      name="direccion.codigoPostal"
                      value={formData.direccion.codigoPostal}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border-2 rounded-xl ${
                        isEditing ? 'border-purple-300 focus:ring-2 focus:ring-purple-400' : 'bg-gray-100 border-gray-300'
                      } focus:outline-none transition-all`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <button
                    onClick={handleUpdateProfile}
                    className="w-full py-4 bg-gradient-to-r from-red-400 to-teal-400 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Guardar Cambios
                  </button>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Historial de Pedidos</h2>
                
                {orders.map((order) => (
                  <div key={order.id} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Pedido #{order.id}</h3>
                        <p className="text-gray-600">Fecha: {order.fecha}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-2xl font-bold text-purple-600">${order.total}</p>
                        <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                          order.estado === 'Entregado' ? 'bg-green-100 text-green-700' :
                          order.estado === 'En tránsito' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.estado}
                        </span>
                      </div>
                    </div>
                    <button className="mt-4 text-purple-600 font-semibold hover:underline">
                      Ver detalles
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Cambiar Contraseña</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Contraseña Actual</label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? 'text' : 'password'}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showPasswords.current ? '🙈' : '👁️'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Nueva Contraseña</label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? 'text' : 'password'}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showPasswords.new ? '🙈' : '👁️'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Confirmar Nueva Contraseña</label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? 'text' : 'password'}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showPasswords.confirm ? '🙈' : '👁️'}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleChangePassword}
                      className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all"
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
                </div>

                <div className="border-t-2 pt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Información de Seguridad</h3>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-blue-800 mb-2">Último acceso</h4>
                    <p className="text-blue-700">{user?.ultimoLogin ? new Date(user.ultimoLogin).toLocaleString() : 'No disponible'}</p>
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-green-800 mb-2">Cuenta creada</h4>
                    <p className="text-green-700">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'No disponible'}</p>
                  </div>
                </div>

                <div className="border-t-2 pt-8">
                  <h3 className="text-xl font-bold text-red-600 mb-4">Zona Peligrosa</h3>
                  <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
                    <h4 className="font-bold text-red-800 mb-2">Eliminar Cuenta</h4>
                    <p className="text-red-700 mb-4">
                      Esta acción es permanente y no se puede deshacer. Se eliminarán todos tus datos.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
                    >
                      Eliminar Mi Cuenta
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;