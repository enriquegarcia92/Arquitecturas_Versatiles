import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { validationMiddleware } from './middleware/validate';
import { CreateUserDTO } from './models/DTO/UserDTO';
import { loginUser, passwordRecovery, recoverPassword, registerUser, whoami } from './controlers/authController';
import { LoginDTO } from './models/DTO/LoginDTO';
import { RecoverPwDTO } from './models/DTO/RecoveryPwDTO';
import { verifyToken } from './middleware/authenticate';
import dotenv from 'dotenv';
import { changeStatus, createTask, deleteTask, getTasks, updateTask } from './controlers/tasksController';
import { TaskDTO } from './models/DTO/TaskDTO';
import { UpdateTaskDTO } from './models/DTO/UpdateTaskDTO';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());


//Authentication and user requests
app.post('/api/auth/whoami', verifyToken, whoami);
app.post('/api/auth/register', validationMiddleware(CreateUserDTO), registerUser);
app.post('/api/auth/login', validationMiddleware(LoginDTO), loginUser);
app.post('/api/auth/recover-password', passwordRecovery);
app.post('/api/auth/recover-authenticated',validationMiddleware(RecoverPwDTO), recoverPassword);

//Tasks requests
//Tasks requests
app.get('/api/task/search', verifyToken, getTasks);
app.post('/api/task/create', verifyToken, validationMiddleware(TaskDTO), createTask);
app.put('/api/task/edit/:id', verifyToken, validationMiddleware(UpdateTaskDTO), updateTask);
app.put('/api/task/:status/:id', verifyToken, changeStatus);
app.delete('/api/task/delete/:id', verifyToken, deleteTask);


// MongoDB connection
const mongoUri = 'mongodb+srv://00093619:flytask580@flytaskcluster.xlycw9x.mongodb.net/flytask?retryWrites=true&w=majority&appName=flytaskcluster';

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
