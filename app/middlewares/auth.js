import { compactVerify as decode } from 'jose';
import { TextDecoder,TextEncoder } from 'util';

const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

  /**
   * Middleware function to authenticate a user.
   * @async
   * @param {import('express').Request} req - Express request object.
   * @param {import('express').Response} res - Express response object.
   * @param {import('express').NextFunction} next - The next middleware function in the application's request-response cycle.
   * @returns {Promise<string>} A promise that resolves with a JSON Web Token (JWT) if authentication is successful
   */
export async function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization'); 
  const token = authHeader.replace('Bearer', '').trim();
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const { payload } = await decode(token, secretKey)
    const payloadString = new TextDecoder().decode(payload);
    const payloadObject = JSON.parse(payloadString);

    const currentTime = Math.floor(Date.now() / 1000);
    if (payloadObject.exp < currentTime) {
      return res.status(401).json({ error: 'Token expired' });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}