import * as mongoose from 'mongoose';

export interface IUser {
  name: string;
  username: string;
  password: string;
  phone: string;
  birthday: Date;
  gender: boolean;
  avatar: string;
  status: 'ACTIVE' | 'DELETED' | 'INACTIVE';
}

export interface IUserModel extends IUser, mongoose.Document {
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, index: {unique: true} },
  password: { type: String, required: true },
  phone: { type: String },
  birthday: { type: Date },
  gender: { type: Boolean },
  avatar: { type: String },
  status: { type: String, required: true, enum: ['ACTIVE', 'DELETED', 'INACTIVE'], default: 'ACTIVE' },
}, { versionKey: false, timestamps: true });

const User = mongoose.model<IUserModel>('User', UserSchema);
export default User;