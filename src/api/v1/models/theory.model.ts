import * as mongoose from 'mongoose';

export interface ITheory {
  topicId: mongoose.Types.ObjectId;
  name: string;
  title: string;
  content: string;
  status: 'ACTIVE' | 'DELETED' | 'INACTIVE';
}

export interface ITheoryModel extends ITheory, mongoose.Document {
}

const TheorySchema = new mongoose.Schema({
  topicId: { type: mongoose.Types.ObjectId, required: true, ref: 'Topic' },
  name: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, required: true, enum: ['ACTIVE', 'DELETED', 'INACTIVE'] },
}, {versionKey: false, timestamps: true});

const Theory = mongoose.model<ITheoryModel>('Theory', TheorySchema);
export default Theory;