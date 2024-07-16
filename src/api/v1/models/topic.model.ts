import * as mongoose from 'mongoose';

export enum TopicType {
  THEORY = 'THEORY',
  VOCABULARY = 'VOCABULARY',
}

export interface ITopic {
  name: string;
  type: TopicType,
  description: string;
  status: 'ACTIVE' | 'DELETED' | 'INACTIVE';
}

export interface ITopicModel extends ITopic, mongoose.Document {
}

const TopicSchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  type: {type: String, required: true, enum: TopicType},
  description: { type: String, required: true },
  status: { type: String, required: true, enum: ['ACTIVE', 'DELETED', 'INACTIVE'], default: 'ACTIVE' },
}, { versionKey: false, timestamps: true });

const Topic = mongoose.model<ITopicModel>('Topic', TopicSchema);
export default Topic;