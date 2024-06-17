import mongoose, { Document, Schema } from 'mongoose';
import { Role } from './Role';

interface IUser extends Document {
    usr_name: string;
    usr_email: string;
    usr_password: string;
    usr_role: Role;
//Django compatibility fields
    last_login: Date | null;
    username: string | null;
    password: string | null;
    is_superuser: boolean;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    is_staff: boolean |false;
    is_active: boolean | true;
    date_joined: Date | null;
}

const UserSchema: Schema = new Schema({
    usr_name: { type: String, required: true },
    usr_email: { type: String, required: true, unique: true },
    usr_password: { type: String, required: true },
    usr_role: { 
        type: String, 
        enum: Object.values(Role), 
        required: true 
      },
//Django compatibility fields
    username: { type: String, default: null },
    last_login: { type: Date, default: null },
    password: { type: String, default: null },
    is_superuser: { type: Boolean, default: false },
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, default: null },
    is_staff: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    date_joined: { type: Date, default: null },
}, { collection: 'User', versionKey: false });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
