import * as mongoose from 'mongoose';

export interface IVocabulary {
  topicId: mongoose.Types.ObjectId;
  word: string;
  meaning: string;
  example: string;
  status: 'ACTIVE' | 'DELETED' | 'INACTIVE';
}

export interface IVocabularyModel extends IVocabulary, mongoose.Document {
}

const VocabularySchema = new mongoose.Schema({
  topicId: { type: mongoose.Types.ObjectId, required: true, ref: 'Topic' },
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  example: { type: String, required: true },
  status: { type: String, required: true, enum: ['ACTIVE', 'DELETED', 'INACTIVE'] },
}, { versionKey: false, timestamps: true });

const Vocabulary = mongoose.model<IVocabularyModel>('Vocabulary', VocabularySchema);
export default Vocabulary;