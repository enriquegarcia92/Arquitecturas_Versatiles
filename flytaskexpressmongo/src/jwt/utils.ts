import jwt, { JwtPayload } from 'jsonwebtoken';
import { Buffer } from 'buffer';

export const generateLoginToken = (user: any) => {
    const secretKey: string = process.env.SECRET_KEY || 'dummykey';
    console.log(secretKey);
    const encodedKey: string = Buffer.from(secretKey).toString('base64');
    console.log(encodedKey);
    const now = new Date();
    const exp = new Date(now.getTime() + 4 * 60 * 60 * 1000); // Token expires in 4 hours
    const payload = {
        tokenType: 'LOGIN',
        sub: user.usr_email,
        iat: Math.floor(now.getTime() / 1000),
        exp: Math.floor(exp.getTime() / 1000)
    };
    const token = jwt.sign(payload, secretKey, { algorithm: 'HS256'});
    return token;
};

export const generateRecoveryToken = (user: any) => {
    const secretKey: string = process.env.SECRET_KEY || 'dummykey';
    console.log(secretKey);
    const encodedKey: string = Buffer.from(secretKey).toString('base64');
    console.log(encodedKey);
    const now = new Date();
    const exp = new Date(now.getTime() + 4 * 60 * 60 * 1000); // Token expires in 4 hours
    const payload = {
        tokenType: 'RECOVERY',
        sub: user.usr_email,
        iat: Math.floor(now.getTime() / 1000),
        exp: Math.floor(exp.getTime() / 1000)
    };
    const token = jwt.sign(payload, secretKey, { algorithm: 'HS256'});
    return token;
};