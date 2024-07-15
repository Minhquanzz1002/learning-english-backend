import * as mongoose from 'mongoose';

export interface ITopic {
  name: string;
  description: string;
  status: 'ACTIVE' | 'DELETED' | 'INACTIVE';
}

export interface ITopicModel extends ITopic, mongoose.Document {
}

const TopicSchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  description: { type: String, required: true },
  status: { type: String, required: true, enum: ['ACTIVE', 'DELETED', 'INACTIVE'], default: 'ACTIVE' },
}, { versionKey: false, timestamps: true });

const Topic = mongoose.model<ITopicModel>('Topic', TopicSchema);
export default Topic;