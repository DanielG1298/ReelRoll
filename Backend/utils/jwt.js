import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

// Function to create a JWT token with a given payload
export function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}

// verify token and extract payload 
export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}
