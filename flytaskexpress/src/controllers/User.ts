import { AppDataSource } from "../data-source";
import * as express from "express";
import { User } from "../entity/User";
import { Role } from "./Role";

export class UserController{ 
    public async getUsers(req: express.Request, res: express.Response){
        try{
            const users = await AppDataSource.getRepository(User).find();
            res.json(users);
        }catch(error){

        }
    }
    public async createUser(req: express.Request, res: express.Response){
        try{
            if (!req.body.usr_email || !req.body.usr_name || !req.body.usr_password) {
                return res.status(400).json({ error: 'Missing required data' });
            }
            const user = new User();
            user.usr_email = req.body.usr_email;
            user.usr_name = req.body.usr_name;
            user.usr_password = req.body.usr_password;
            user.usr_role = Role.CLIENT;
        }catch(error){
            console.error('Error registering user', error);
            res.status(500).json({ error: 'Error registering user' });
        }
    }
    public async updateUser(req: express.Request, res: express.Response){
        try{
            if (!req.body.usr_email || !req.body.usr_name || !req.body.usr_password) {
                return res.status(400).json({ error: 'Missing required data' });
            }
            const user = await AppDataSource.getRepository(User).findOne(req.body.usr_id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            user.usr_email = req.body.usr_email;
            user.usr_name = req.body.usr_name;
            user.usr_password = req.body.usr_password;
            await AppDataSource.getRepository(User).save(user);
            res.json(user);
        }catch(error){
            console.error('Error updating user', error);
            res.status(500).json({ error: 'Error updating user' });
        }
    }
}

