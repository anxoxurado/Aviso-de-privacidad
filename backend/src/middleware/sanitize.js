// Sanitización manual de datos para prevenir inyección NoSQL
export const sanitizeInput = (req, res, next) => {
  // Función recursiva para limpiar objetos
  const clean = (obj) => {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(clean);
    }

    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      // Remover operadores de MongoDB que empiezan con $ o contienen puntos
      if (typeof key === 'string' && (key.startsWith('$') || key.includes('.'))) {
        continue;
      }
      cleaned[key] = clean(value);
    }
    return cleaned;
  };

  // Limpiar body (este sí es modificable)
  if (req.body && typeof req.body === 'object') {
    req.body = clean(req.body);
  }

  // Para query y params, tenemos que recrearlos en lugar de modificarlos directamente
  if (req.query && typeof req.query === 'object') {
    const cleanedQuery = clean(req.query);
    // Eliminamos las propiedades originales y agregamos las limpias
    Object.keys(req.query).forEach(key => {
      delete req.query[key];
    });
    Object.assign(req.query, cleanedQuery);
  }

  if (req.params && typeof req.params === 'object') {
    const cleanedParams = clean(req.params);
    Object.keys(req.params).forEach(key => {
      delete req.params[key];
    });
    Object.assign(req.params, cleanedParams);
  }

  next();
};