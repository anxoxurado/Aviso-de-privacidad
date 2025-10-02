import { useState } from 'react';
import { sanitizeInput, sanitizeObject, hasSuspiciousPattern } from '../utils/sanitize';

export const useSecureForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    // Sanitizar si es string
    if (typeof newValue === 'string') {
      // Detectar patrones sospechosos
      if (hasSuspiciousPattern(newValue)) {
        setErrors(prev => ({
          ...prev,
          [name]: 'Entrada inválida detectada'
        }));
        return;
      }

      newValue = sanitizeInput(newValue);
    }

    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Limpiar error si existía
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const sanitizeAllValues = () => {
    return sanitizeObject(values);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    setErrors,
    handleChange,
    sanitizeAllValues,
    resetForm
  };
};