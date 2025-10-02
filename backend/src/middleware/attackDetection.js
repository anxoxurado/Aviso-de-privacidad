import logger from '../utils/logger.js';
import { logSecurityEvent } from './audit.js';

const suspiciousPatterns = [
  { pattern: /<script[^>]*>.*?<\/script>/gi, name: 'XSS Script Tag' },
  { pattern: /javascript:/gi, name: 'XSS JavaScript Protocol' },
  { pattern: /on\w+\s*=\s*['"]/gi, name: 'XSS Event Handler' },
  { pattern: /\.\.\//g, name: 'Path Traversal' },
  { pattern: /union.*select/gi, name: 'SQL Injection Union' },
  { pattern: /drop\s+table/gi, name: 'SQL Injection Drop' },
  { pattern: /exec\s*\(/gi, name: 'Code Injection' },
  { pattern: /base64_decode/gi, name: 'Potential Malicious Decode' },
  { pattern: /\$\{.*\}/g, name: 'Template Injection' }
];

// Lista negra de IPs (ejemplo)
const blacklistedIPs = new Set();

export const detectAttack = async (req, res, next) => {
  const clientIP = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Verificar IP en lista negra
  if (blacklistedIPs.has(clientIP)) {
    await logSecurityEvent('ATTACK_DETECTED', req, {
      reason: 'Blacklisted IP',
      ip: clientIP
    }, 'high');

    return res.status(403).json({
      success: false,
      message: 'Acceso denegado'
    });
  }

  // Concatenar todos los inputs
  const inputs = [
    JSON.stringify(req.body),
    JSON.stringify(req.query),
    JSON.stringify(req.params),
    req.path
  ].join(' ');

  // Buscar patrones sospechosos
  for (const { pattern, name } of suspiciousPatterns) {
    if (pattern.test(inputs)) {
      await logSecurityEvent('ATTACK_DETECTED', req, {
        attackType: name,
        pattern: pattern.toString(),
        input: inputs.substring(0, 200),
        ip: clientIP
      }, 'high');

      logger.warn('Attack detected', {
        ip: clientIP,
        attackType: name,
        path: req.path,
        method: req.method
      });

      return res.status(400).json({
        success: false,
        message: 'Solicitud inválida detectada'
      });
    }
  }

  next();
};

// Función para agregar IP a lista negra
export const blacklistIP = (ip) => {
  blacklistedIPs.add(ip);
  logger.warn(`IP added to blacklist: ${ip}`);
};