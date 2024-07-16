import express, { NextFunction } from 'express';
import Topic, { TopicType } from '../models/topic.model';
import { BadRequestError } from '../errors/BadRequestError';
import Theory from '../models/theory.model';

const createTheory = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const { topicId } = req.params;
  const { name, description, details } = req.body;
  const topic = await Topic.findOne({ _id: topicId, type: TopicType.THEORY });

  if (!topic) {
    return next(new BadRequestError('Không tìm thấy chủ đề hoặc chủ đề không phải loại ngữ pháp'));
  }

  const theory = new Theory({ topicId, name, description, details });
  const savedTheory = await theory.save();
  return res.status(201).send(savedTheory);
};

const updateTheory = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const { topicId, theoryId } = req.params;

  const topic = await Topic.findOne({ _id: topicId, type: TopicType.THEORY });

  if (!topic) {
    return next(new BadRequestError('Không tìm thấy chủ đề hoặc chủ đề không phải loại từ vựng'));
  }

  const { name, description, details } = req.body;
  const theory = await Theory.findById(theoryId);

  if (!theory) {
    return next(new BadRequestError('Không tìm thấy từ vựng'));
  }

  if (name) {
    theory.name = name;
  }
  if (description) {
    theory.description = description;
  }
  if (details) {
    theory.details = details;
  }
  const savedTheory = await theory.save();
  return res.send(savedTheory);
};

const getTheories = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const { topicId } = req.params;

  const topic = await Topic.findOne({ _id: topicId, type: TopicType.THEORY });

  if (!topic) {
    return next(new BadRequestError('Không tìm thấy chủ đề hoặc chủ đề không phải loại ngữ pháp'));
  }

  const theories = await Theory.find({ topicId: topicId });
  return res.send(theories);
};


export {
  createTheory,
  getTheories,
  updateTheory,
};