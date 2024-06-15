import { AppDataSource } from "../data-source";
import * as express from "express";
import Task,{ ITask } from "../entities/Task";
import { Role } from "./Role";
import { verify } from "jsonwebtoken";

interface TaskRequestBody {
    title: string;
    description: string;
    dueDate: Date;
}
 export class TaskController{
    public async getTasks(req: express.Request, res: express.Response){
        try{
            const task = await AppDataSource.getRepository(Task).find();
            const loggedUser = verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET) as { userId: number, role: Role };
            return res.status(200).json(task.filter(t => t.userId === loggedUser.userId));
        }catch(error){
            console.error('Error fetching task:', error);
            res.status(500).json({ error: 'An error occurred while fetching the task.' });
        }
    }
    public async getTask(req: express.Request, res: express.Response){
        try{
            const taskId = Number(req.params.id);
            const taskDesc = req.params.desc;
            if(isNaN(taskId) || !taskDesc){
                return res.status(400).send("Bad request: Task does not exist.");
            }
            const task = await AppDataSource.getRepository(Task).findOne({
                where: { 
                    _id: taskId,
                    description: taskDesc 
                },
            });
            if(!task){
                return res.status(404).json({ message: "Task not found." });
            }
            res.json(task);
        }catch(error){
            console.error('Error fetching task:', error);
            res.status(500).json({ error: 'An error occurred while fetching the task.' });
        }
    }
    public async createTask(req: express.Request, res: express.Response){ 
        try{
            const { title, description, dueDate } = req.body as TaskRequestBody;
            if(!title || !description || !dueDate){
                return res.status(400).send('Bad request: Missing required data');
            }
            const task = new Task();
            task.title = title;
            task.status = 0;
            task.description = description;
            task.dueDate = new Date(dueDate);
           // const loggedUser = verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET) as { userId: number, role: Role };
            await AppDataSource.getRepository(Task).save(task);
            return res.status(200).json(task); 
        } catch(error){
            console.error('Error creating task:', error);
            return res.status(500).send('Error creating task');
        }
     }
     public async updateTask(req: express.Request, res: express.Response){
        try{
            const taskId = Number(req.params.id);
            if(isNaN(taskId)){
                return res.status(400).send("Bad request: Invalid task id");
            }
            const task = await AppDataSource.manager.findOne(
                Task, {
                    where: { _id: taskId },
                }
            );
            if(!task){
                return res.status(404).json({ message: "Task not found." });
            }
            task.title = req.body.title;
            task.description = req.body.description;
            task.status = req.body.status;
            task.dueDate = req.body.dueDate;
            await AppDataSource.getRepository(Task).save(task);
            return res.status(200).json(task);
        }catch(error){
            console.error('Error updating task:', error);
            return res.status(500).send('Error updating task');
        }
     }
     public async updateTaskStatusToTodo(req: express.Request, res: express.Response){
        try{
            const taskId = Number(req.params.id);
            if(isNaN(taskId)){
                return res.status(400).send("Bad request: Invalid task id");
            }
            const task = await AppDataSource.manager.findOne(
                Task,{
                    where: { _id: taskId },
                });
                if(!task){
                    return res.status(404).json({ message: "Task not found." });
                }
                task.status = 0;
                await AppDataSource.getRepository(Task).save(task);
                return res.status(200).json(task);
        }catch(error){
            console.error('Error updating task status:', error);
            return res.status(500).send('Error updating task status');
        }
     } 
     public async updateTaskStatusToDone(req: express.Request, res: express.Response){
        try{
            const taskId = Number(req.params.id);
            if(isNaN(taskId)){
                return res.status(400).send("Bad request: Invalid task id");
            }
            const task = await AppDataSource.manager.findOne(
                Task,{
                    where: { _id: taskId },
                });
                if(!task){
                    return res.status(404).json({ message: "Task not found." });
                }
                task.status = 2;
                await AppDataSource.getRepository(Task).save(task);
                return res.status(200).json(task);
        }catch(error){
            console.error('Error updating task status:', error);
            return res.status(500).send('Error updating task status');
        }
     }
     public async updateTaskStatusToDoing(req: express.Request, res: express.Response){
        try{
            const taskId = Number(req.params.id);
            if(isNaN(taskId)){
                return res.status(400).send("Bad request: Invalid task id");
            }
            const task = await AppDataSource.manager.findOne(
                Task,{
                    where: { _id: taskId },
                });
                if(!task){
                    return res.status(404).json({ message: "Task not found." });
                }
                task.status = 1;
                await AppDataSource.getRepository(Task).save(task);
                return res.status(200).json(task);
        }catch(error){
            console.error('Error updating task status:', error);
            return res.status(500).send('Error updating task status');
        }
    }
    public async updateTaskStatusToUpcoming(req: express.Request, res: express.Response){
        try{ 
            const taskId = Number(req.params.id);
            if(isNaN(taskId)){
                return res.status(400).send("Bad request: Invalid task id");
            }
            const task = await AppDataSource.manager.findOne(
                Task, { 
                    where: { _id: taskId},
                });
                if(!task){
                    return res.status(404).json({ message: "Task not found." });
                }
                task.status = 3;
                await AppDataSource.getRepository(Task).save(task);
                return res.status(200).json(task);
        }catch(error){
            console.error('Error updating task status', error);
            return res.status(500).send('Error updating task status');
        }
    }
    public async deleteTask(req: express.Request, res: express.Response){
        try{
            const taskId = Number(req.params.id);
            if(isNaN(taskId)){
                return res.status(400).send("Bad request: Invalid task id");
            }
            const task = await AppDataSource.manager.findOne(
                Task, {
                    where: { _id: taskId },
                });
                if(!task){
                    return res.status(404).json({ message: "Task not found." });
                }
                await AppDataSource.getRepository(Task).remove(task);
                return res.status(200).json(task);
        }catch(error){
            console.error('Error deleting task:', error);
            return res.status(500).send('Error deleting task');
        }
    }
}