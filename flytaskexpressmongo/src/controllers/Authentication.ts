import * as express from 'express';
import { AppDataSource } from '../data-source';
import { compare, hash } from 'bcryptjs';
import User,{ IUser } from '../entities/User';
import { Role } from './Role';
import {generateLoginToken, generateRecoveryToken} from '../middleware/authenticationToken';
import { verify, JwtPayload } from 'jsonwebtoken';

interface RegisterRequestBody {
    email: string;
    name: string;
    password: string;
    role: Role.CLIENT;
}

export class AuthController {
    public async registerUser(req: express.Request, res: express.Response){
        try {
            const { name, email, password } = req.body as RegisterRequestBody;
            // Check if the email exists
            const userExists = await AppDataSource.getRepository(User).findOne({ 
                where: { email } 
            });
            if (userExists){
                return res.status(400).send('Cuenta existente, intentalo de nuevo');
            } else if(!req.body.email || !req.body.name || !req.body.password) {
                return res.status(400).send('Bad request: Missing required data');
            } else {
                const user = new User();
                user.email = email;
                user.name = name;
                user.password = await hash(password, 10);
                user.role = Role.CLIENT;
                await AppDataSource.getRepository(User).save(user);
                const token = generateLoginToken(user._id, user.name);
                return res.status(200).json({ token });
            }
        } catch(err){
            return res.status(500).send('Error in registering user');
        }
    }
    public async loginUser(req: express.Request, res: express.Response){
        try {
            const { email, password } = req.body;
            const user = await AppDataSource.getRepository(User).findOne({ 
                where: { email } 
            });
            if (!user) {
                return res.status(400).send('Usuario no encontrado');
            }
            const valid = await compare(password, user.password);
            if (!valid) {
                return res.status(400).send('Contraseña incorrecta');
            }
            const token = generateLoginToken(user._id, user.name);
            return res.status(200).json({ token });
        } catch(err){
            return res.status(500).send('Error in logging in');
        }
    }
    public async passwordRecovery(req: express.Request, res: express.Response){
        try {
            const { email , password } = req.body;
            const user = await AppDataSource.getRepository(User).findOne({ 
                where: { email } 
            });
            if (!user) {
                return res.status(400).send('Usuario no encontrado');
            }
            const token = generateRecoveryToken(user._id, user.email);
            const decoded = verify(token, process.env.RECOVERY_JWT_SECRET) as JwtPayload;
            if (decoded._id !== user._id || decoded.email !== user.email) {
                return res.status(400).send('Token invalido');
            }
            const newPassword = password;
            user.password = await hash(newPassword, 10);
            await AppDataSource.getRepository(User).save(user);
            return res.status(200).send('Contraseña actualizada exitosamente');
        } catch(err){
            console.error('Error en la recuperación de contraseña:', err);
            return res.status(500).send('Error en la recuperación de contraseña');
        }
    }
}