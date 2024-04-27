import * as express from 'express';
import { AppDataSource } from '../data-source';
import { compare, hash } from 'bcryptjs';
import { User } from '../entity/User';
import { Role } from './Role';
import {generateLoginToken, generateRecoveryToken} from '../middleware/authenticationToken';
import { verify, JwtPayload } from 'jsonwebtoken';
interface RegisterRequestBody {
    usr_email: string;
    usr_name: string;
    usr_password: string;
    usr_role: Role.CLIENT;
}
export class AuthController {
    public async registerUser(req: express.Request, res: express.Response){
        try {
            const { usr_name, usr_email, usr_password } = req.body as RegisterRequestBody;
            // Check if the email exists
            const userExists = await AppDataSource.getRepository(User).findOne({ 
                where: { usr_email } 
            });
            if (userExists) {
                return res.status(400).send('Cuenta existente, intentalo de nuevo');
            } else if(!req.body.usr_email || !req.body.usr_name || !req.body.usr_password) {
                return res.status(400).send('Bad request: Missing required data');
            }else{
                const user = new User();
                user.usr_email = usr_email;
                user.usr_name = usr_name;
                user.usr_password = await hash(usr_password, 10);
                user.usr_role = Role.CLIENT;
                await AppDataSource.getRepository(User).save(user);
                const token = generateLoginToken(req.body.usr_id, user.usr_name);
                return res.status(200).json({ token });
            }
        } catch (err) {
            return res.status(500).send('Error in registering user');
        }
    }
    public async loginUser(req: express.Request, res: express.Response){
        try {
            const { usr_email, usr_password } = req.body;
            const user = await AppDataSource.getRepository(User).findOne({ 
                where: { usr_email } 
            });
            if (!user) {
                return res.status(400).send('Usuario no encontrado');
            }
            const valid = await compare(usr_password, user.usr_password);
            if (!valid) {
                return res.status(400).send('Contraseña incorrecta');
            }
            const token = generateLoginToken(user.usr_id, user.usr_name);
            return res.status(200).json({ token });
        } catch (err) {
            return res.status(500).send('Error in logging in');
        }
    }
    public async passwordRecovery(req: express.Request, res: express.Response){
        try {
            const { usr_email, usr_password } = req.body;
            const user = await AppDataSource.getRepository(User).findOne({ 
                where: { usr_email } 
            });
            if (!user) {
                return res.status(400).send('Usuario no encontrado');
            }
            const recoveryToken = generateRecoveryToken(user.usr_id, user.usr_email);
            // Send recovery email with the token
            const decoded = verify(recoveryToken, process.env.RECOVERY_JWT_SECRET) as JwtPayload;
            if (decoded.userId !== user.usr_id || decoded.email !== user.usr_email) {
                return res.status(400).send('Token de recuperación inválido');
            }
            const newPassword = usr_password;
            user.usr_password = await hash(newPassword, 10);
            await AppDataSource.getRepository(User).save(user);
    
            return res.status(200).send('Contraseña actualizada exitosamente');
        } catch (error) {
            console.error('Error en la recuperación de contraseña:', error);
            return res.status(500).send('Error en la recuperación de contraseña');
        }
    }
}