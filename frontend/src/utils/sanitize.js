import DOMPurify from 'dompurify';

/**
 * Sanitizar HTML para prevenir XSS
 * @param {string} dirty - HTML potencialmente peligroso
 * @returns {string} - HTML limpio
 */
export const sanitizeHTML = (dirty) => {
  if (!dirty) return '';
  
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'span'],
    ALLOWED_ATTR: ['class'],
    ALLOW_DATA_ATTR: false
  });
};

/**
 * Sanitizar input de texto simple
 * @param {string} input - Texto a sanitizar
 * @returns {string} - Texto limpio
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Eliminar < y >
    .replace(/javascript:/gi, '') // Eliminar javascript:
    .replace(/on\w+=/gi, ''); // Eliminar event handlers
};

/**
 * Sanitizar URLs para prevenir redirects maliciosos
 * @param {string} url - URL a validar
 * @returns {string|null} - URL válida o null
 */
export const sanitizeURL = (url) => {
  if (!url) return null;
  
  try {
    const urlObj = new URL(url);
    
    // Solo permitir http y https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return null;
    }
    
    // Verificar que no tenga javascript:
    if (url.toLowerCase().includes('javascript:')) {
      return null;
    }
    
    return url;
  } catch {
    return null;
  }
};

/**
 * Sanitizar todo un objeto recursivamente
 * @param {Object} obj - Objeto a sanitizar
 * @returns {Object} - Objeto limpio
 */
export const sanitizeObject = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return typeof obj === 'string' ? sanitizeInput(obj) : obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = sanitizeObject(value);
  }
  return sanitized;
};

/**
 * Validar email
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar teléfono (10 dígitos)
 * @param {string} phone 
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

/**
 * Detectar patrones sospechosos
 * @param {string} input 
 * @returns {boolean}
 */
export const hasSuspiciousPattern = (input) => {
  if (typeof input !== 'string') return false;
  
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /\.\.\//,
    /union.*select/i,
    /drop.*table/i
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
};
