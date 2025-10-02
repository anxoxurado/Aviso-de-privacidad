import React, { useState } from 'react';
import AuthContainer, { PrivacyModal, TermsModal, DisclaimerModal } from './AuthContainer';
import API_URL from '@/config/api';


const Register = ({ onSwitchToLogin, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    aceptaTerminos: false,
    aceptaPrivacidad: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Estados para los modales
  const [showTerms, setShowTerms] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Función para validar la fortaleza de la contraseña

  const validatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (name === 'password') {
      setPasswordStrength(validatePassword(value));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else {
      if (formData.password.length < 8) {
        newErrors.password = 'Mínimo 8 caracteres';
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Debe contener una mayúscula';
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = 'Debe contener una minúscula';
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = 'Debe contener un número';
      } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
        newErrors.password = 'Debe contener un símbolo especial';
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (formData.telefono && !/^[0-9]{10}$/.test(formData.telefono)) {
      newErrors.telefono = 'Debe tener 10 dígitos';
    }

    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = 'Debes aceptar los términos';
    }

    if (!formData.aceptaPrivacidad) {
      newErrors.aceptaPrivacidad = 'Debes aceptar el aviso de privacidad';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          telefono: formData.telefono,
          aceptaTerminos: formData.aceptaTerminos,
          aceptaPrivacidad: formData.aceptaPrivacidad
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registro exitoso! Ahora puedes iniciar sesión');
        onSwitchToLogin();
      } else {
        if (data.errors) {
          const serverErrors = {};
          data.errors.forEach(err => {
            serverErrors[err.path] = err.msg;
          });
          setErrors(serverErrors);
        } else {
          alert(data.error || 'Error al registrar');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el servidor');
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return 'Débil';
    if (passwordStrength <= 3) return 'Media';
    return 'Fuerte';
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-red-400 to-teal-400">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all"
          >
            ×
          </button>
          <div className="absolute bottom-0 left-0 right-0 text-center pb-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Crear Cuenta</h1>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${errors.nombre ? 'border-red-400' : 'border-gray-300'
                  }`}
                placeholder="Juan Pérez"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${errors.email ? 'border-red-400' : 'border-gray-300'
                  }`}
                placeholder="correo@ejemplo.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${errors.telefono ? 'border-red-400' : 'border-gray-300'
                  }`}
                placeholder="5551234567"
                maxLength="10"
              />
              {errors.telefono && (
                <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Contraseña *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${errors.password ? 'border-red-400' : 'border-gray-300'
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}

              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{getStrengthText()}</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Mínimo 8 caracteres, una mayúscula, minúscula, número y símbolo
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Confirmar Contraseña *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${errors.confirmPassword ? 'border-red-400' : 'border-gray-300'
                  }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="aceptaTerminos"
                    checked={formData.aceptaTerminos}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Acepto los{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTerms(true);
                      }}
                      className="text-purple-600 font-semibold hover:underline"
                    >
                      términos y condiciones
                    </button>{' '}
                    y el{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDisclaimer(true);
                      }}
                      className="text-purple-600 font-semibold hover:underline"
                    >
                      deslinde de responsabilidad
                    </button>
                    {' '}*

                  </span>
                </label>
                {errors.aceptaTerminos && (
                  <p className="text-red-500 text-sm mt-1 ml-8">{errors.aceptaTerminos}</p>
                )}
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="aceptaPrivacidad"
                    checked={formData.aceptaPrivacidad}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Acepto el{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPrivacy(true);
                      }}
                      className="text-purple-600 font-semibold hover:underline"
                    >
                      aviso de privacidad
                    </button>
                    {' '}*
                  </span>
                </label>
                {errors.aceptaPrivacidad && (
                  <p className="text-red-500 text-sm mt-1 ml-8">{errors.aceptaPrivacidad}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-red-400 to-teal-400 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Crear Cuenta
            </button>

            {/* Switch to Login */}
            <p className="text-center text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-purple-600 font-semibold hover:underline"
              >
                Inicia Sesión
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Modales Legales */}
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <DisclaimerModal isOpen={showDisclaimer} onClose={() => setShowDisclaimer(false)} />

    </div>



  );
};

export default Register;