import * as mongoose from 'mongoose';

export interface IRole {
  name: string;
  status: 'ACTIVE' | 'DELETED' | 'INACTIVE';
}

export interface IRoleModel extends IRole, mongoose.Document {
}

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true, enum: ['ACTIVE', 'DELETED', 'INACTIVE'] },
}, {versionKey: false, timestamps: true});

const Role = mongoose.model<IRoleModel>('Role', RoleSchema);
export default Role;