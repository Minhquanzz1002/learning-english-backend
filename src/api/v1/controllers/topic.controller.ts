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

const getTopics = (_: express.Request, res: express.Response) => {
  Topic.find()
    .then(topics => {
      Logger.info("Get topics successfully");
      return res.status(200).json(topics);
    })
    .catch((error) => {
      Logger.error(error);
      return res.status(500).json({ 'error': 'Internal Server Error' });
    });
};


export {
  createTopic,
  deleteTopic,
  getTopic,
  getTopics,
  updateTopic,
};