import { Request, Response } from 'express';
import Task from '../models/Tasks';
import User from '../models/User';
import { Op } from 'sequelize';


export const getTasks = async (req: Request, res: Response) => {
    const { userId, keyword, status } = req.query;

    try {
        // Build the query criteria
        const whereClause: any = { usr_id: userId };

        if (status) {
            whereClause.tsk_status = status;
        }

        if (keyword) {
            whereClause[Op.or] = [
                { tsk_title: { [Op.iLike]: `%${keyword}%` } },
                { tsk_desc: { [Op.iLike]: `%${keyword}%` } }
            ];
        }

        // Execute the Sequelize query
         // Execute the Sequelize query to find and count tasks
         const { count, rows: tasks } = await Task.findAndCountAll({
            where: whereClause,
            include: [{ model: User, as: 'user' }],
            attributes: ['tsk_id', 'tsk_title', 'tsk_desc', 'tsk_status', 'tsk_creation_date', 'tsk_due_date']
        });

        // Serialize the query result into JSON format
        const serializedTasks = tasks.map(task => ({
            taskId: task.tsk_id,
            title: task.tsk_title,
            description: task.tsk_desc,
            status: task.tsk_status,
            creationDate: (task.tsk_creation_date as Date), // Format date as ISO string
            dueDate: (task.tsk_due_date as Date) // Format date as ISO string
        }));

        // Return a JSON response with the serialized data
        const response = {
            data: serializedTasks,
            totalTasks: count,
            message: 'Tasks retrieved successfully',
            status: 'success'
        };

        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error retrieving tasks:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: 'error'
        };
        return res.status(500).json(response);
    }
};

export const createTask = async (req: Request, res: Response) => {
    const {title, description, dueDate, userId} = req.body
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        // Create task in the database using Sequelize Task model
        const createdTask = await Task.create({
            tsk_title: title,
            tsk_desc: description,
            tsk_status: 0, // Assuming 0 represents an initial status
            tsk_creation_date: new Date(),
            tsk_due_date: new Date(dueDate),
            usr_id: userId
        });
        const response = {
            data: createdTask.tsk_id,
            message: `Task created successfully for user ${user.usr_id}`,
            status: "success"
        };
        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error creating task:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: "error"
        };
        return res.status(500).json(response);
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const taskId = req.params.id; // Assuming the task ID is passed as a URL parameter
    const { title, description, dueDate } = req.body;
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        task.tsk_title = title;
        task.tsk_desc = description;
        task.tsk_due_date = new Date(dueDate);
        await task.save();
        const response = {
            data: task.tsk_id,
            message: 'Task updated successfully',
            status: 'success'
        };
        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error updating task:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: 'error'
        };
        return res.status(500).json(response);
    }
};

export const changeStatus = async (req: Request, res: Response) => {
    const status:string = req.params.status; // Assuming the task ID is passed as a URL parameter
    const taskId = req.params.id;
    var responseText:String = '';
    var statusChange: number = 0;
    if(status == "todo"){
        statusChange = 0;
        responseText="TODO";
    }else if(status =="doing"){
        statusChange = 1;
        responseText="DOING";
    }else if(status =="done"){
        statusChange = 2;
        responseText="DONE";
    }else if(status =="upcoming"){
        statusChange = 3;
        responseText="UPCOMING";
    }
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        task.tsk_status = statusChange;
        await task.save();
        const response = {
            message: `Task Changed to ${responseText}`,
            status: 'success'
        };
        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error updating task:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: 'error'
        };
        return res.status(500).json(response);
    }
};
export const deleteTask = async (req: Request, res: Response) => {
    const taskId = req.params.id; // Assuming the task ID is passed as a URL parameter
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new Error(`Task not found with ID: ${taskId}`);
        }
        await task.destroy();
        const response = {
            message: 'Task Deleted Successfully',
            status: 'success'
        };
        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error deleting task:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: 'error'
        };
        return res.status(500).json(response);
    }
};