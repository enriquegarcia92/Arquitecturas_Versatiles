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