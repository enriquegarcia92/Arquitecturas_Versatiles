import { Schema, model, Document } from 'mongoose';
import getNextSequenceValue from '../utils/getNextSequenceValue';

export interface IUser extends Document {
  _id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  _class?: string;
}

const userSchema = new Schema<IUser>({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  _class: { type: String }
  
});

userSchema.pre<IUser>('save', async function (next) {
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

const User = model<IUser>('User', userSchema);

export default User;
