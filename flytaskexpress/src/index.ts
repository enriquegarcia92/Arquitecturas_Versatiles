import { AppDataSource } from "./data-source"
import * as express from "express"
import { authenticateToken } from "./middleware/authenticationToken"
import { TaskController } from "./controllers/Task"
import { AuthController } from "./controllers/Authentication"


const app = express()
const PORT = Number(process.env.PORT) || 3000
app.use(express.json())
app.use(authenticateToken)

// Task Routes
app.get("api/task", authenticateToken, new TaskController().getTasks)
app.get("api/task/search", authenticateToken, new TaskController().getTask)
app.post("api/task/create", authenticateToken, new TaskController().createTask)
app.put("api/task/edit/:id", authenticateToken, new TaskController().updateTask)
app.delete("api/task/delete/:id", authenticateToken, new TaskController().deleteTask)
//status requests
app.put("api/task/done/:id", authenticateToken, new TaskController().updateTaskStatusToDone)
app.put("api/task/doing", authenticateToken, new TaskController().updateTaskStatusToDoing)
app.put("api/task/upcoming", authenticateToken, new TaskController().updateTaskStatusToUpcoming)
app.put("ap/task/todo", authenticateToken, new TaskController().updateTaskStatusToTodo)

//Auth Routes
app.post("api/auth/register", new AuthController().registerUser)
app.post("api/auth/login", new AuthController().loginUser)
app.post("api/auth/recover-password", new AuthController().passwordRecovery)

app.put
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    });
    console.log('DataSource initialized successfully');
  })
  .catch(error => {
    console.error('Error initializing DataSource:', error);
  });

