import { logSecurityEvent } from './audit.js';

export const requireRole = (...allowedRoles) => {
  return async (req, res, next) => {
    if (!req.user) {
      await logSecurityEvent('UNAUTHORIZED_ACCESS', req, {
        reason: 'No authenticated user',
        path: req.path
      }, 'medium');

      return res.status(401).json({
        success: false,
        message: 'No autenticado'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      await logSecurityEvent('UNAUTHORIZED_ACCESS', req, {
        reason: 'Insufficient permissions',
        userRole: req.user.role,
        requiredRoles: allowedRoles,
        path: req.path
      }, 'medium');

      return res.status(403).json({
        success: false,
        message: `Acceso denegado. Requiere rol: ${allowedRoles.join(' o ')}`,
        requiredRole: allowedRoles
      });
    }

    next();
  };
};