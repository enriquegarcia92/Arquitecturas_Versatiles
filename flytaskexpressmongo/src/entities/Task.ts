import { Schema, model, Document } from "mongoose";
import getNextSequenceValue from "../utils/getNextSequenceValue";

export interface ITask extends Document { 
    _id: number;
    title: string;
    description: string;
    status: number;
    creationDate: Date;
    dueDate: Date;
    userId: number;
    _class?: string;
}
const taskSchema = new Schema<ITask>({
    _id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Number, required: true },
    creationDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    userId: { type: Number, required: true },
    _class: { type: String }
});

taskSchema.pre<ITask>('save', async function(next) {
    if (this.isNew) {
        try {
            this._id = await getNextSequenceValue('task_sequence');
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Task = model<ITask>('Task', taskSchema);
export default Task;