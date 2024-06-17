import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Get token from headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      const response = {
          "error": "Authentication Failed"
      }
      return res.status(403).json(response);
  }

  try {
      // Verify token
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY || 'dummykey') as { tokenType: string };
      
      // Check if tokenType is LOGIN
      if (decodedToken.tokenType !== "LOGIN") {
          const response = {
              "error": "Invalid Token Type"
          }
          return res.status(403).json(response);
      }      
      next();
  } catch (error) {
      console.error('Token verification failed', error);
      const response = {
          "error": "Error Authenticating"
      }
      return res.status(403).json(response);
  }
};