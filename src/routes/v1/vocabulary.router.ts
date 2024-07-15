import express from 'express';
import { createVocabulary, getAllVocabulary, getVocabulary } from '../../api/v1/controllers/vocabylary.controller';

const vocabularyRouter = express.Router();

vocabularyRouter.post('/', createVocabulary);
vocabularyRouter.get('/', getAllVocabulary);
vocabularyRouter.get('/:id', getVocabulary);

export default vocabularyRouter;