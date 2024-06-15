import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Task } from "./entity/Tasks"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5435,
    username: "postgres",
    password: "password",
    database: "flytask",
    schema: "flytask",
    synchronize: true,
    logging: false,
    entities: [User, Task],
    migrations: [__dirname + '/migration/*.js'],
    subscribers: [],
})
