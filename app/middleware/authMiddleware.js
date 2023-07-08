const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decodedToken.userId };
    next();
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error);
    res.status(401).json({ message: 'Autenticación fallida' });
  }
};

module.exports = authMiddleware;
