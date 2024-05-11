import { AppDataSource } from "../data-source";
import * as express from "express";
import { Task } from "../entity/Tasks";

export class TaskController{ 
    public async getTasks(req: express.Request, res: express.Response){
        try{
            const tasks = await AppDataSource.getRepository(Task).find();
            return res.status(200).json(tasks);
        }catch(error){

        }
    }
    public async getTask(req: express.Request, res: express.Response){
        try{
            const taskId = Number(req.params.id);
            const taskDesc = req.params.desc;
            if(isNaN(taskId) || !taskDesc){
                return res.status(400).send("Bad request: Task does not exist.");
            }
            const task = await AppDataSource.manager.findOne(
                Task, {
                    where: { tsk_id: taskId ,
                            tsk_desc: taskDesc
                    },
                });
                if (!task) {
                    return res.status(404).json({ message: "Task not found." });
                }
    
                res.json(task);
        }catch(error){
            console.error('Error fetching question:', error);
            res.status(500).json({ error: 'An error occurred while fetching the task.' });
        }
    }
    public async createTask(req: express.Request, res: express.Response){
        try{
            const { tsk_title, tsk_desc, tsk_due_date } = req.body;
            if (!tsk_title || !tsk_desc || !tsk_due_date) {
                return res.status(400).send('Bad request: Missing required data');
            }
            const task = new Task();
            task.tsk_title = tsk_title;
            task.tsk_status = 0;
            task.tsk_desc = tsk_desc;
            task.tsk_due_date = new Date(tsk_due_date);
            await AppDataSource.getRepository(Task).save(task);
            return res.status(200).json(task);
        }catch(error){
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
                    where: { tsk_id: taskId },
                });
                if (!task) {
                    return res.status(404).json({ message: "Task not found." });
                }
                task.tsk_title = req.body.tsk_title;
                task.tsk_desc = req.body.tsk_desc;
                task.tsk_status = Number(req.body.tsk_status);
                task.tsk_due_date = new Date(req.body.tsk_due_date);
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
                Task, {
                    where: { tsk_id: taskId },
                });
                if (!task) {
                    return res.status(404).json({ message: "Task not found." });
                }
                task.tsk_status = 0;
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
                Task, {
                    where: { tsk_id: taskId },
                });
                if (!task) {
                    return res.status(404).json({ message: "Task not found." });
                }
                task.tsk_status = 2;
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
                Task, {
                    where: { tsk_id: taskId },
                });
                if (!task) {
                    return res.status(404).json({ message: "Task not found." });
                }
                task.tsk_status = 1;
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
                    where: { tsk_id: taskId },
                });
                if (!task) {
                    return res.status(404).json({ message: "Task not found." });
                }
                task.tsk_status = 3;
                await AppDataSource.getRepository(Task).save(task);
                return res.status(200).json(task);
        }catch(error){
            console.error('Error updating task status:', error);
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
                    where: { tsk_id: taskId },
                });
                if (!task) {
                    return res.status(404).json({ message: "Task not found." });
                }
                await AppDataSource.getRepository(Task).delete(task);
                return res.status(200).json({ message: "Task deleted." });
        }catch(error){
            console.error('Error deleting task:', error);
            return res.status(500).send('Error deleting task');
        }
    }
}