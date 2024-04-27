import { AppDataSource } from "./data-source"
import * as express from "express"


const app = express()
const PORT = 3000
app.use(express.json())
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

