import express, { NextFunction } from 'express';
import Topic from '../models/topic.model';
import Logger from '../../../utils/logger.util';
import { NotFoundError } from '../errors/NotFoundError';
import mongoose from 'mongoose';
import { BadRequestError } from '../errors/BadRequestError';

const createTopic = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const {name, description} = req.body;
  const existingTopic = await Topic.findOne({name: name});
  if (existingTopic) {
    return next(new BadRequestError(`Tên chủ đề đã tồn tại`));
  }
  const topic = new Topic({name, description});
  const savedTopic = await topic.save();
  return res.status(201).send(savedTopic);
};

const updateTopic = (req: express.Request, res: express.Response) => {
  Logger.info(res);
  Logger.info(req);
};

const deleteTopic = (req: express.Request, res: express.Response) => {
  Logger.info(res);
  Logger.info(req);
};

const getTopic = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new NotFoundError("Không tìm thấy đề mục"));
  }
  const topic = await Topic.findOne({_id: id, status: 'ACTIVE'});
  if (!topic) {
    return next(new NotFoundError("Không tìm thấy đề mục"));
  }
  return res.send(topic);
};

const getTopics = async (req: express.Request, res: express.Response) => {
  const {name} = req.query;
  const filter = {
    status: 'ACTIVE',
    ...(name && {name: {$regex: name, $options: 'i'}})
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