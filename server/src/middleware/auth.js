import createError from 'http-errors';
import { verifyToken } from '../utils/jwt.js';

export const requireAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw createError(401, 'No token provided');
    const payload = verifyToken(token);
    req.user = { id: payload.id, name: payload.name, role: payload.role };
    next();
  } catch (err) {
    next(createError(401, 'Invalid or expired token'));
  }
};