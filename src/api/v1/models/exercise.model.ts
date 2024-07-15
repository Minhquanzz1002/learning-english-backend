import * as mongoose from 'mongoose';

export enum ExerciseType {
  READING = 'READING',
  LISTENING = 'LISTENING',
  WRITING = 'WRITING',

}

export interface IExercise {
  question: string;
  options: [string, string, string, string];
  correct_answer: string;
  audio_url: string;
  type: ExerciseType;
  status: 'ACTIVE' | 'DELETED' | 'INACTIVE';
}

export interface IExerciseModel extends IExercise, mongoose.Document {
}

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true, enum: ExerciseType },
}, {versionKey: false, timestamps: true});

const Exercise = mongoose.model<IExerciseModel>('Exercise', ExerciseSchema);
export default Exercise;