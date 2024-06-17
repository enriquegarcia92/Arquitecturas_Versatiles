import express, { NextFunction, Request, Response } from 'express';
import sequelize from './config/database';
import { CreateUserDTO } from './models/DTO/UserDTO';
import { validationMiddleware } from './middleware/validate';
import { loginUser, passwordRecovery, recoverPassword, registerUser, whoami } from './controllers/authController';
import { LoginDTO } from './models/DTO/LoginDTO';
import dotenv from 'dotenv';
import { verifyToken } from './middleware/authenticate';
import { RecoverPwDTO } from './models/DTO/RecoverPwDTO';
import { TaskDTO } from './models/DTO/TaskDTO';
import { changeStatus, createTask, deleteTask, getTasks, updateTask } from './controllers/tasksController';
import { UpdateTaskDTO } from './models/DTO/UpdateTaskDTO';
import { verify } from 'jsonwebtoken';

dotenv.config();
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

//Authentication and user requests
app.post('/api/auth/whoami', verifyToken, whoami);
app.post('/api/auth/register', validationMiddleware(CreateUserDTO), registerUser);
app.post('/api/auth/login', validationMiddleware(LoginDTO), loginUser);
app.post('/api/auth/recover-password', passwordRecovery);
app.post('/api/auth/recover-authenticated',validationMiddleware(RecoverPwDTO), recoverPassword);

//Tasks requests
app.get('/api/task/search', verifyToken, getTasks);
app.post('/api/task/create', verifyToken, validationMiddleware(TaskDTO), createTask);
app.put('/api/task/edit/:id', verifyToken, validationMiddleware(UpdateTaskDTO), updateTask);
app.put('/api/task/:status/:id', verifyToken, changeStatus);
app.delete('/api/task/delete/:id', verifyToken, deleteTask);

  async function initialize() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      // Continue with your application logic here
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  initialize();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });