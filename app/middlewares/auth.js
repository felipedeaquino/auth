import { compactVerify as decode } from 'jose';
import { TextEncoder } from 'util';

const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

  /**
   * Middleware function to authenticate a user.
   * @async
   * @param {import('express').Request} req - O objeto de solicitação Express.
   * @param {import('express').Response} res - O objeto de resposta Express.
   * @param {import('express').NextFunction} next - The next middleware function in the application's request-response cycle.
   * @returns {Promise<string>} A promise that resolves with a JSON Web Token (JWT) if authentication is successful
   */
export async function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization'); 
  const token = authHeader.replace('Bearer', '').trim();
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    await decode(token, secretKey)
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}