import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  tsk_title: string;
  tsk_desc: string;
  tsk_status: number;
  tsk_creation_date: Date;
  tsk_due_date: Date;
  usr_id: mongoose.Schema.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  tsk_title: { type: String, required: true },
  tsk_desc: { type: String, required: true },
  tsk_status: { type: Number, required: true },
  tsk_creation_date: { type: Date, default: Date.now },
  tsk_due_date: { type: Date, required: true },
  usr_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { collection: 'Tasks', versionKey: false });

const Task = mongoose.model<ITask>('Tasks', TaskSchema);

export default Task;
