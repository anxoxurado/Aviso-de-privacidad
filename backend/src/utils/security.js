import logger from './logger.js';

export const isValidRedirect = (url) => {
  const allowedDomains = [
    'localhost:5173',
    'localhost:5000',
    process.env.FRONTEND_URL?.replace('https://', '').replace('http://', ''),
    'moda-style-frontend.onrender.com'
  ].filter(Boolean);

  try {
    const urlObj = new URL(url);
    const isValid = allowedDomains.some(domain => 
      urlObj.host === domain || urlObj.host.endsWith(`.${domain}`)
    );

    if (!isValid) {
      logger.warn('Invalid redirect attempt', { url, allowedDomains });
    }

    return isValid;
  } catch (error) {
    logger.error('Error validating redirect URL', { url, error: error.message });
    return false;
  }
};

export const validateRedirectMiddleware = (req, res, next) => {
  const redirectUrl = req.query.redirect || req.body.redirect;
  
  if (redirectUrl && !isValidRedirect(redirectUrl)) {
    return res.status(400).json({
      success: false,
      message: 'URL de redirección inválida'
    });
  }
  
  next();
};