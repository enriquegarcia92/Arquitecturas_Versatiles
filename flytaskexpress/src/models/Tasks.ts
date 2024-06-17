// models/task.model.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Replace with your Sequelize instance
import User from './User';
interface TaskAttributes {
    tsk_id: number;
    tsk_title: string;
    tsk_desc: string;
    tsk_status: number;
    tsk_creation_date: Date;
    tsk_due_date: Date;
    usr_id: number;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'tsk_id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
    public tsk_id!: number;
    public tsk_title!: string;
    public tsk_desc!: string;
    public tsk_status!: number;
    public tsk_creation_date!: Date;
    public tsk_due_date!: Date;
    public usr_id!: number;
}

Task.init(
    {
        tsk_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tsk_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tsk_desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tsk_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0 // Default status
        },
        tsk_creation_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                const rawValue = this.getDataValue('tsk_creation_date');
                return rawValue ? new Date(rawValue).toISOString() : null;
            }
        },
        tsk_due_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                const rawValue = this.getDataValue('tsk_due_date');
                return rawValue ? new Date(rawValue).toISOString() : null;
            }
        },
        usr_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'usr_id'
            }
        }
    },
    {
        sequelize,
        timestamps: false, // Disable timestamps (createdAt and updatedAt)
        tableName: 'tasks'
    }
);

Task.belongsTo(User, { foreignKey: 'usr_id', as: 'user' });

export default Task;
