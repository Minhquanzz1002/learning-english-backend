import express, { NextFunction } from 'express';
import Topic, { TopicType } from '../models/topic.model';
import Logger from '../../../utils/logger.util';
import { NotFoundError } from '../errors/NotFoundError';
import mongoose from 'mongoose';
import { BadRequestError } from '../errors/BadRequestError';

const createTopic = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const { name, description, type } = req.body;
  const existingTopic = await Topic.findOne({ name: name });
  if (existingTopic) {
    return next(new BadRequestError(`Tên chủ đề đã tồn tại`));
  }
  const topic = new Topic({ name, description, type });
  const savedTopic = await topic.save();
  return res.status(201).send(savedTopic);
};

const updateTopic = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const { name, description, type } = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new NotFoundError('Không tìm thấy đề mục'));
  }
  const topic = await Topic.findOne({ _id: id, status: 'ACTIVE' });
  if (!topic) {
    return next(new NotFoundError('Không tìm thấy đề mục'));
  }
  if (name) {
    topic.name = name;
  }
  if (description) {
    topic.description = description;
  }
  if (type) {
    topic.type = type;
  }
  const updatedTopic = await topic.save();
  return res.send(updatedTopic);
};

const deleteTopic = (req: express.Request, res: express.Response) => {
  Logger.info(res);
  Logger.info(req);
};

const getTopic = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new NotFoundError('Không tìm thấy đề mục'));
  }
  const topic = await Topic.findOne({ _id: id, status: 'ACTIVE' });
  if (!topic) {
    return next(new NotFoundError('Không tìm thấy đề mục'));
  }
  return res.send(topic);
};

const getTopics = async (req: express.Request, res: express.Response) => {
  const { name, type = TopicType.THEORY } = req.query;
  const filter = {
    status: 'ACTIVE',
    type,
    ...(name && { name: { $regex: name, $options: 'i' } }),
  };
  const topics = await Topic.find(filter);
  return res.send(topics);
};


export {
  createTopic,
  deleteTopic,
  getTopic,
  getTopics,
  updateTopic,
};