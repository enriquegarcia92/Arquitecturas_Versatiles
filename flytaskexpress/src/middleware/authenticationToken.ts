import { Request, Response, NextFunction } from 'express';
import { verify, sign, JwtPayload } from 'jsonwebtoken';

const loginSecretKey = process.env.LOGIN_JWT_SECRET || 'AQNP1hv6bqJP3yt2dbXRUT2OztipbES6';
const recoverySecretKey = process.env.RECOVERY_JWT_SECRET || 'CIRCrBHp0VziYLbSoYSKr1YLSUbS3deL';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
export const authenticateToken = (tokenType: 'login' | 'recovery') => (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const authToken = authHeader && authHeader.split(' ')[1]; // Authorization: Bearer TOKEN

    if (authToken == null) {
        return res.sendStatus(401); // Unauthorized
    }

    try {
        let decoded: JwtPayload;

        if (tokenType === 'login') {
            decoded = verify(authToken, loginSecretKey) as JwtPayload;
        } else if (tokenType === 'recovery') {
            decoded = verify(authToken, recoverySecretKey) as JwtPayload;
        } else {
            throw new Error('Invalid token type');
        }

        req.user = decoded; // Attach decoded token payload to req.user
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.sendStatus(403); // Forbidden
    }
};

export const generateLoginToken = (userId: number, username: string): string => {
    return sign({ userId, username }, loginSecretKey, { expiresIn: '4h' });
};

export const generateRecoveryToken = (userId: number, email: string): string => {
    return sign({ userId, email }, recoverySecretKey, { expiresIn: '20min' });
};
