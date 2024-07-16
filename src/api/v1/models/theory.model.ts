import * as mongoose from 'mongoose';

export interface ITheoryDetail {
  title: string;
  content: string;
}

export interface ITheory {
  topicId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  details: ITheoryDetail[];
  status: 'ACTIVE' | 'DELETED' | 'INACTIVE';
}

export interface ITheoryModel extends ITheory, mongoose.Document {
}

const TheorySchema = new mongoose.Schema({
  topicId: { type: mongoose.Types.ObjectId, required: true, ref: 'Topic' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  details: [
    {
      _id: false,
      title: { type: String, required: true },
      content: { type: String, required: true },
    }
  ],
  status: { type: String, required: true, enum: ['ACTIVE', 'DELETED', 'INACTIVE'], default: 'ACTIVE' },
}, { versionKey: false, timestamps: true });

const Theory = mongoose.model<ITheoryModel>('Theory', TheorySchema);
export default Theory;