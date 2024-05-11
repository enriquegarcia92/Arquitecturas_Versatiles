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
}

