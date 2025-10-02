import AuditLog from '../models/AuditLog.js';
import logger from '../utils/logger.js';

export const logSecurityEvent = async (action, req, details = {}, severity = 'low') => {
  try {
    const auditData = {
      userId: req.user?.id,
      action,
      ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      details,
      severity
    };

    // Guardar en base de datos
    await AuditLog.create(auditData);
    
    // Log en archivo
    const logLevel = severity === 'critical' || severity === 'high' ? 'error' : 'warn';
    logger[logLevel](`Security Event: ${action}`, auditData);

    // Si es crítico, podrías enviar alerta por email/slack aquí
    if (severity === 'critical') {
      logger.error(`CRITICAL SECURITY EVENT: ${action}`, auditData);
    }
  } catch (error) {
    logger.error('Failed to log security event', { error: error.message });
  }
};

// Middleware para registrar automáticamente eventos
export const auditMiddleware = (action, severity = 'low') => {
  return async (req, res, next) => {
    await logSecurityEvent(action, req, {}, severity);
    next();
  };
};