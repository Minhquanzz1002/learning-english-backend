import express, { NextFunction } from 'express';
import Vocabulary from '../models/vocabulary.model';
import Topic, { TopicType } from '../models/topic.model';
import { BadRequestError } from '../errors/BadRequestError';

const createVocabulary = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const { topicId } = req.params;
  const { word, meaning, example } = req.body;
  const topic = await Topic.findOne({ _id: topicId, type: TopicType.VOCABULARY });

  if (!topic) {
    return next(new BadRequestError('Không tìm thấy chủ đề hoặc chủ đề không phải loại từ vựng'));
  }

  const vocabulary = new Vocabulary({ topicId, word, meaning, example });
  const savedVocabulary = await vocabulary.save();
  return res.status(201).send(savedVocabulary);
};

const updateVocabulary = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const { topicId, vocabularyId } = req.params;

  const topic = await Topic.findOne({ _id: topicId, type: TopicType.VOCABULARY });

  if (!topic) {
    return next(new BadRequestError('Không tìm thấy chủ đề hoặc chủ đề không phải loại từ vựng'));
  }

  const { word, meaning, example } = req.body;
  const vocabulary = await Vocabulary.findById(vocabularyId);

  if (!vocabulary) {
    return next(new BadRequestError('Không tìm thấy từ vựng'));
  }

  if (word) {
    vocabulary.word = word;
  }
  if (meaning) {
    vocabulary.meaning = meaning;
  }
  if (example) {
    vocabulary.example = example;
  }
  const savedVocabulary = await vocabulary.save();
  return res.send(savedVocabulary);
};

const getVocabularies = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const { topicId } = req.params;

  const topic = await Topic.findOne({ _id: topicId, type: TopicType.VOCABULARY });

  if (!topic) {
    return next(new BadRequestError('Không tìm thấy chủ đề hoặc chủ đề không phải loại từ vựng'));
  }

  const vocabularies = await Vocabulary.find({ topicId: topicId });
  return res.send(vocabularies);
};


export {
  createVocabulary,
  getVocabularies,
  updateVocabulary,
};