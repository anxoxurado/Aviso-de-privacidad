import React from 'react';
import { sanitizeInput } from '../../utils/sanitize';

const SecureInput = ({ 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  className,
  maxLength,
  pattern,
  required = false,
  disabled = false,
  error = null
}) => {
  const handleSecureChange = (e) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    
    // Crear evento sintético con valor sanitizado
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: sanitizedValue
      }
    };
    
    onChange(syntheticEvent);
  };

  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleSecureChange}
        placeholder={placeholder}
        className={`${className} ${error ? 'border-red-400' : 'border-gray-300'}`}
        maxLength={maxLength}
        pattern={pattern}
        required={required}
        disabled={disabled}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default SecureInput;